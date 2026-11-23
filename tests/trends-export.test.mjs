import test from 'node:test';
import assert from 'node:assert/strict';
import {parseCsvRecords,validateTrendsExport} from '../scripts/verify-trends-csv.mjs';
const meta={source:'google_trends',scale:'relative_index',query:'compress photo',geo:'IN',time_window:'past_12_months',term_or_topic:'term',search_type:'web',observed_at:'2026-11-24T00:00:00Z',source_url:'https://trends.google.com/trends/explore',artifact:'sample.csv'};
const sample='Category: All categories\nWeek,compress photo: (India)\n2026-10-01,10\n2026-10-08,50\n2026-10-15,100\n';
test('CSV parser handles quoted commas',()=>{assert.deepEqual(parseCsvRecords('a,b\n"hello, there",2\n')[1],['hello, there','2']);});
test('CSV parser handles embedded escaped quote',()=>{assert.deepEqual(parseCsvRecords('a,b\n"he ""said""",2')[1],['he "said"','2']);});
test('CSV parser handles BOM + windows line breaks',()=>{assert.equal(parseCsvRecords('\uFEFFa,b\r\n1,2\r\n').length,2);});
test('CSV parser rejects unclosed quotes',()=>{assert.throws(()=>parseCsvRecords('a,"unterminated'),/Unterminated/);});
test('CSV parser bounds filesize',()=>{assert.throws(()=>parseCsvRecords('z'.repeat(2_000_001)),/oversized/);});
test('relative index export parsed without claiming real volume',()=>{
 const r=validateTrendsExport(sample,meta);assert.equal(r.valid,true);assert.equal(r.metrics.max,100);assert.equal(r.browser_verified,false);
});
test('CSV metadata demands relative index',()=>{const r=validateTrendsExport(sample,{...meta,scale:'absolute'});assert.equal(r.valid,false);});
test('CSV metadata needs same-context timeframe',()=>{const r=validateTrendsExport(sample,{...meta,time_window:''});assert.equal(r.valid,false);});
test('CSV metadata needs explicit term or topic',()=>{const r=validateTrendsExport(sample,{...meta,term_or_topic:'unknown'});assert.equal(r.valid,false);});
test('CSV rejects values greater than 100',()=>{const r=validateTrendsExport(sample.replace('50','120'),meta);assert.equal(r.valid,false);});
test('CSV supports <1 but does not count absolute searches',()=>{
 const r=validateTrendsExport(sample.replace(',10\n',',<1\n'),meta);assert.equal(r.valid,true);assert.equal(r.metrics.below_one,1);
});
test('CSV cannot claim a random non-Trends URL',()=>{const r=validateTrendsExport(sample,{...meta,source_url:'https://semrush.com/'});assert.equal(r.valid,false);});
test('CSV rejects empty chart',()=>{assert.equal(validateTrendsExport('hello,world',meta).valid,false);});
test('CSV rejects corrupt non-index field',()=>{const r=validateTrendsExport(sample.replace('50','not-an-index'),meta);assert.equal(r.valid,false);});
