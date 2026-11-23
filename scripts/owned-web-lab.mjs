import http from 'node:http';
const html=(origin,route,title,body,{robots='',extraHead='',script=''}={})=>'<!doctype html><html lang="en"><head><meta charset="utf-8"><title>'+title+'</title><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="canonical" href="'+origin+route+'">'+robots+extraHead+'</head><body>'+body+script+'</body></html>';
const toolBody='<main><h1>Local string length tool</h1><p>A local laboratory fixture; it never uploads private files.</p><label for="input-text">Test phrase</label><input id="input-text" type="text" value="Hello"><button type="button" id="run-tool">Calculate</button><p id="output" role="status" aria-live="polite">Ready</p><a href="/document">Documentation</a></main>';
const toolJS='<script>document.getElementById("run-tool").addEventListener("click",()=>{const text=document.getElementById("input-text").value;document.getElementById("output").textContent="Characters: "+text.length;});</script>';
export async function startOwnedWebLab(){
 const server=http.createServer((req,res)=>{
  const origin='http://127.0.0.1:'+server.address().port;
  const url=new URL(req.url,origin),p=url.pathname;
  const send=(status,body,type='text/html; charset=utf-8',headers={})=>{res.writeHead(status,{'Content-Type':type,'Cache-Control':'no-store','X-Content-Type-Options':'nosniff',...headers});res.end(body);};
  if(p==='/robots.txt')return send(200,'User-agent: *\nDisallow: /private/\nAllow: /\nUser-agent: GPTBot\nDisallow: /\nUser-agent: OAI-SearchBot\nAllow: /\nSitemap: '+origin+'/sitemap.xml\n','text/plain; charset=utf-8');
  if(p==='/sitemap.xml')return send(200,'<?xml version="1.0"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>'+origin+'/document</loc></url></urlset>','application/xml; charset=utf-8');
  if(p==='/')return send(200,html(origin,'/','Local diagnostic fixture',toolBody,{script:toolJS}));
  if(p==='/document')return send(200,html(origin,'/document','Discoverable document',toolBody,{script:toolJS}));
  if(p==='/redirect'){res.writeHead(308,{Location:'/document'});return res.end();}
  if(p==='/missing')return send(404,html(origin,'/missing','Not found','<h1>Not found</h1>'));
  if(p==='/soft404')return send(200,html(origin,'/soft404','Not found','<h1>Not found</h1><p>No task exists.</p>'));
  if(p==='/meta-noindex')return send(200,html(origin,'/meta-noindex','Noindex test','<h1>Excluded page</h1>',{robots:'<meta name="robots" content="noindex,follow">'}));
  if(p==='/header-noindex')return send(200,html(origin,'/header-noindex','Noindex response header','<h1>Excluded page</h1>'),undefined,{'X-Robots-Tag':'noindex'});
  if(p==='/canonical-conflict')return send(200,html(origin,'/document','Mismatched canonical','<h1>Different URL</h1>'));
  if(p==='/challenge')return send(200,'<html><title>Just a moment</title><body>Checking your browser before accessing</body></html>');
  if(p==='/hydration-only')return send(200,html(origin,p,'Hydration only','<div id="app"></div>',{script:'<script>document.getElementById("app").innerHTML="<main><h1>Rendered with JavaScript</h1></main>"</script>'}));
  if(p==='/csp-block')return send(200,html(origin,p,'CSP blocked','<h1>Blocked script fixture</h1><p id="result">Original</p>',{script:'<script>document.getElementById("result").textContent="JS ran"</script>'}),undefined,{'Content-Security-Policy':"default-src 'self'; script-src 'none'"});
  if(p==='/js-crash')return send(200,html(origin,p,'Script crash','<h1>Uncaught exception</h1>',{script:'<script>throw new Error("Intentional fixture JS failure")</script>'}));
  if(p==='/etag'){
    if(req.headers['if-none-match']==='"fixture-v1"'){res.writeHead(304,{'ETag':'"fixture-v1"'});return res.end();}
    return send(200,'Cache validator fixture','text/plain',{'ETag':'"fixture-v1"','Cache-Control':'public, max-age=60'});
  }
  if(p.startsWith('/private/'))return send(401,html(origin,p,'Unauthorized','<h1>Authentication required</h1>'),undefined,{'X-Robots-Tag':'noindex'});
  if(p==='/unavailable')return send(503,'Temporarily unavailable','text/plain',{'Retry-After':'60'});
  return send(404,'Not found','text/plain');
 });
 await new Promise((resolve,reject)=>{server.once('error',reject);server.listen(0,'127.0.0.1',resolve);});
 return {server,origin:'http://127.0.0.1:'+server.address().port,close:()=>new Promise((resolve,reject)=>server.close(err=>err?reject(err):resolve()))};
}
