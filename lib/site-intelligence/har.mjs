import {validateOrigin} from './safe-http.mjs';

function safePath(path){
  const segments=path.split('/').map(segment=>{
    const raw=decodeURIComponentSafe(segment);
    if(raw.length>45||/^[a-f0-9]{20,}$/i.test(raw)||/^[0-9a-f]{8}-[0-9a-f]{4}-/i.test(raw)||/^[0-9]{5,}$/.test(raw)||/[@]/.test(raw))return ':redacted';
    if(/(?:token|secret|key|password|session|auth|code)=/i.test(raw))return ':redacted';
    return segment.slice(0,80);
  });
  return segments.join('/').slice(0,450);
}
function decodeURIComponentSafe(s){try{return decodeURIComponent(s);}catch{return s;}}
function resourceType(path,mime){
  if(/\.(?:js|mjs|css|png|jpe?g|gif|svg|webp|avif|woff2?|ttf|mp4|mp3)(?:$)/i.test(path))return 'static_asset';
  if(/(?:^|\/)(?:api|graphql|rpc|rest|v[1-9])(?:\/|$)/i.test(path)||/application\/json/i.test(mime))return 'api_candidate';
  if(/text\/html/i.test(mime))return 'html_candidate';
  return 'other_public_request';
}
export function summarizeHAR(har,{origin,fixture=false,maxEntries=3000}={}){
  const approved=validateOrigin(origin,{fixture});
  const entries=har?.log?.entries;
  if(!Array.isArray(entries))throw new Error('INVALID_HAR_LOG');
  if(entries.length>Math.min(3000,maxEntries))throw new Error('HAR_REQUEST_ENTRY_CAP');
  const routes=new Map(),stats={total:0,same_origin:0,external:0,unsupported_or_invalid:0};
  for(const item of entries){
    stats.total++;
    let u;
    try{u=new URL(item?.request?.url);}catch{stats.unsupported_or_invalid++;continue;}
    if(!['https:','http:'].includes(u.protocol)||u.username||u.password){stats.unsupported_or_invalid++;continue;}
    if(u.origin!==approved){stats.external++;continue;}
    stats.same_origin++;
    const method=String(item.request?.method??'GET').toUpperCase();
    if(!/^(GET|POST|HEAD|PUT|PATCH|DELETE|OPTIONS)$/.test(method))continue;
    // No query, body, cookies, headers, raw URL or response content is retained.
    const path=safePath(u.pathname);
    const mime=String(item.response?.content?.mimeType??'').slice(0,120);
    const type=resourceType(path,mime);
    const key=method+' '+path;
    if(!routes.has(key))routes.set(key,{
      method,path,classification:type,observations:0,observed_statuses:[],
      max_duration_ms:null,record_origin:'OPERATOR_SUPPLIED_HAR_UNVERIFIED',
    });
    const entry=routes.get(key);
    entry.observations++;
    const status=Number(item.response?.status);
    if(Number.isInteger(status)&&status>=100&&status<600&&!entry.observed_statuses.includes(status))entry.observed_statuses.push(status);
    const ms=Number(item.time);
    if(Number.isFinite(ms)&&ms>=0&&ms<=300_000)entry.max_duration_ms=Math.max(entry.max_duration_ms??0,Math.round(ms));
  }
  return {
    schema:'sense-site-har-summary-v24',origin:approved,source:'OPERATOR_SUPPLIED_HAR_NOT_INDEPENDENTLY_AUTHENTICATED',
    stats,observable_routes:[...routes.values()].slice(0,800),
    analysis_scope:'BROWSER_RECORDED_NETWORK_METADATA_ONLY_NO_REQUEST_OR_RESPONSE_BODIES',
    sensitive_fields_retained:false,
    limitations:'Input HAR may contain secrets even if summary discards them; keep original private. Paths are heuristically redacted and may still leak unusual identifiers. Network timing is not representative field performance, and endpoints do not prove backend framework or database.',
  };
}
