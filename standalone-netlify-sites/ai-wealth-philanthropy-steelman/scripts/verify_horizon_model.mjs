import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { build } from "esbuild";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
async function loadModule(path, beforeExtension = false) {
  const result = await build({
    stdin: {
      contents: path, resolveDir: root, loader: "ts"
    },
    bundle: true, platform: "node", format: "esm", write: false,
    plugins: beforeExtension ? [{
      name: "baseline-before-extraction",
      setup(plugin) {
        plugin.onLoad({ filter: /\/correlatedModel\.ts$/ }, ({ path: file }) => ({
          contents: execFileSync("git", ["show", "c5495ab:standalone-netlify-sites/ai-wealth-philanthropy-steelman/src/utils/correlatedModel.ts"], { cwd: root, encoding: "utf8" }),
          loader: "ts", resolveDir: new URL(".", `file://${file}`).pathname
        }));
      }
    }] : []
  });
  return import(`data:text/javascript;base64,${Buffer.from(result.outputFiles[0].text).toString("base64")}`);
}

const sampler = `
  export { defaultModelInputs } from "./src/content/modelDefaults";
  export { defaultCorrelatedConfig, runCorrelatedSimulation } from "./src/utils/correlatedModel";
`;
const current = await loadModule(sampler + `
  export { sampleCorrelatedInputs } from "./src/utils/correlatedModel";
  export * from "./src/utils/horizonModel";
`);
const original = await loadModule(sampler, true);
const config = current.defaultCorrelatedConfig;
const base = current.defaultModelInputs;
const originalDraws = original.runCorrelatedSimulation(original.defaultModelInputs, config).draws;
const draws = current.sampleCorrelatedInputs(base, config);
assert.deepEqual(current.runCorrelatedSimulation(base, config).draws, originalDraws);
assert.equal(draws.length, config.draws);
const scopes = ["ais", "all", "people"];
const rates = [0, 5, 10, 20, 35, 100];
const growths = [0, 25, 50];
let verifiedPaths = 0;
for (const [i, { inputs }] of draws.entries()) {
  for (const scope of scopes) {
    const start = current.startHorizon(inputs, scope);
    if (scope === "ais") assert.equal(start.initialGrantsB, originalDraws[i].totalB);
    for (const annualPayoutPct of rates) for (const annualCapGrowthPct of growths) {
      for (const capLaterYears of [false, true]) {
        const path = current.extendDraw(inputs, { scope, annualPayoutPct, annualCapGrowthPct, capLaterYears });
        let prior = start.poolB;
        let sum = 0;
        for (const year of path) {
          assert(year.annualB >= 0 && year.remainingB >= 0 && year.remainingB <= prior + 1e-10);
          sum += year.annualB;
          assert(Math.abs(sum - year.cumulativeB) < 1e-10);
          assert(Math.abs(sum + year.remainingB - start.poolB) < 1e-10);
          prior = year.remainingB;
        }
        if (!annualPayoutPct) assert.equal(path.at(-1).cumulativeB, start.initialGrantsB);
        if (annualPayoutPct === 100 && (!capLaterYears || scope !== "ais")) assert.equal(path[1].remainingB, 0);
        verifiedPaths++;
      }
    }
  }
}
const projections = {};
for (const scope of scopes) {
  projections[scope] = {};
  for (const annualPayoutPct of [5, 10, 20]) {
    const projection = current.projectHorizon({ ...current.horizonDefaults, scope, annualPayoutPct });
    projections[scope][annualPayoutPct] = {
      end2027: projection.rows[0].cumulative,
      end2031: projection.rows[4].cumulative,
      end2035: projection.rows.at(-1).cumulative,
      mid2031: projection.dates[0], fifthAnniversary: projection.dates[1]
    };
  }
}
console.log(JSON.stringify({
  draws: draws.length, verifiedPaths, projections,
  radiantPlugin: current.radiantPlugin
}, null, 2));
