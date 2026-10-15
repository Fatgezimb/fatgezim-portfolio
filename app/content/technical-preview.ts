// Source audit: docs/portfolio/redesign-project-evidence.md.
// Preview records are independent of production accounts and never mutate product data.
// Neural data: first 20s of https://github.com/Fatgezimb/neurostack-explorer/blob/main/public/artifacts/v1/demo-dataset.json
// Eight units, 100ms rate bins averaged into 1s bins; original spike times rounded to 4 decimals.
// DANDI 000582 / 0.251111.2151; Sargolini et al.; CC BY 4.0. Provenance also appears in the UI.
// RBT items: owner-authored source in the RBT Practice Hub project, tasks 1–3.
// StepSpark cards irc-001 and irc-004: https://github.com/Fatgezimb/StepSpark — educational drafts.
type NeuralUnit = { id: string; rates: number[]; spikes: number[] };

export const neuralUnits: NeuralUnit[] = [
  {
    id: "t1c1",
    rates: [
      5.0, 4.0, 1.0, 0.0, 5.0, 11.0, 11.0, 5.0, 0.0, 0.0, 0.0, 12.0, 5.0, 18.0,
      24.0, 1.0, 0.0, 4.0, 10.0, 12.0,
    ],
    spikes: [
      0.7904, 0.794, 0.8112, 0.8314, 0.9218, 1.0205, 1.3573, 1.6583, 1.6769,
      2.7458, 4.0087, 4.0168, 4.4023, 4.5226, 4.5277, 5.5988, 5.6142, 5.6179,
      5.6893, 5.7015, 5.7149, 5.7174, 5.7232, 5.8068, 5.8149, 5.8208, 6.1642,
      6.202, 6.2261, 6.2363, 6.3547, 6.3639, 6.4801, 6.488, 6.8999, 6.9925,
      6.9959, 7.0331, 7.0981, 7.1015, 7.1057, 7.2455, 11.0697, 11.5, 11.5112,
      11.5224, 11.6165, 11.7023, 11.7146, 11.7245, 11.921, 11.9834, 11.9863,
      11.9956, 12.089, 12.1054, 12.1487, 12.1571, 12.1659, 13.1237, 13.2066,
      13.2249, 13.2325, 13.3629, 13.4089, 13.5227, 13.5302, 13.5412, 13.6239,
      13.6853, 13.7383, 13.7573, 13.8125, 13.8554, 13.9711, 13.9866, 13.9928,
      14.083, 14.1622, 14.1655, 14.3942, 14.3974, 14.4887, 14.4927, 14.5006,
      14.5478, 14.564, 14.5875, 14.5907, 14.5938, 14.6017, 14.6087, 14.6201,
      14.6471, 14.6993, 14.7019, 14.7416, 14.801, 14.804, 14.8894, 14.8954,
      15.3316, 17.4496, 17.4853, 17.7532, 17.8509, 18.3577, 18.3789, 18.3915,
      18.596, 18.6029, 18.6275, 18.6348, 18.8329, 18.8441, 18.9828, 19.0436,
      19.0682, 19.1117, 19.1817, 19.1964, 19.2929, 19.3098, 19.3338, 19.3366,
      19.3529, 19.4226, 19.5412,
    ],
  },
  {
    id: "t2c1",
    rates: [
      0.0, 2.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 3.0,
      0.0, 0.0, 0.0, 0.0, 9.0,
    ],
    spikes: [
      1.0451, 1.7004, 2.3154, 11.0468, 14.2397, 14.8229, 14.837, 19.2813,
      19.5854, 19.604, 19.7191, 19.7226, 19.8195, 19.823, 19.8257, 19.8295,
    ],
  },
  {
    id: "t2c3",
    rates: [
      7.0, 11.0, 0.0, 1.0, 0.0, 2.0, 3.0, 3.0, 4.0, 0.0, 3.0, 4.0, 0.0, 4.0,
      1.0, 0.0, 2.0, 2.0, 0.0, 3.0,
    ],
    spikes: [
      0.1827, 0.5341, 0.5707, 0.7023, 0.7243, 0.7671, 0.8808, 1.0608, 1.1815,
      1.2828, 1.2923, 1.4162, 1.5238, 1.543, 1.5909, 1.6242, 1.6451, 1.7133,
      3.0416, 5.2956, 5.5169, 6.2453, 6.3369, 6.6402, 7.0117, 7.0894, 7.2013,
      8.1189, 8.1547, 8.2513, 8.6056, 10.5023, 10.8489, 10.9313, 11.8528,
      11.8684, 11.8779, 11.9636, 13.1233, 13.5303, 13.6881, 13.7513, 14.1598,
      16.8108, 16.9199, 17.3236, 17.4548, 19.2395, 19.3066, 19.7303,
    ],
  },
  {
    id: "t3c1",
    rates: [
      0.0, 10.0, 32.0, 4.0, 3.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
      1.0, 2.0, 5.0, 0.0, 0.0, 5.0,
    ],
    spikes: [
      1.0358, 1.048, 1.6964, 1.778, 1.7842, 1.8619, 1.8659, 1.8791, 1.8885,
      1.9763, 2.0487, 2.1342, 2.1699, 2.2325, 2.2459, 2.2514, 2.2591, 2.2776,
      2.2824, 2.2996, 2.3334, 2.3404, 2.3473, 2.3584, 2.3805, 2.3935, 2.4018,
      2.4202, 2.441, 2.4518, 2.4599, 2.4682, 2.4747, 2.4856, 2.5209, 2.555,
      2.5717, 2.5835, 2.5916, 2.6128, 2.671, 2.8893, 3.1349, 3.2007, 3.3154,
      3.4336, 4.2434, 4.2707, 4.3468, 14.8621, 15.2978, 15.5435, 16.012,
      16.1956, 16.3229, 16.8552, 16.8642, 19.7303, 19.7566, 19.7654, 19.8773,
      19.9308,
    ],
  },
  {
    id: "t3c2",
    rates: [
      0.0, 0.0, 2.0, 5.0, 7.0, 4.0, 1.0, 0.0, 0.0, 5.0, 3.0, 0.0, 1.0, 3.0, 1.0,
      1.0, 0.0, 0.0, 0.0, 0.0,
    ],
    spikes: [
      2.4303, 2.4398, 3.1797, 3.3902, 3.3985, 3.7484, 3.9609, 4.1087, 4.2004,
      4.2929, 4.2988, 4.3889, 4.4823, 4.5187, 5.6944, 5.7344, 5.9133, 5.9189,
      6.1388, 9.3935, 9.4911, 9.7989, 9.9404, 9.9892, 10.0051, 10.3296, 10.3474,
      12.3839, 13.5841, 13.6318, 13.6352, 14.6609, 15.3809,
    ],
  },
  {
    id: "t3c3",
    rates: [
      0.0, 0.0, 2.0, 10.0, 10.0, 6.0, 2.0, 0.0, 0.0, 4.0, 6.0, 0.0, 4.0, 6.0,
      1.0, 8.0, 4.0, 1.0, 3.0, 0.0,
    ],
    spikes: [
      2.1158, 2.4254, 3.363, 3.3742, 3.383, 3.3922, 3.6155, 3.7246, 3.7556,
      3.8246, 3.9328, 3.9541, 4.0763, 4.1001, 4.1108, 4.177, 4.2404, 4.2813,
      4.2886, 4.3658, 4.4359, 4.4404, 5.6668, 5.7726, 5.785, 5.8515, 5.9689,
      5.9991, 6.076, 6.2941, 9.389, 9.4883, 9.8492, 9.9172, 10.0166, 10.0896,
      10.1527, 10.2614, 10.2884, 10.3463, 12.369, 12.3931, 12.4153, 12.6297,
      13.047, 13.0547, 13.2718, 13.3196, 13.3344, 13.649, 14.1083, 15.2332,
      15.2807, 15.3307, 15.3347, 15.3711, 15.3746, 15.432, 15.4879, 16.687,
      16.8736, 16.8876, 16.8926, 17.9968, 18.6425, 18.779, 18.8919,
    ],
  },
  {
    id: "t3c4",
    rates: [
      1.0, 0.0, 1.0, 11.0, 5.0, 3.0, 0.0, 1.0, 0.0, 6.0, 5.0, 6.0, 1.0, 4.0,
      2.0, 6.0, 4.0, 3.0, 10.0, 7.0,
    ],
    spikes: [
      0.0795, 2.2449, 3.1739, 3.1857, 3.2533, 3.3548, 3.4245, 3.6218, 3.6541,
      3.7325, 3.7621, 3.9386, 3.9653, 4.0173, 4.2548, 4.4463, 4.5053, 4.6236,
      5.8182, 5.8648, 5.964, 7.1275, 9.304, 9.4043, 9.5079, 9.5924, 9.717,
      9.9632, 10.0147, 10.2953, 10.3398, 10.4017, 10.5955, 11.2818, 11.5209,
      11.5229, 11.8123, 11.8362, 11.938, 12.6583, 13.3364, 13.3441, 13.7611,
      13.8625, 14.445, 14.4626, 15.3097, 15.3181, 15.3263, 15.3931, 15.4363,
      15.6113, 16.1368, 16.5797, 16.828, 16.8904, 17.0122, 17.7256, 17.7857,
      18.2854, 18.3409, 18.3856, 18.4709, 18.5118, 18.5388, 18.5473, 18.6436,
      18.7758, 18.9416, 19.0351, 19.0897, 19.3814, 19.7738, 19.8152, 19.8191,
      19.974,
    ],
  },
  {
    id: "t4c1",
    rates: [
      0.0, 0.0, 2.0, 10.0, 13.0, 5.0, 3.0, 0.0, 0.0, 4.0, 3.0, 0.0, 1.0, 5.0,
      1.0, 0.0, 0.0, 0.0, 0.0, 0.0,
    ],
    spikes: [
      2.4302, 2.4398, 3.1796, 3.3701, 3.3866, 3.3901, 3.3985, 3.6098, 3.7483,
      3.9608, 3.9855, 3.9927, 4.1086, 4.2004, 4.2929, 4.2987, 4.3034, 4.3133,
      4.3886, 4.4518, 4.4548, 4.4823, 4.487, 4.5105, 4.5187, 5.6944, 5.726,
      5.7344, 5.9133, 5.9189, 6.0388, 6.1387, 6.1596, 9.4823, 9.7989, 9.9403,
      9.9891, 10.0051, 10.3295, 10.3474, 12.1759, 13.3431, 13.584, 13.5901,
      13.6318, 13.6351, 14.4276,
    ],
  },
];

export const rbtTasks = [
  {
    number: 1,
    name: "Continuous measurement",
    front: "What makes a measurement procedure continuous?",
    back: "It captures each occurrence of the target behavior or a timing dimension of that behavior during the observation.",
    question:
      "A technician records each time a learner raises a hand during a 20-minute small group. Which measure is being used?",
    choices: ["Duration", "Frequency", "Latency", "IRT"],
    answer: "Frequency",
    explanation:
      "Frequency counts each occurrence of a behavior with a clear beginning and end.",
  },
  {
    number: 2,
    name: "Discontinuous measurement",
    front: "What makes a measurement procedure discontinuous?",
    back: "It samples behavior during intervals or moments instead of recording every occurrence.",
    question: "Which rule describes whole-interval recording?",
    choices: [
      "Score if the behavior occurs at any time in the interval.",
      "Score whether behavior occurs when the interval ends.",
      "Score only if behavior occurs for the entire interval.",
    ],
    answer: "Score only if behavior occurs for the entire interval.",
    explanation:
      "Whole-interval recording requires the behavior throughout the full interval for an occurrence to be scored.",
  },
  {
    number: 3,
    name: "Data and graphs",
    front: "What is permanent product measurement?",
    back: "Measuring the result left after behavior occurs, such as completed worksheets, cleaned areas, or assembled items.",
    question:
      "Which graph is usually best for showing behavior change across sessions?",
    choices: ["Bar graph", "Preference array", "Line graph", "ABC checklist"],
    answer: "Line graph",
    explanation:
      "A line graph displays repeated data points across time or sessions, making change easier to see.",
  },
] as const;

export const recallCards = [
  {
    id: "irc-001",
    title: "Reed-Sternberg recognition",
    system: "Hematology",
    prompt: "Inspect the histology image and identify the lymphoma pattern.",
    clue: "Painless cervical lymphadenopathy with large owl-eye cells on biopsy.",
    answer:
      "Hodgkin lymphoma with Reed-Sternberg cells, classically CD15+ and CD30+.",
    explanation:
      "The visual trigger is the large bilobed cell with prominent nucleoli in an appropriate lymph node presentation.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/e/e1/Reed-sternberg_cell.jpg",
    imageAlt:
      "National Cancer Institute histology image of a Reed-Sternberg cell",
    source: "National Cancer Institute via Wikimedia Commons",
    license: "Public domain",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Reed-sternberg_cell.jpg",
  },
  {
    id: "irc-004",
    title: "HOCM maneuver",
    system: "Cardiovascular",
    prompt: "Predict which murmur mechanism worsens when preload decreases.",
    clue: "A systolic murmur becomes louder with Valsalva or standing.",
    answer: "Hypertrophic obstructive cardiomyopathy.",
    explanation:
      "Reduced preload narrows the left ventricular cavity, increasing dynamic outflow obstruction.",
    image:
      "https://fatgezimb.github.io/StepSpark/media/instant-recall/hocm-preload.svg",
    imageAlt:
      "StepSpark diagram showing reduced preload and a narrower left ventricular cavity",
    source: "StepSpark original vector diagram",
    license: "Educational draft asset",
    sourceUrl:
      "https://github.com/Fatgezimb/StepSpark/blob/main/public/media/instant-recall/hocm-preload.svg",
  },
] as const;
