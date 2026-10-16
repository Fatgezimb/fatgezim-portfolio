"""Reproducible C-MAPSS FD001 + FD003 benchmark with whole-engine splits.

Model choice uses validation engines. Calibration engines and official test
engines are held out; causal rolling features never see future sensor values.
"""
from __future__ import annotations
import argparse
import hashlib
import json
from pathlib import Path
import urllib.request
import zipfile

import joblib
import numpy as np
import pandas as pd
from sklearn.ensemble import HistGradientBoostingRegressor
from sklearn.linear_model import Ridge
from sklearn.metrics import mean_absolute_error, mean_squared_error
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler

ROOT = Path(__file__).resolve().parent
SOURCE = "https://www.kaggle.com/datasets/behrad3d/nasa-cmaps"
DOWNLOAD = "https://www.kaggle.com/api/v1/datasets/download/behrad3d/nasa-cmaps"
COLUMNS = ["engine", "cycle"] + [f"setting_{n}" for n in range(1, 4)] + [f"sensor_{n}" for n in range(1, 22)]
SENSORS = [2, 3, 4, 7, 8, 9, 11, 12, 13, 14, 15, 17, 20, 21]
FEATURES = ["cycle"] + [f"sensor_{n}{suffix}" for n in SENSORS for suffix in ["", "_mean10", "_delta10"]]
SEED = 42


def download(destination: Path) -> Path:
    destination.mkdir(parents=True, exist_ok=True)
    archive = destination / "cmaps.zip"
    if not archive.exists():
        urllib.request.urlretrieve(DOWNLOAD, archive)
    return archive


def load(archive: Path, dataset: str) -> tuple[pd.DataFrame, pd.DataFrame, np.ndarray]:
    with zipfile.ZipFile(archive) as zipped:
        frames = []
        for partition in ["train", "test"]:
            with zipped.open(f"CMaps/{partition}_{dataset}.txt") as stream:
                frame = pd.read_csv(stream, sep=r"\s+", header=None, names=COLUMNS)
            if frame.shape[1] != 26 or frame.isna().any().any() or frame.duplicated(["engine", "cycle"]).any():
                raise ValueError("Invalid engine schema, missing values, or duplicate cycles")
            for _, group in frame.groupby("engine"):
                if not np.array_equal(group.cycle.to_numpy(), np.arange(1, len(group)+1)):
                    raise ValueError("Engine cycles must be contiguous from 1")
            frames.append(frame)
        with zipped.open(f"CMaps/RUL_{dataset}.txt") as stream:
            truth = np.loadtxt(stream)
    assert len(truth) == frames[1].engine.nunique()
    return frames[0], frames[1], truth


def features(frame: pd.DataFrame) -> pd.DataFrame:
    result = frame.sort_values(["engine", "cycle"]).copy()
    for sensor in SENSORS:
        column = f"sensor_{sensor}"
        group = result.groupby("engine")[column]
        result[f"{column}_mean10"] = group.transform(lambda x: x.rolling(10, min_periods=1).mean())
        result[f"{column}_delta10"] = result[column] - group.shift(9).fillna(group.transform("first"))
    return result


def split_engines(ids: np.ndarray) -> tuple[np.ndarray, np.ndarray, np.ndarray]:
    ids = np.random.default_rng(SEED).permutation(np.sort(ids))
    return ids[:60], ids[60:80], ids[80:]


def snapshots(frame: pd.DataFrame, ids: np.ndarray, seed: int) -> pd.DataFrame:
    """One random censored cycle per held-out engine, chosen without sensor/RUL inspection."""
    rng = np.random.default_rng(seed)
    chosen = []
    for engine in sorted(ids):
        group = frame[frame.engine == engine]
        cycle = int(rng.integers(20, int(group.cycle.max())))
        chosen.append(group[group.cycle == cycle])
    return pd.concat(chosen)


def metrics(truth: np.ndarray, predicted: np.ndarray) -> dict:
    return {"mae": float(mean_absolute_error(truth, predicted)), "rmse": float(np.sqrt(mean_squared_error(truth, predicted))),
        "bias": float(np.mean(predicted-truth)), "n": len(truth)}


def candidate(name: str):
    if name == "Ridge":
        return make_pipeline(StandardScaler(), Ridge(alpha=100))
    return HistGradientBoostingRegressor(max_iter=240, max_leaf_nodes=15, learning_rate=.05, l2_regularization=10, early_stopping=False, random_state=SEED)


def predict(model, frame: pd.DataFrame) -> np.ndarray:
    return np.clip(model.predict(frame[FEATURES]), 0, 125)


def conformal_radius(residuals: np.ndarray, coverage: float = .9) -> float:
    n = len(residuals)
    rank = min(n, int(np.ceil((n+1)*coverage)))
    return float(np.sort(residuals)[rank-1])


def benchmark(archive: Path, dataset: str) -> dict:
    train_raw, test_raw, official_rul = load(archive, dataset)
    train, test = features(train_raw), features(test_raw)
    train["truth"] = train.groupby("engine").cycle.transform("max") - train.cycle
    train["target"] = train.truth.clip(upper=125)
    fit_ids, val_ids, cal_ids = split_engines(train.engine.unique())
    fitting = train[train.engine.isin(fit_ids)]
    validation = snapshots(train, val_ids, 43)
    calibration = snapshots(train, cal_ids, 44)
    scores = []
    for name in ["Ridge", "Gradient boosting"]:
        model = candidate(name)
        model.fit(fitting[FEATURES], fitting.target)
        scores.append({"model": name, **metrics(validation.truth.to_numpy(), predict(model, validation))})
    winner = min(scores, key=lambda row: row["rmse"])["model"]
    final_train = train[train.engine.isin(np.concatenate([fit_ids, val_ids]))]
    final = candidate(winner)
    final.fit(final_train[FEATURES], final_train.target)
    radius = conformal_radius(np.abs(calibration.truth.to_numpy()-predict(final, calibration)))
    models = ROOT / "models"
    models.mkdir(exist_ok=True)
    joblib.dump(final, models / f"{dataset}.joblib")
    last = test.groupby("engine", sort=True).tail(1).copy()
    predictions = predict(final, last)
    lifetime = float(final_train.groupby("engine").cycle.max().median())
    baseline = np.clip(lifetime-last.cycle.to_numpy(), 0, None)
    lower = np.maximum(0, predictions-radius)
    upper = predictions+radius
    measured = metrics(official_rul, predictions)
    measured["coverage"] = float(np.mean((official_rul >= lower) & (official_rul <= upper)))
    measured["interval_radius"] = radius
    measured["baseline"] = metrics(official_rul, baseline)
    rng = np.random.default_rng(45)
    errors = np.abs(official_rul-predictions)
    bootstrap = [float(np.mean(rng.choice(errors, len(errors), replace=True))) for _ in range(2000)]
    measured["mae_ci95"] = np.quantile(bootstrap, [.025, .975]).tolist()
    records = []
    for index, (_, row) in enumerate(last.iterrows()):
        records.append({"dataset": dataset, "engine": int(row.engine), "last_cycle": int(row.cycle), "predicted": round(float(predictions[index]), 3), "actual": int(official_rul[index]), "lower": round(float(lower[index]), 3), "upper": round(float(upper[index]), 3), "error": round(float(predictions[index]-official_rul[index]), 3), "baseline": round(float(baseline[index]), 3)})
    history = []
    for engine, group in test.groupby("engine"):
        # Only thin the exported visualization, never the training/evaluation data.
        sampled = group[(group.cycle % 5 == 0) | (group.cycle == 1) | (group.cycle == group.cycle.max())].copy()
        estimates = predict(final, sampled)
        end = int(group.cycle.max()) + int(official_rul[int(engine)-1])
        for j, (_, row) in enumerate(sampled.iterrows()):
            history.append({"dataset": dataset, "engine": int(engine), "cycle": int(row.cycle), "predicted": round(float(estimates[j]), 3), "actual": end-int(row.cycle), "sensor_11": float(row.sensor_11)})
    return {"dataset": dataset, "train_rows": len(train), "test_rows": len(test), "train_engines": 100, "test_engines": 100,
        "winner": winner, "validation_scores": scores, "metrics": measured, "engines": records, "history": history,
        "split": {"fit": fit_ids.tolist(), "validation": val_ids.tolist(), "calibration": cal_ids.tolist()},
        "validation_cycles": validation[["engine", "cycle"]].to_dict("records"), "calibration_cycles": calibration[["engine", "cycle"]].to_dict("records")}


def run(archive: Path | None = None) -> dict:
    archive = archive or download(ROOT / "data")
    digest = hashlib.sha256(archive.read_bytes()).hexdigest()
    lock = ROOT / "source-lock.json"
    if lock.exists() and json.loads(lock.read_text())["sha256"] != digest:
        raise ValueError("Source checksum changed; review before rebuilding")
    results = [benchmark(archive, dataset) for dataset in ["FD001", "FD003"]]
    artifact = {"results": results, "source": {"url": SOURCE, "download": DOWNLOAD, "sha256": digest, "version": 1, "license": "CC0 as listed by the Kaggle distributor", "credit": "NASA Ames Prognostics Center of Excellence; Saxena, Goebel, Simon & Eklund (2008)", "classification": "C-MAPSS simulated engine degradation benchmark"}, "features": FEATURES, "seed": SEED, "target_cap": 125,
        "methods": ["FD001: one operating condition and one fault mode. FD003: one condition and two fault modes.", "60 whole engines select model parameters; 20 validation engines choose Ridge or gradient boosting. Refit on those 80 engines.", "20 separate calibration engines provide one randomly censored snapshot each for a nominal 90% split-conformal interval.", "Official test engines are used only for final evaluation; their integer IDs are partition-local and do not denote the training engines.", "Each feature uses only the current or earlier cycles of its own engine. Current sensors, trailing 10-cycle mean, and trailing delta accompany cycle count.", "Training RUL targets and predictions are capped at 125 cycles. Reported test errors and interval coverage use uncapped official truth.", "Age-only baseline: median training-engine lifetime minus observed cycles, clipped at zero.", "The interval is calibrated on random training truncations; official-test truncations may differ. Measured coverage is reported, not guaranteed.", "This is an offline benchmark. Browser replay displays stored predictions; it does not train a model or diagnose operational aircraft."]}
    out = ROOT / "artifacts"
    out.mkdir(exist_ok=True)
    (out / "analysis.json").write_text(json.dumps(artifact, indent=2, allow_nan=False))
    pd.DataFrame([row for result in results for row in result["engines"]]).to_csv(out / "test-predictions.csv", index=False)
    print(json.dumps([{k: result[k] for k in ["dataset", "winner", "metrics"]} for result in results], indent=2))
    return artifact


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--archive", type=Path)
    run(parser.parse_args().archive)
