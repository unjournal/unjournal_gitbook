# November 20 review decisions

A separate read-only agent checked the issuer closing announcement, final SEC prospectus, Yahoo Finance's named reporting, offering arithmetic, and both existing simulations. No private records were used.

| Question | Decision and evidence | Status |
|---|---|---|
| Does OpenAI's November 18 news announce a new filing or IPO date? | No. Altman reaffirms intent; June 8 official confidential-submission announcement remains the primary filing evidence. Label current remarks reported; no new offering terms inferred. | Incorporated |
| Is Anthropic still awaiting pricing or trading? | No. The November 20 issuer announcement confirms November 19 first trading and closing, including the full underwriter option. Replace current proposed terms; retain the November 10 proposal as history. | Corrected |
| Should the realization factors become 100%? | No. They cover taxes, future sale value, holding choices, and liquidity. The grant simulation has no IPO Bernoulli gate. Resolve the separate listing row as observed without pretending that all pledge-bearing wealth is realized. | Retained judgment |
| Should retained outputs be presented as zero IPO effect? | No. They are conditional scenarios with unreconciled historical equity/valuation inputs and judgmental cause shares/payout rates. The evidence strengthens liquidity but does not calibrate a precise numerical update. | Explicit limitation |
| Can IPO proceeds enter the charitable ledger? | No. Separate company proceeds, selling-stockholder gross proceeds, concurrent private placement, and charitable grants. Source arithmetic is computed in the review script. | Excluded |
| Do current closing summaries cite current evidence? | The independent check found the GH&D closing summary still linked November 10 sources. Updated it and the lockup entry to closing/final-prospectus citations. | Corrected |
| Could new defaults rewrite past forecasts? | Freeze November 13 outputs as literals; append November 20 points with inputsChanged false. Compare the entire prior feed and retain AW scenarios and commitment ledger exactly. | Verified |

Sources: [issuer closing](https://www.anthropic.com/news/ipo-close), [final prospectus](https://www.sec.gov/Archives/edgar/data/2130357/000162828026074944/anthropicpbc-424b4.htm), [OpenAI remarks](https://finance.yahoo.com/markets/article/openai-ceo-sam-altman-on-potential-ipo-we-plan-to-be-public-184333485.html), [official confidential submission](https://openai.com/index/openai-submits-confidential-s-1/).

Reproduce numerical outputs and stress grids with `node scripts/review_november20_forecasts.mjs`. These checks establish reproducibility and accounting consistency, not empirical forecast accuracy.
