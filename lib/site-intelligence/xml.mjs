import {gunzipSync} from 'node:zlib';

export function decodeXmlEntities(value){
  return String(value).replace(/&(#x[0-9a-f]+|#[0-9]+|amp|lt|gt|quot|apos);/gi,(match,entity)=>{
    const e=entity.toLowerCase();
    const named={amp:'&',lt:'<',gt:'>',quot:'"',apos:"'"};
    if(Object.hasOwn(named,e))return named[e];
    const n=e.startsWith('#x')?Number.parseInt(e.slice(2),16):Number.parseInt(e.slice(1),10);
    return n>0&&n<=0x10ffff&&!(n>=0xd800&&n<=0xdfff)?String.fromCodePoint(n):'';
  });
}
export function decodeSitemapBody(body,{maxInflatedBytes=8_000_000}={}){
  let buf=Buffer.isBuffer(body)?body:Buffer.from(body);
  if(buf.length>=2&&buf[0]===0x1f&&buf[1]===0x8b){
    try{buf=gunzipSync(buf,{maxOutputLength:maxInflatedBytes});}
    catch{throw new Error('GZIP_INVALID_OR_INFLATION_LIMIT');}
  }
  if(buf.length>maxInflatedBytes)throw new Error('SITEMAP_INFLATION_LIMIT');
  const decoder=new TextDecoder('utf-8',{fatal:true});
  try{return decoder.decode(buf);}catch{throw new Error('INVALID_XML_UTF8');}
}
export function parseSitemapXML(input,{maxEntries=50_000}={}){
  let xml=String(input).replace(/^\uFEFF/,'');
  if(/<!\s*(?:DOCTYPE|ENTITY)\b/i.test(xml))throw new Error('XML_EXTERNAL_ENTITY_FORBIDDEN');
  xml=xml.replace(/<!--[\s\S]*?-->/g,'').replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g,(_m,t)=>t);
  // Support sitemap namespaces without pretending to validate arbitrary XML schemas.
  xml=xml.replace(/<(\/?)(?:[a-z_][\w.-]*:)(urlset|sitemapindex|url|sitemap|loc|lastmod)\b/gi,'<$1$2');
  const isIndex=/<sitemapindex\b[^>]*>/i.test(xml)&&/<\/sitemapindex\s*>/i.test(xml);
  const isURLs=/<urlset\b[^>]*>/i.test(xml)&&/<\/urlset\s*>/i.test(xml);
  if(isIndex===isURLs)throw new Error('UNRECOGNIZED_SITEMAP_ROOT');
  const name=isIndex?'sitemap':'url';
  const re=new RegExp('<'+name+'\\b[^>]*>([\\s\\S]*?)<\\/'+name+'\\s*>','gi');
  const result=[];let m;
  while((m=re.exec(xml))){
    if(result.length>=maxEntries)throw new Error('SITEMAP_ENTRY_LIMIT');
    const loc=/<loc\b[^>]*>([\s\S]*?)<\/loc\s*>/i.exec(m[1]);
    if(!loc)continue;
    const value=decodeXmlEntities(loc[1].trim());
    if(!/^https?:\/\//i.test(value))continue;
    const last=/<lastmod\b[^>]*>([\s\S]*?)<\/lastmod\s*>/i.exec(m[1]);
    result.push({url:value,lastmod:last?decodeXmlEntities(last[1].trim()).slice(0,64):null});
  }
  return {kind:isIndex?'index':'urlset',entries:result,limitations:'Sitemap XML subset: XML schema/DTD validation and uncommon extensions not implemented'};
}
export function sitemapLocationsFromRobots(text){
  return [...String(text).matchAll(/^\s*Sitemap:\s*(https?:\/\/[^\s#]+)\s*$/gim)].map(m=>m[1]);
}
