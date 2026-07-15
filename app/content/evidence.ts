import { gmuNeuronalReconstruction, researchAssets } from "./research";

export type EvidenceStatus =
  | "Verified artifact"
  | "Owner-confirmed; documentation pending";

export type EvidenceRecord = {
  id: string;
  title: string;
  status: EvidenceStatus;
  sourceType: "Original research poster" | "Owner confirmation";
  sourceHref?: string;
  supports: readonly string[];
  publicNote: string;
};

export const researchEvidence: readonly EvidenceRecord[] = [
  {
    id: "gmu-neuronal-reconstruction-poster",
    title: gmuNeuronalReconstruction.title,
    status: "Verified artifact",
    sourceType: "Original research poster",
    sourceHref: researchAssets.posterPdf,
    supports: [
      "project title and co-authors",
      "institutional center",
      "Fiji/ImageJ, Vaa3D, and NeuTube workflow",
      "Class 4 neuronal reconstruction shown in the poster",
    ],
    publicNote:
      "The original poster is the primary source for the George Mason project summary and workflow.",
  },
  {
    id: "ross-medical-education-owner-confirmation",
    title: "Medical education and visual attention research",
    status: "Owner-confirmed; documentation pending",
    sourceType: "Owner confirmation",
    supports: ["research-proposal experience and subject area"],
    publicNote:
      "The public summary is limited to the owner-confirmed research-proposal experience and subject area while documentation is pending.",
  },
];
