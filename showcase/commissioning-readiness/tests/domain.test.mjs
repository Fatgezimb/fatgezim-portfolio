import test from "node:test";
import assert from "node:assert/strict";
import {
  seed,
  status,
  readiness,
  applyEvent,
  turnover,
  restore,
  GATES,
} from "../src/domain.js";
const record = (s, id, gate, result = "pass") =>
  applyEvent(s, {
    type: "record",
    moduleId: id,
    gateId: gate,
    result,
    reference: "TEST-RECORD",
    by: "Test reviewer",
    note: "Reviewed the supplied demonstration evidence.",
  });
test("seed contains six modules and one ready package", () => {
  const s = seed();
  assert.equal(s.modules.length, 6);
  assert.equal(s.modules.filter((m) => readiness(m).ready).length, 1);
  assert.equal(status(s.modules[0], "l4"), "failed");
});
test("downstream acceptance cannot bypass an exception", () =>
  assert.throws(() => record(seed(), "PM-101", "l5"), /prerequisite/));
test("corrective retest opens the next gate, not automatic handover", () => {
  const s = record(seed(), "PM-101", "l4");
  assert.equal(status(s.modules[0], "l5"), "pending");
  assert.equal(turnover(s, "PM-101").ready, false);
});
test("complete current chain permits turnover", () => {
  let s = seed();
  for (const id of ["l4", "l5", "handover"]) s = record(s, "PM-101", id);
  assert.equal(turnover(s, "PM-101").ready, true);
});
test("revision invalidates every prior acceptance", () => {
  const s = applyEvent(seed(), {
    type: "revise",
    moduleId: "PM-104",
    by: "Engineer",
    note: "Updated design revision for this module.",
  });
  const m = s.modules.find((m) => m.id === "PM-104");
  assert.equal(readiness(m).accepted, 0);
  for (const g of GATES) assert.equal(status(m, g.id), "stale");
});
test("same-revision retest invalidates downstream evidence fingerprints", () => {
  const s = record(seed(), "PM-104", "l3");
  const m = s.modules.find((m) => m.id === "PM-104");
  assert.equal(status(m, "l4"), "stale");
  assert.equal(status(m, "l5"), "blocked");
  assert.equal(readiness(m).ready, false);
});
test("events append immutably and exports retain actual readiness", () => {
  const s = seed(),
    before = JSON.stringify(s);
  const n = record(s, "PM-101", "l4");
  assert.equal(JSON.stringify(s), before);
  assert.equal(n.events.length, s.events.length + 1);
  assert.equal(turnover(n, "PM-101").blockers.length, 2);
});
test("missing review and malformed result rejected", () => {
  assert.throws(() =>
    applyEvent(seed(), { type: "record", moduleId: "PM-101", gateId: "l4" }),
  );
  assert.throws(() => record(seed(), "PM-101", "l4", "skip"));
});
test("corrupted browser state recovers safely", () => {
  assert.equal(restore("{").recovered, false);
  const s = seed();
  assert.equal(restore(JSON.stringify(s)).recovered, true);
  s.modules[0].evidence.design.dependencies = null;
  assert.equal(restore(JSON.stringify(s)).recovered, false);
});
test("assignment changes are audited without changing acceptance", () => {
  const s = seed(),
    n = applyEvent(s, {
      type: "assign",
      moduleId: "PM-101",
      owner: "Retest team",
      by: "Coordinator",
      note: "Assigned corrective review to the retest team.",
    });
  assert.equal(n.modules[0].owner, "Retest team");
  assert.deepEqual(readiness(s.modules[0]), readiness(n.modules[0]));
  assert.equal(n.events.at(-1).type, "assign");
});
