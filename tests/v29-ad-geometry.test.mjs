import test from 'node:test';
import assert from 'node:assert/strict';
import {distanceBetweenRects,auditAdGeometry} from '../scripts/audit-ad-geometry-v29.mjs';
const ad={x:0,y:0,width:320,height:100};
const sample=(control,cls=0.002,source='FIXTURE')=>({schema:'sense-geometry-receipt-v29',source,adSlots:[ad],controls:[control],cls});
test('ad/control receipt rejects 10px gap, and passes an honest 40px fixture without claiming policy certification',()=>{
 assert.equal(distanceBetweenRects(ad,{x:0,y:110,width:100,height:30}),10);
 const bad=auditAdGeometry(sample({x:0,y:110,width:100,height:30}));
 assert.equal(bad.status,'FAIL_INTERNAL_TARGETS');
 assert.ok(bad.errors.some(x=>x.includes('AD_ACTION_GAP')));
 const good=auditAdGeometry(sample({x:0,y:140,width:100,height:30}));
 assert.equal(good.status,'FIXTURE_ONLY_NOT_LIVE');
 assert.equal(good.min_gap_px,40);
 assert.equal(good.google_policy_certified,false);
});
test('CLS beyond internal 0.01 fails; missing real ad inventory stays HOLD',()=>{
 const shifted=auditAdGeometry(sample({x:0,y:150,width:100,height:30},0.019,'OWNED_PLAYWRIGHT_MEASUREMENT'));
 assert.equal(shifted.status,'FAIL_INTERNAL_TARGETS');
 assert.ok(shifted.errors.some(x=>x.includes('CLS')));
 const absent=auditAdGeometry({...sample({x:0,y:150,width:100,height:30}),adSlots:[]});
 assert.equal(absent.status,'HOLD_NO_AD_INVENTORY');
});
test('unmeasured or invalid rectangles cannot be marked pass',()=>{
 assert.throws(()=>distanceBetweenRects(ad,{x:0,y:30,width:-5,height:20}),/Invalid/);
 assert.equal(auditAdGeometry({...sample({x:2,y:2,width:10,height:10}),cls:NaN}).status,'FAIL_INVALID');
});
