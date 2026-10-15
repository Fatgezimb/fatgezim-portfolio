"use client";
import { useEffect, useRef, useState } from "react";
import { sitePath } from "@/app/content/paths";
import type { createFormScene, StudyMaterial } from "./formScene";
import styles from "./FormStudy.module.css";

export function FormStudy() {
  const host = useRef<HTMLDivElement>(null),
    canvas = useRef<HTMLCanvasElement>(null);
  const scene = useRef<ReturnType<typeof createFormScene> | null>(null);
  const [active, setActive] = useState(false),
    [ready, setReady] = useState(false),
    [failed, setFailed] = useState(false),
    [attempt, setAttempt] = useState(0);
  const [fold, setFold] = useState(72),
    [light, setLight] = useState(35),
    [orbit, setOrbit] = useState(0),
    [material, setMaterial] = useState<StudyMaterial>("iris");
  useEffect(() => {
    const device = navigator as Navigator & {
      deviceMemory?: number;
      connection?: { saveData?: boolean; effectiveType?: string };
    };
    if (
      matchMedia("(prefers-reduced-motion: reduce)").matches ||
      device.connection?.saveData ||
      /(^|-)2g$/.test(device.connection?.effectiveType ?? "") ||
      (device.hardwareConcurrency > 0 && device.hardwareConcurrency <= 2) ||
      (device.deviceMemory !== undefined && device.deviceMemory <= 2)
    )
      return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setActive(true);
          observer.disconnect();
        }
      },
      { rootMargin: "180px" },
    );
    if (host.current) observer.observe(host.current);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!active || !canvas.current) return;
    let cancelled = false;
    import("./formScene")
      .then(({ createFormScene }) => {
        if (cancelled || !canvas.current) return;
        try {
          scene.current = createFormScene(canvas.current, () => {
            scene.current = null;
            setFailed(true);
            setReady(false);
          });
          setReady(true);
          setFailed(false);
        } catch {
          setFailed(true);
          setReady(false);
        }
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
      scene.current?.dispose();
      scene.current = null;
    };
  }, [active, attempt]);
  useEffect(() => {
    if (ready) scene.current?.setFold(fold);
  }, [ready, fold]);
  useEffect(() => {
    if (ready) scene.current?.setLight(light);
  }, [ready, light]);
  useEffect(() => {
    if (ready) scene.current?.setOrbit(orbit);
  }, [ready, orbit]);
  useEffect(() => {
    if (ready) scene.current?.setMaterial(material);
  }, [ready, material]);
  return (
    <section
      id="design"
      data-study-state={
        failed ? "unavailable" : ready ? "interactive" : "poster"
      }
      className={styles.section}
      aria-labelledby="form-title"
    >
      <header className={styles.heading} data-reveal="up">
        <div>
          <p className={styles.kicker}>The creative side of the desk</p>
          <h2 id="form-title">
            Make room
            <br />
            for <em>play.</em>
          </h2>
        </div>
        <div className={styles.intro}>
          <p>
            I’m learning to think in shape, light and material, alongside my
            work in software and my growing Blender practice.
          </p>
          <p>This little study is yours to change.</p>
        </div>
      </header>
      <div className={styles.studio} ref={host}>
        <div className={styles.scene}>
          <picture className={styles.posterWrap} hidden={ready}>
            <source
              media="(max-width:700px)"
              srcSet={sitePath("/media/form-study-mobile.webp")}
            />
            <img
              className={styles.poster}
              src={sitePath("/media/form-study-poster.webp")}
              alt="Forty iris-colored ribbons form a flowing architectural wave, casting fine shadows on a lilac plinth."
              width={1036}
              height={570}
              loading="lazy"
            />
          </picture>
          {active && (
            <canvas
              key={attempt}
              ref={canvas}
              className={styles.canvas}
              aria-label="Interactive ribbon sculpture. Use the controls beside it to change form, material, light and viewpoint."
              role="img"
              hidden={!ready}
            />
          )}
          <span className={styles.figureLabel}>FORM STUDY / 01</span>
          <span className={styles.figureNote}>One idea. Forty ribbons.</span>
          {!ready && (
            <button
              className={styles.activate}
              type="button"
              onClick={() => {
                setActive(true);
                setAttempt((a) => a + 1);
              }}
            >
              {failed
                ? "Try the interactive study again"
                : "Explore the 3D study"}{" "}
              <span aria-hidden="true">↗</span>
            </button>
          )}
        </div>
        <div className={styles.controls}>
          <div className={styles.controlIntro}>
            <span aria-hidden="true">✳</span>
            <h3>A change in perspective.</h3>
            <p>
              Fold the surface. Move the light. <br />
              Find a form you like.
            </p>
          </div>
          <fieldset disabled={!ready}>
            <legend>Material</legend>
            <div className={styles.materials}>
              {(["porcelain", "aluminum", "iris"] as const).map((m) => (
                <button
                  type="button"
                  key={m}
                  aria-pressed={material === m}
                  onClick={() => setMaterial(m)}
                >
                  <i data-material={m} aria-hidden="true" />
                  {m[0].toUpperCase() + m.slice(1)}
                </button>
              ))}
            </div>
          </fieldset>
          <label className={styles.slider}>
            <span>
              Fold <output>{fold}%</output>
            </span>
            <input
              type="range"
              min="0"
              max="100"
              aria-label="Fold"
              aria-valuetext={`${fold} percent`}
              value={fold}
              disabled={!ready}
              onChange={(e) => setFold(+e.target.value)}
            />
          </label>
          <label className={styles.slider}>
            <span>
              Light <output>{light}°</output>
            </span>
            <input
              type="range"
              min="-75"
              max="135"
              aria-label="Light"
              aria-valuetext={`${light} degrees`}
              value={light}
              disabled={!ready}
              onChange={(e) => setLight(+e.target.value)}
            />
          </label>
          <label className={styles.slider}>
            <span>
              Viewpoint <output>{orbit}°</output>
            </span>
            <input
              type="range"
              min="-60"
              max="110"
              aria-label="Viewpoint"
              aria-valuetext={`${orbit} degrees`}
              value={orbit}
              disabled={!ready}
              onChange={(e) => setOrbit(+e.target.value)}
            />
          </label>
          <p className={styles.caption}>
            An original interactive experiment made for this portfolio.
          </p>
          <a href="#workspace">
            Back to the desk <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
