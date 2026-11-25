import {createHash} from 'node:crypto';
import {safeURL} from './safe-http.mjs';

export function decodeHtml(value){
  return String(value??'').replace(/&(#x[0-9a-f]+|#[0-9]+|amp|lt|gt|quot|apos|nbsp|copy|reg);/gi,(_m,t)=>{
    const key=t.toLowerCase();
    const named={amp:'&',lt:'<',gt:'>',quot:'"',apos:"'",nbsp:' ',copy:'©',reg:'®'};
    if(Object.hasOwn(named,key))return named[key];
    const n=key.startsWith('#x')?parseInt(key.slice(2),16):parseInt(key.slice(1),10);
    return Number.isInteger(n)&&n>0&&n<=0x10ffff?String.fromCodePoint(n):'';
  });
}
function attrs(tag){
  const result=Object.create(null);
  const raw=tag.replace(/^<\/?[a-z][\w:-]*/i,'').replace(/\/?\s*>$/,'');
  const re=/([a-z_:][-a-z0-9_:]*)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/gi;
  let m;
  while((m=re.exec(raw)))result[m[1].toLowerCase()]=decodeHtml(m[2]??m[3]??m[4]).slice(0,2048);
  return result;
}
const tags=(html,name)=>[...html.matchAll(new RegExp('<'+name+'\\b[^>]{0,4000}>','gi'))].map(x=>attrs(x[0]));
const cleaned=s=>decodeHtml(String(s??'').replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').trim()).slice(0,300);
function absoluteAsset(value,base){try{const u=new URL(value,base);if(!['https:','http:'].includes(u.protocol)||u.username||u.password)return null;u.hash='';u.search='';return u.href;}catch{return null;}}
export function inspectHTML({url,origin,body,headers={},includeQueries=false,fixture=false,maxLinks=120}){
  const html=typeof body==='string'?body:new TextDecoder('utf-8',{fatal:false}).decode(body);
  const head=(/<head\b[^>]*>([\s\S]*?)<\/head>/i.exec(html)||[])[1]??html.slice(0,10000);
  const title=cleaned((/<title\b[^>]*>([\s\S]*?)<\/title>/i.exec(head)||[])[1]??'');
  const h1=cleaned((/<h1\b[^>]*>([\s\S]*?)<\/h1>/i.exec(html)||[])[1]??'');
  const meta=tags(head,'meta');
  const links=tags(head,'link');
  const lookup=(name)=>meta.find(m=>m.name?.toLowerCase()===name)?.content??null;
  const canonical=links.find(x=>x.rel?.toLowerCase().split(/\s+/).includes('canonical'))?.href??null;
  const generator=lookup('generator');
  const description=lookup('description')?.slice(0,300)??null;
  const robots=(lookup('robots')??'')+' '+(headers['x-robots-tag']??'');
  const pageLinks=[];
  for(const a of tags(html,'a')){
    if(!a.href)continue;
    const dest=safeURL(a.href,url,{includeQueries,fixture});
    if(dest&&!pageLinks.includes(dest)){pageLinks.push(dest);if(pageLinks.length>=maxLinks)break;}
  }
  const scriptAssets=tags(html,'script').filter(x=>x.src).map(x=>absoluteAsset(x.src,url)).filter(Boolean).slice(0,35);
  const cssAssets=links.filter(x=>x.rel?.toLowerCase().split(/\s+/).includes('stylesheet')&&x.href).map(x=>absoluteAsset(x.href,url)).filter(Boolean).slice(0,35);
  const forms=[];
  for(const match of html.matchAll(/<form\b[^>]*>/gi)){
    if(forms.length>=12)break;
    const a=attrs(match[0]);
    const action=a.action?absoluteAsset(a.action,url):url;
    const relativeAction=action&&safeURL(action,origin,{includeQueries,fixture});
    forms.push({method:(a.method??'GET').toUpperCase().slice(0,10),action:relativeAction??null,has_external_action:Boolean(action&&!relativeAction)});
  }
  const indicators=[];
  const observation=(name,signal,confidence)=>{indicators.push({technology:name,signal,confidence,classification:'INFERENCE_NOT_INTERNAL_PROOF'});};
  const assets=[...scriptAssets,...cssAssets].map(x=>new URL(x).pathname);
  if(assets.some(x=>x.startsWith('/_astro/')))observation('Astro asset pipeline','/_astro/ asset path','MEDIUM');
  if(assets.some(x=>x.startsWith('/_next/'))||html.includes('__NEXT_DATA__'))observation('Next.js public bundle','Next.js path or __NEXT_DATA__','HIGH');
  if(assets.some(x=>x.startsWith('/_nuxt/'))||html.includes('__NUXT__'))observation('Nuxt public bundle','Nuxt path or __NUXT__','MEDIUM');
  if(assets.some(x=>x.includes('/wp-content/')))observation('WordPress public assets','wp-content path','MEDIUM');
  if(assets.some(x=>x.startsWith('/_app/immutable/')))observation('SvelteKit public bundle','SvelteKit immutable asset path','MEDIUM');
  if(generator)observation('Declared generator',generator.slice(0,100),'DECLARED_NOT_VERIFIED');
  for(const key of ['server','x-powered-by','x-vercel-id','cf-ray','x-nf-request-id']){
    if(headers[key])indicators.push({technology:'HTTP header '+key,signal:headers[key].slice(0,180),confidence:'OBSERVED_HEADER_NOT_PROVIDER_VERIFIED',classification:'DIRECT_HTTP_OBSERVATION'});
  }
  const kinds=[];
  if(forms.length||/<input\b|<textarea\b|<button\b/i.test(html))kinds.push('interactive-ui-candidate');
  if(/\/docs?\/|\/guides?\//i.test(new URL(url).pathname))kinds.push('documentation-path-candidate');
  if(/\/pricing\b/i.test(new URL(url).pathname))kinds.push('pricing-path-candidate');
  if(!kinds.length)kinds.push('unclassified-public-page');
  return {
    url,title,h1,description,canonical:canonical?absoluteAsset(canonical,url):null,
    noindex:/\bnoindex\b/i.test(robots),nofollow:/\bnofollow\b/i.test(robots),
    links:pageLinks,script_assets:scriptAssets,stylesheet_assets:cssAssets,forms,
    page_type_hypotheses:kinds,technology_indicators:indicators,
    html_sha256:createHash('sha256').update(body).digest('hex'),
    html_bytes:Buffer.byteLength(body),analysis_scope:'STATIC_HTML_AND_RESPONSE_HEADERS_ONLY',
    limitations:'Attribute parsing is heuristic; JS-inserted links, hidden APIs and private architecture are NOT observed',
  };
}
