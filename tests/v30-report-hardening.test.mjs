import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {STUDIO_ROUTES,executeStudio} from '../examples/astro-dominant-studio-v29/public/assets/studio-core.mjs';
import {readLocalText} from '../examples/astro-dominant-studio-v29/public/assets/studio-reader.mjs';
import {verifyEditorialDistinctness,checkBuiltRoute} from '../scripts/audit-v29-production-gates.mjs';

const metadata=JSON.parse(fs.readFileSync('examples/astro-dominant-studio-v29/src/data/tools.json','utf8'));

test('all 28 real routes have unique task, output and limitation text rather than repeated doorway boilerplate',()=>{
 const result=verifyEditorialDistinctness(metadata);
 assert.equal(result.checked,28);
 assert.deepEqual(result.failures,[]);
 assert.equal(STUDIO_ROUTES.length,28);
 assert.equal(new Set(metadata.map(t=>t.useCase)).size,28);
});
test('route metadata mutation is rejected even if count and slugs still match',()=>{
 const modified=structuredClone(metadata);
 modified[1].useCase=modified[0].useCase;
 assert.ok(verifyEditorialDistinctness(modified).failures.some(x=>x.includes('DUPLICATE_ROUTE_EXPLANATION')));
 modified[1].useCase='generic filler';
 assert.ok(verifyEditorialDistinctness(modified).failures.some(x=>x.includes('ROUTE_EXPLANATION_THIN')));
});
test('a built conversion page without real task-specific guidance cannot pass the build audit',()=>{
 const html='<meta name="robots" content="noindex,follow"><h1>Converter</h1><main><table></table></main><script type="application/ld+json"></script>';
 const failures=checkBuiltRoute(html,'csv-to-json',{production:false});
 assert.ok(failures.some(x=>x.includes('ROUTE_GUIDANCE_MISSING')));
});
test('CSV formula-like column names are treated as risky export cells in all table paths',()=>{
 const csv=executeStudio('csv-to-excel-csv','=1+1,name\nplain,00501\n').output;
 assert.equal(csv,"\ufeff'=1+1,name\r\nplain,00501\r\n");
 const json=executeStudio('json-to-csv','[{"@HYPERLINK":"plain","name":"00501"}]').output;
 assert.ok(json.startsWith("'@HYPERLINK,name\r\n"));
});
test('mismatched local file extension fails before streaming or running the parser',async()=>{
 const fake={name:'customers.json',size:5,stream(){throw Error('File should never be read');}};
 await assert.rejects(readLocalText(fake,'csv'),/Expected a CSV file/);
});
