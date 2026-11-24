import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../examples/seo-csv-lab/site');
const mappings=new Map([
 ['/','index.html'],['/index.html','index.html'],['/assets/csv-core.mjs','assets/csv-core.mjs'],
 ['/assets/tool.mjs','assets/tool.mjs'],['/assets/style.css','assets/style.css'],
 ['/robots.txt','robots.txt'],['/sitemap-index.xml','sitemap-index.xml'],
 ['/sitemap-0.xml','sitemap-0.xml']
]);
const mime=s=>s.endsWith('.html')?'text/html; charset=utf-8':s.endsWith('.mjs')?'text/javascript; charset=utf-8':s.endsWith('.css')?'text/css; charset=utf-8':s.endsWith('.xml')?'application/xml; charset=utf-8':'text/plain; charset=utf-8';
export async function startSeoCsvLab({broken=false}={}){
 const server=http.createServer((req,res)=>{
  const host='http://127.0.0.1:'+server.address().port;
  let route;try{route=new URL(req.url,host).pathname;}catch{res.writeHead(400);res.end('Bad URL');return;}
  const filename=mappings.get(route);
  const common={'Cache-Control':'no-store','X-Content-Type-Options':'nosniff','Referrer-Policy':'no-referrer',
   'Content-Security-Policy':"default-src 'self'; script-src 'self'; style-src 'self'; object-src 'none'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'"};
  if(!filename){res.writeHead(404,{'Content-Type':'text/plain',...common});res.end('Not found');return;}
  let bytes=fs.readFileSync(path.join(root,filename));
  if(broken&&route==='/assets/tool.mjs')bytes=Buffer.from('throw new Error("Intentional broken shipped UI fixture");\n');
  res.writeHead(200,{'Content-Type':mime(filename),...common});res.end(bytes);
 });
 await new Promise((resolve,reject)=>{server.once('error',reject);server.listen(0,'127.0.0.1',resolve)});
 return {origin:'http://127.0.0.1:'+server.address().port,close:()=>new Promise((resolve,reject)=>server.close(e=>e?reject(e):resolve()))};
}
