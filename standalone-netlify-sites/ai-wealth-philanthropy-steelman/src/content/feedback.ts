export type FeedbackNote = {
  id: string;
  marker: string;
  title: string;
  url: string;
  quote: string;
  note: string;
};

const michaelForumUrl =
  "https://forum.effectivealtruism.org/posts/fFDM9RNckMC6ndtYZ/david_reinstein-s-shortform?commentId=JS2dmcbgfvy3xtBwj";

export const feedbackNotes: FeedbackNote[] = [
  {
    id: "md-prioritize-gates",
    marker: "MD",
    title: "Michael Dickens on gate prioritization",
    url: michaelForumUrl,
    quote: "All 8 gates look correct to me, but they don't all deserve equal emphasis.",
    note: "Prompted the sensitivity-focused framing rather than presenting the gates as equally important."
  },
  {
    id: "md-lockup-delay",
    marker: "MD",
    title: "Michael Dickens on lockups",
    url: michaelForumUrl,
    quote: "The main reason it's relevant is that a lockup gives more time for AI valuations to fluctuate or collapse",
    note: "Prompted the lockup language to focus on delay and valuation risk, not unpredictable lockup duration."
  },
  {
    id: "md-merge-gates",
    marker: "MD",
    title: "Michael Dickens on Gates 5 and 7",
    url: michaelForumUrl,
    quote: "Gate 5 and Gate 7 seem like they're saying the same thing.",
    note: "Prompted merging the lab-compatible-work and social-graph concentration points."
  },
  {
    id: "md-bay-incentives",
    marker: "MD",
    title: "Michael Dickens on Bay social incentives",
    url: michaelForumUrl,
    quote: "It's more like a meta-level reason why people might not think about the other 7 gates.",
    note: "Prompted moving this from a core gate to an epistemic caution."
  },
  {
    id: "md-distributions",
    marker: "MD",
    title: "Michael Dickens on distributions",
    url: michaelForumUrl,
    quote: "Would be cool for the BOTEC to use distributions rather than point estimates.",
    note: "Prompted the explicit note that the current tool is a deterministic expected-value calculator, not a full distributional model."
  },
  {
    id: "md-inline-citations",
    marker: "MD",
    title: "Michael Dickens on model provenance",
    url: michaelForumUrl,
    quote: "There should be inline citations.",
    note: "Prompted source/provenance notes on model assumptions and defaults."
  },
  {
    id: "md-valuation-lockup",
    marker: "MD",
    title: "Michael Dickens on valuation timing",
    url: michaelForumUrl,
    quote: "Anthropic valuation variable should specifically be the valuation at the end of the 6-month lockup.",
    note: "Prompted the valuation-control wording to distinguish headline valuation from realizable post-lockup value."
  },
  {
    id: "md-founder-pledge",
    marker: "MD",
    title: "Michael Dickens on founder pledge wording",
    url: michaelForumUrl,
    quote: "Unclear what the \"Founder pledge\" variable refers to.",
    note: "Prompted clearer labeling of the pledge face value versus later follow-through and timing gates."
  },
  {
    id: "md-employee-pool",
    marker: "MD",
    title: "Michael Dickens on employee pool",
    url: michaelForumUrl,
    quote: "Shouldn't it depend on the value of the equity?",
    note: "Prompted clearer treatment of the employee pool as an editable simplification rather than an independently sourced stock."
  },
  {
    id: "md-end-2026",
    marker: "MD",
    title: "Michael Dickens on the end-2026 target",
    url: michaelForumUrl,
    quote: "IMO \"Deployment by end-2026\" should use a different date.",
    note: "Prompted moving the main deployment deadline from end-2026 to end-2027/post-lockup timing."
  },
  {
    id: "md-openai-foundation",
    marker: "MD",
    title: "Michael Dickens on OpenAI Foundation",
    url: michaelForumUrl,
    quote: "I would delete the OpenAI Foundation bit",
    note: "Prompted separating OpenAI Foundation from the core AIS/EA conversion model and treating it as broad AI-era philanthropy context."
  },
  {
    id: "md-capacity-cap",
    marker: "MD",
    title: "Michael Dickens on grantmaking capacity",
    url: michaelForumUrl,
    quote: "A simple cap is the way to do it.",
    note: "Prompted replacing the capacity multiplier and absorption ceiling with one near-term deployment cap."
  },
  {
    id: "md-collapse-risk",
    marker: "MD",
    title: "Michael Dickens on downside tails",
    url: michaelForumUrl,
    quote: "You should expect at least a 10-20% chance that Anthropic stockholders get nothing.",
    note: "Prompted explicit caveats about collapse/downside-tail risk that a point estimate can hide."
  },
  {
    id: "md-planning",
    marker: "MD",
    title: "Michael Dickens on planning advice",
    url: michaelForumUrl,
    quote: "\"How to plan if the skeptical case is live\" is just \"business as usual\".",
    note: "Prompted narrowing the planning section to the specific failure mode: implicitly relying on a near-term AI-wealth windfall."
  },
  {
    id: "md-update-priority",
    marker: "MD",
    title: "Michael Dickens on update priorities",
    url: michaelForumUrl,
    quote: "By far the biggest uncertainty... is: What will Anthropic's valuation be when the lockup ends?",
    note: "Prompted reprioritizing the update list around realizable valuation at liquidity/lockup expiry."
  },
  {
    id: "dr-sensitivity-not-ranking",
    marker: "DR",
    title: "Daaron Reinstein on gate emphasis",
    url: "https://hypothes.is/a/etY7tmpLEfGpgSety5eIMA",
    quote: "This should more like sensitivity analysis",
    note: "Prompted treating gate importance as sensitivity analysis rather than a standalone ranking exercise."
  },
  {
    id: "dr-lockup-time-profile",
    marker: "DR",
    title: "Daaron Reinstein on lockups and timing",
    url: "https://hypothes.is/a/ro2WDGpLEfGGue95u42fBw",
    quote: "some delay, which should be modeled, considering the time profile",
    note: "Prompted clearer language that lockups primarily shift and expose the time profile of predicted donation flows."
  },
  {
    id: "dr-merge-social-graph",
    marker: "DR",
    title: "Daaron Reinstein on merging social-graph and cause-fit gates",
    url: "https://hypothes.is/a/-F_dimpLEfG1TX_LCGxotA",
    quote: "Let's try to put these together for now",
    note: "Prompted keeping lab-compatibility and social proximity together while making the social-graph claim more concrete."
  },
  {
    id: "dr-expost-adjustment",
    marker: "DR",
    title: "Daaron Reinstein on ex-post adjustment",
    url: "https://hypothes.is/a/O-fzRGpMEfG_2--UV-iUXA",
    quote: "So something like an 'ex-post adjustment factor' people could slide?",
    note: "Prompted adding an editable local-confidence adjustment to the calculator."
  },
  {
    id: "dr-distributions-ev-calculator",
    marker: "DR",
    title: "Daaron Reinstein on expected value and distributions",
    url: "https://hypothes.is/a/zkffGmpMEfGYD8tGWTx_GA",
    quote: "use it as an 'expected value calculator only'",
    note: "Prompted making the current model's role explicit while preserving a future path to correlated distributions."
  },
  {
    id: "uj-planning-scenarios",
    marker: "UJ",
    title: "Unjournal on separating planning scenarios",
    url: "https://hypothes.is/a/yzUiamwTEfGU0uuuhVQblA",
    quote: "talking about two different scenarios here",
    note: "Prompted splitting planning advice into a skeptical/base scenario and an optimistic-but-bottlenecked scenario."
  },
  {
    id: "uj-planning-adjust",
    marker: "UJ",
    title: "Unjournal on planning advice",
    url: "https://hypothes.is/a/mfwE_GwTEfGQmRtTXZ8JKQ",
    quote: "This makes sense to me. Please do adjust.",
    note: "Prompted tightening generic business-as-usual planning into more specific next steps."
  },
  {
    id: "uj-update-prominence",
    marker: "UJ",
    title: "Unjournal on update tracking",
    url: "https://hypothes.is/a/8o4aEGwTEfGCXQ9Mgquzhg",
    quote: "make the date of updates more prominent",
    note: "Prompted a more visible update date and a concrete automation next step."
  }
];

export const feedbackById = Object.fromEntries(feedbackNotes.map((item) => [item.id, item])) as Record<
  string,
  FeedbackNote
>;
