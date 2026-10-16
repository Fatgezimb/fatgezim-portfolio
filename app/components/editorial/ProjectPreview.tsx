"use client";
import { lazy, Suspense } from "react";
import NeuroStackPreview from "./NeuroStackPreview";

const EngineeringPreview = lazy(() => import("./EngineeringPreview"));

const OperationalExperience = lazy(() =>
  import("../project-experiences/OperationalExperiences").then((module) => ({
    default: module.OperationalExperience,
  })),
);
const TechnicalExperience = lazy(() =>
  import("../project-experiences/TechnicalExperiences").then((module) => ({
    default: module.TechnicalExperience,
  })),
);

export default function ProjectPreview({ id }: { id: string }) {
  if (["commissioning-readiness", "grid-forecast", "clinical-assessment-portal"].includes(id)) return <EngineeringPreview id={id} />;
  if (id === "neurostack-explorer") return <NeuroStackPreview />;
  return (
    <Suspense fallback={<p role="status">Opening the interactive preview…</p>}>
      {id === "rbt-practice-hub" || id === "stepspark" ? (
        <TechnicalExperience projectId={id} />
      ) : (
        <OperationalExperience projectId={id} />
      )}
    </Suspense>
  );
}
