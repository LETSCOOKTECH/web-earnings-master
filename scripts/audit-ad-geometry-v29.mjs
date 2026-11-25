/**
 * Independent ad/control geometry evaluation using actual Playwright boundingBox
 * data and PerformanceObserver CLS receipts supplied by an owner-authorized run.
 * Internal targets: >=32 CSS px clearance, CLS <=0.01. NOT Google AdSense rules.
 */
export const INTERNAL_AD_TARGETS=Object.freeze({minGapPx:32,maxCls:0.01});
function goodRect(r){return r&&['x','y','width','height'].every(k=>Number.isFinite(r[k]))&&r.width>=0&&r.height>=0;}
export function distanceBetweenRects(a,b){
 if(!goodRect(a)||!goodRect(b))throw Error('Invalid bounding rectangle');
 const dx=Math.max(0,a.x-(b.x+b.width),b.x-(a.x+a.width));
 const dy=Math.max(0,a.y-(b.y+b.height),b.y-(a.y+a.height));
 return Math.hypot(dx,dy);
}
export function auditAdGeometry(packet,{target=INTERNAL_AD_TARGETS}={}){
 const errors=[],warnings=[];
 if(packet?.schema!=='sense-geometry-receipt-v29')errors.push('INVALID_GEOMETRY_RECEIPT');
 if(!Number.isFinite(packet?.cls)||packet.cls<0)errors.push('CLS_MISSING_OR_INVALID');
 if(!Array.isArray(packet?.adSlots)||!Array.isArray(packet?.controls))errors.push('GEOMETRY_ARRAYS_MISSING');
 if(packet?.source!=='OWNED_PLAYWRIGHT_MEASUREMENT')warnings.push('NOT_OWNER_BROWSER_AUTHENTICATED');
 if(errors.length)return {status:'FAIL_INVALID',errors,warnings,ad_controls_checked:0};
 if(packet.adSlots.length===0)return {status:'HOLD_NO_AD_INVENTORY',errors:[],warnings:['No ad slots measured; live ad placement has not been certified',...warnings],ad_controls_checked:0};
 if(packet.controls.length===0)return {status:'HOLD_NO_ACTION_CONTROLS',errors:[],warnings:['No download/input/button controls measured',...warnings],ad_controls_checked:0};
 let checked=0,minimum=Infinity;
 if(packet.cls>target.maxCls)errors.push('CLS_ABOVE_INTERNAL_TARGET:'+packet.cls);
 for(const [i,ad] of packet.adSlots.entries()){
  if(!goodRect(ad))errors.push('INVALID_AD_SLOT:'+i);
  for(const [j,control] of packet.controls.entries()){
   if(!goodRect(ad)||!goodRect(control)){errors.push('INVALID_CONTROL:'+j);continue;}
   const gap=distanceBetweenRects(ad,control);checked++;minimum=Math.min(gap,minimum);
   if(gap<target.minGapPx)errors.push('AD_ACTION_GAP_BELOW_INTERNAL_TARGET:'+i+':'+j+':'+gap.toFixed(1));
  }
 }
 return {status:errors.length?'FAIL_INTERNAL_TARGETS':packet.source==='OWNED_PLAYWRIGHT_MEASUREMENT'?'PASS_MEASURED_LAYOUT_ONLY':'FIXTURE_ONLY_NOT_LIVE',errors,warnings,ad_controls_checked:checked,min_gap_px:minimum,cls:packet.cls,
  google_policy_certified:false,invalid_traffic_absent_verified:false,real_ad_fill_verified:false};
}
