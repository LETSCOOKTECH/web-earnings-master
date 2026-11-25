#!/usr/bin/env node
/** Open the real CSV fixture in a local browser. This NEVER deploys it. */
import {startSeoCsvLab} from './serve-seo-csv-lab.mjs';
const server=await startSeoCsvLab();
console.log([
 'LOCAL CSV LAB - RUNNING (NOT PUBLICLY DEPLOYED)',
 'Open this LOCAL address in the same machine browser:',
 '  '+server.origin+'/',
 'The canonical and sitemap still use documentation-only example.org URLs.',
 'Do not submit this laboratory to a search engine or publisher.',
 'Press Ctrl+C to stop.'
].join('\n'));
let closed=false;
async function close(){
 if(closed)return;closed=true;
 await server.close();
}
process.once('SIGINT',()=>{close().then(()=>process.exit(0));});
process.once('SIGTERM',()=>{close().then(()=>process.exit(0));});
