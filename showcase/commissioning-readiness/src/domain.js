/** Workflow model. Evidence validity is computed from revisions and dependency IDs. */
export const SCHEMA = 1;
export const GATES = [
  {
    id: "design",
    name: "Design release",
    short: "Release",
    level: "R",
    location: "Engineering",
    requires: [],
    deliverable: "Approved design register",
    description:
      "Confirm the package revision referenced by the acceptance records.",
  },
  {
    id: "l3",
    name: "Installation verification",
    short: "Level 3",
    level: "L3",
    location: "Factory",
    requires: ["design"],
    deliverable: "Installation verification record",
    description: "Review the recorded inspection against the released package.",
  },
  {
    id: "l4",
    name: "Functional acceptance",
    short: "Level 4",
    level: "L4",
    location: "Factory",
    requires: ["l3"],
    deliverable: "Functional test report",
    description:
      "Review the factory test result and any unresolved exceptions.",
  },
  {
    id: "l5",
    name: "Integrated acceptance",
    short: "Level 5",
    level: "L5",
    location: "Site",
    requires: ["l4"],
    deliverable: "Integrated test report",
    description:
      "Review the site integration evidence after the factory prerequisites are accepted.",
  },
  {
    id: "handover",
    name: "Operations handover",
    short: "Turnover",
    level: "TO",
    location: "Operations",
    requires: ["l5"],
    deliverable: "Turnover index and acceptance note",
    description:
      "Confirm the evidence chain is current before handing the package to operations.",
  },
];
export const STATUSES = {
  accepted: "Accepted",
  failed: "Exception",
  stale: "Outdated",
  blocked: "Blocked",
  pending: "Awaiting evidence",
};
const copy = (s) => structuredClone(s);
export function gateFor(id) {
  const gate = GATES.find((g) => g.id === id);
  if (!gate) throw Error("Unknown gate");
  return gate;
}
export function status(module, gateId, visiting = new Set()) {
  if (visiting.has(gateId)) throw Error("Cyclic acceptance dependency");
  const gate = gateFor(gateId),
    seen = new Set(visiting).add(gateId),
    e = module.evidence[gateId];
  if (e && e.revision !== module.revision) return "stale";
  if (
    e &&
    gate.requires.some((id) => e.dependencies[id] !== module.evidence[id]?.id)
  )
    return "stale";
  if (gate.requires.some((id) => status(module, id, seen) !== "accepted"))
    return "blocked";
  if (!e) return "pending";
  return e.result === "pass" ? "accepted" : "failed";
}
export function readiness(module) {
  const accepted = GATES.filter(
    (g) => status(module, g.id) === "accepted",
  ).length;
  return {
    accepted,
    total: GATES.length,
    ready: accepted === GATES.length,
    first: GATES.find((g) => status(module, g.id) !== "accepted")?.id ?? null,
  };
}
export function blockers(module) {
  return GATES.filter((g) => status(module, g.id) !== "accepted").map((g) => ({
    gate: g.id,
    status: status(module, g.id),
    reason: reason(module, g.id),
  }));
}
export function reason(module, id) {
  const g = gateFor(id),
    s = status(module, id),
    e = module.evidence[id];
  if (s === "accepted")
    return `${e.reference} accepted for revision ${module.revision}.`;
  if (s === "stale")
    return e?.revision !== module.revision
      ? `Evidence references revision ${e.revision}; current revision is ${module.revision}.`
      : "A prerequisite record changed. Review and record fresh evidence.";
  if (s === "blocked")
    return `Requires ${g.requires
      .filter((r) => status(module, r) !== "accepted")
      .map((r) => gateFor(r).short)
      .join(", ")} acceptance.`;
  if (s === "failed") return e.note;
  return `Awaiting ${g.deliverable.toLowerCase()}.`;
}
export function applyEvent(state, action, now = new Date().toISOString()) {
  const next = copy(state),
    m = next.modules.find((x) => x.id === action.moduleId);
  if (!m) throw Error("Unknown module");
  if (
    !action.by?.trim() ||
    !action.note?.trim() ||
    action.note.trim().length < 8
  )
    throw Error("Add a reviewer and a note of at least 8 characters.");
  const id = `EV-${String(next.events.length + 1).padStart(4, "0")}`;
  let event;
  if (action.type === "record") {
    const gate = gateFor(action.gateId);
    if (!["pass", "fail"].includes(action.result))
      throw Error("Choose an acceptance result.");
    if (!action.reference?.trim())
      throw Error("Evidence reference is required.");
    if (gate.requires.some((p) => status(m, p) !== "accepted"))
      throw Error("Accept current prerequisite evidence first.");
    const evidence = {
      id,
      revision: m.revision,
      result: action.result,
      reference: action.reference.trim(),
      note: action.note.trim(),
      by: action.by.trim(),
      at: now,
      dependencies: Object.fromEntries(
        gate.requires.map((p) => [p, m.evidence[p].id]),
      ),
    };
    m.evidence[gate.id] = evidence;
    event = {
      id,
      at: now,
      moduleId: m.id,
      type: "record",
      gateId: gate.id,
      ...evidence,
    };
  } else if (action.type === "revise") {
    const previous = m.revision;
    m.revision += 1;
    event = {
      id,
      at: now,
      moduleId: m.id,
      type: "revise",
      previous,
      revision: m.revision,
      by: action.by.trim(),
      note: action.note.trim(),
    };
  } else if (action.type === "assign") {
    if (!action.owner?.trim()) throw Error("Owner is required.");
    m.owner = action.owner.trim();
    event = {
      id,
      at: now,
      moduleId: m.id,
      type: "assign",
      owner: m.owner,
      by: action.by.trim(),
      note: action.note.trim(),
    };
  } else throw Error("Unknown workflow action");
  next.events.push(event);
  return next;
}
export function seed() {
  let state = {
    schema: SCHEMA,
    project: "Meridian demonstration campus",
    classification: "Fictional demonstration data",
    modules: [
      ["PM-101", "Power module A1", "Hall A", "Factory", "Factory quality"],
      ["PM-102", "Power module A2", "Hall A", "Factory", "Package engineering"],
      ["PM-103", "Power module B1", "Hall B", "Site", "Site commissioning"],
      ["PM-104", "Power module B2", "Hall B", "Site", "Operations review"],
      ["PM-105", "Power module C1", "Hall C", "Factory", "Package engineering"],
      ["PM-106", "Power module C2", "Hall C", "Factory", "Factory quality"],
    ].map(([id, name, zone, location, owner]) => ({
      id,
      name,
      zone,
      location,
      owner,
      revision: 2,
      evidence: {},
    })),
    events: [],
  };
  const pass = (
    moduleId,
    gateId,
    result = "pass",
    note = "Reviewed the sample record and accepted its documented result.",
  ) => {
    state = applyEvent(
      state,
      {
        type: "record",
        moduleId,
        gateId,
        result,
        note,
        reference: `${moduleId}-${gateId.toUpperCase()}-R2`,
        by: "Demo reviewer",
      },
      `2026-10-14T${String(8 + Math.floor(state.events.length / 6)).padStart(2, "0")}:${String((state.events.length % 6) * 10).padStart(2, "0")}:00Z`,
    );
  };
  for (const m of state.modules) {
    pass(m.id, "design");
    if (m.id === "PM-102") continue;
    pass(
      m.id,
      "l3",
      m.id === "PM-106" ? "fail" : "pass",
      m.id === "PM-106"
        ? "Equipment identification in the sample record does not match the released index."
        : "Installation record references the released design revision.",
    );
    if (m.id === "PM-106") continue;
    pass(
      m.id,
      "l4",
      m.id === "PM-101" ? "fail" : "pass",
      m.id === "PM-101"
        ? "Functional report lists an unresolved monitoring-point discrepancy. Retest evidence is required."
        : "Factory functional report reviewed with no open sample exceptions.",
    );
    if (m.id === "PM-104") {
      pass(m.id, "l5");
      pass(m.id, "handover");
    }
  }
  state = applyEvent(
    state,
    {
      type: "revise",
      moduleId: "PM-105",
      by: "Demo engineer",
      note: "Released a new package revision; prior evidence must be reviewed again.",
    },
    "2026-10-14T15:00:00Z",
  );
  return state;
}
export function turnover(state, moduleId) {
  const m = state.modules.find((x) => x.id === moduleId);
  if (!m) throw Error("Unknown module");
  return {
    schema: SCHEMA,
    classification: state.classification,
    project: state.project,
    moduleId: m.id,
    name: m.name,
    revision: m.revision,
    owner: m.owner,
    ready: readiness(m).ready,
    acceptedGates: readiness(m).accepted,
    requiredGates: GATES.length,
    blockers: blockers(m),
    evidence: GATES.map((g) => ({
      gate: g.id,
      title: g.name,
      status: status(m, g.id),
      record: m.evidence[g.id] ?? null,
    })),
    history: state.events.filter((e) => e.moduleId === m.id),
  };
}
export function validateState(state) {
  if (
    !state ||
    state.schema !== SCHEMA ||
    state.classification !== "Fictional demonstration data" ||
    !Array.isArray(state.modules) ||
    state.modules.length !== 6 ||
    !Array.isArray(state.events) ||
    state.events.length > 10000
  )
    throw Error("Unsupported saved demonstration");
  const base = seed();
  if (
    state.modules.some(
      (m) =>
        !base.modules.some((b) => b.id === m.id) ||
        !Number.isInteger(m.revision) ||
        m.revision < 1 ||
        !m.evidence ||
        typeof m.owner !== "string",
    )
  )
    throw Error("Invalid module register");
  if (new Set(state.modules.map((m) => m.id)).size !== 6)
    throw Error("Duplicate module");
  for (const m of state.modules) {
    for (const [id, e] of Object.entries(m.evidence)) {
      gateFor(id);
      if (
        !e ||
        !["pass", "fail"].includes(e.result) ||
        !Number.isInteger(e.revision) ||
        !e.dependencies ||
        typeof e.reference !== "string" ||
        typeof e.note !== "string" ||
        typeof e.by !== "string" ||
        typeof e.id !== "string"
      )
        throw Error("Invalid evidence");
    }
    readiness(m);
  }
  return state;
}
export function restore(serialized) {
  try {
    return { state: validateState(JSON.parse(serialized)), recovered: true };
  } catch {
    return { state: seed(), recovered: false };
  }
}
