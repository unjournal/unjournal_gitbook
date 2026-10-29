export type SubmittedEstimate = {
  id: string;
  contributor: string;
  submittedAt: string;
  source: string;
  timingFrame: string;
  rawTotalB: number;
  capacityAdjustedB: number;
  comment: string;
  inputs: Array<{ label: string; value: string }>;
};

export const submittedEstimates: SubmittedEstimate[] = [
  {
    id: "michael-dickens-2026-06-20",
    contributor: "Michael Dickens",
    submittedAt: "2026-06-20T16:11:13.471Z",
    source:
      "Netlify estimate form; also noted on the EA Forum shortform thread.",
    timingFrame:
      "Submitted under the earlier end-2026 deployment wording. Treat this as a very-low near-term timing case, not directly comparable to the revised end-2027 default.",
    rawTotalB: 0.014,
    capacityAdjustedB: 0.014,
    comment:
      "Mostly just testing the form submit. I spent 5 seconds moving the sliders to what sounded immediately reasonable to me.",
    inputs: [
      { label: "Anthropic valuation", value: "$500B" },
      { label: "Founder ownership", value: "15%" },
      { label: "Founder pledge face value", value: "20%" },
      { label: "Founder realization", value: "60%" },
      { label: "Founder follow-through", value: "10%" },
      { label: "Founder AIS/EA allocation", value: "40%" },
      { label: "Founder deployment by old end-2026 deadline", value: "0.5%" },
      { label: "Employee committed pool", value: "$20B" },
      { label: "Employee realization", value: "60%" },
      { label: "Employee AIS/EA allocation", value: "20%" },
      { label: "Employee deployment by old end-2026 deadline", value: "0.5%" },
      { label: "Local-confidence adjustment", value: "100%" },
      { label: "Near-term deployment cap", value: "$5B" }
    ]
  }
];
