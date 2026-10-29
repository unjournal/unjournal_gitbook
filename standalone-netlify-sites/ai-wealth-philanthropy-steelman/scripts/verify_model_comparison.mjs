import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const html=readFileSync(new URL('../public/model-comparison/index.html',import.meta.url),'utf8');
const scripts=[...html.matchAll(/<script>([\s\S]*?)<\/script>/g)];
const code=scripts.at(-1)[1];
const ctx=vm.createContext({});
vm.runInContext(code,ctx);
const get=expr=>vm.runInContext(expr,ctx);
const close=(a,b,msg)=>assert.ok(Math.abs(a-b)<1e-9,msg+`: ${a} != ${b}`);
// Independently read source-sheet endpoints and component arithmetic.
close(get("bridge(0,'ghd').total"),.5026344,'Our GH&D common subset');
close(get("bridge(63,'ghd').founder"),.6968,'Lewars C32 founder pathway');
close(get("bridge(63,'ghd').employee"),3,'Lewars C32 employee pathway');
for(const [cause,ours,theirs] of [['all',2.950896,10.150666666666667],['ais',.9501792,4.030133333333333],['ghd',.5026344,3.6968]]){
 close(get(`bridge(0,'${cause}').total`),ours,'Original central endpoint: '+cause);
 close(get(`bridge(63,'${cause}').total`),theirs,'Source / extended endpoint: '+cause);
 for(const mode of ['shapley','forward','reverse'])close(get(`attribution('${mode}','${cause}').reduce((s,x)=>s+x,0)`),theirs-ours,'Attribution adds to '+cause+' gap');
 if(cause!=='ghd')close(get(`attribution('shapley','${cause}')[4]`),0,'Identical cause shares do not explain a gap');
}
const radiant=get("ALLOCATION_ROWS.find(r=>r.source==='radiant')");
for(const [share,central,low,high] of [[0,0,0,0],[10,3.07,.198,15],[30,9.21,.594,45],[100,30.7,1.98,150]]){
 const r=get(`allocate(ALLOCATION_ROWS.find(r=>r.source==='radiant'),${share})`);
 close(r.value,central,'Conditional central');close(r.low,low,'Conditional lower percentile');close(r.high,high,'Conditional upper percentile');
}
assert.equal(radiant.range,'P1–P99 (98%)','Do not change source interval coverage');
assert.equal(get("allocate(ALLOCATION_ROWS.find(r=>r.source==='atlas'),10).low"),null,'Do not invent a missing source interval');
// Financial accounting and clock boundaries, across causes, dates and presets.
for(const cause of ['ghd','ais','safety','all'])for(const preset of ['middle','cautious','faster'])for(const year of [2027,2028,2030,2031])for(const include of [true,false]){
 const r=get(`sandbox({...PRESETS.${preset},...CAUSES.${cause}},${year},${include})`);
 close(r.broad+r.remaining,r.initial,'Conservation of usable wealth');
 assert.ok(r.cumulative>=0&&r.cumulative<=r.broad+1e-9,'Cause subset within total');
 assert.ok(r.rows.every(x=>x.selected>=0&&x.selected<=x.all+1e-9),'Annual cause subset');
}
close(get('sandbox({...PRESETS.cautious,...CAUSES.all},2027).broad'),0,'Later lockups prevent 2027 grants');
close(get('sandbox({...PRESETS.middle,...CAUSES.all,payout:0},2031).broad'),0,'No payout means no grants');
close(get('sandbox({...PRESETS.middle,...CAUSES.all,available:0},2031).broad'),0,'No available wealth means no grants');
close(get('sandbox({...PRESETS.middle,...CAUSES.all,employee:0,follow:0},2027,false).rows[0].anth'),0,'Zero Anthropic pool');
// Source rows: cumulative numbers must match the inspected annual ramp formula.
const sheet=(V,F,E,r,a,b,start,y)=> (V*.13*.8*F*Math.min(1,Math.max(0,y-start+1)/4)*a+(E*V/900)*Math.min(1,Math.max(0,y-start+1)/2)*b)*r;
const central=[2026,2027,2028,2029,2030].reduce((s,y)=>s+sheet(2000,.67,60,.1,.2,.45,2027,y),0);
close(get("DATA['2030'].find(r=>r.label==='Lewars: cumulative GH&D').value"),central,'Lewars central cumulative GH&D 2030');
const allCentral=[2026,2027,2028,2029,2030].reduce((s,y)=>s+sheet(2000,.67,60,.1,1,1,2027,y),0);
close(get("DATA['2030'].find(r=>r.label==='Lewars: cumulative all causes').value"),allCentral,'Lewars all-cause cumulative 2030');
const bear=[2026,2027,2028,2029,2030].reduce((s,y)=>s+sheet(1000,.4,40,.07,.05,.35,2028,y),0);
const bull=[2026,2027,2028,2029,2030].reduce((s,y)=>s+sheet(3000,.9,80,.15,.4,.55,2027,y),0);
console.log(JSON.stringify({checks:'passed',ratios:{overall:10.150666666666667/2.950896,ais:4.030133333333333/.9501792,ghd:3.6968/.5026344},sheet2030:{central,bear,bull,allCentral},atlas2030NoGrowth:get('atlasNoGrowth()')},null,2));
