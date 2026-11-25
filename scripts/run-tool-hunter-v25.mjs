#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {huntWebTools} from './hunt-web-tools-v25.mjs';
export {huntWebTools};
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 try{
  const i=process.argv.indexOf('--file'),out=process.argv.indexOf('--out');
  if(i<0||!process.argv[i+1])throw Error('Usage: --file candidate-plans.json [--out report.json]');
  const filename=path.resolve(process.argv[i+1]);
  if(fs.statSync(filename).size>2_000_000)throw Error('INPUT_EXCEEDS_2MB');
  const report=huntWebTools(JSON.parse(fs.readFileSync(filename,'utf8')));
  const text=JSON.stringify(report,null,2)+'\n';
  if(out>=0&&process.argv[out+1])fs.writeFileSync(path.resolve(process.argv[out+1]),text,{flag:'wx',mode:0o600});
  else process.stdout.write(text);
 }catch(e){console.error('HUNTER_HOLD: '+e.message);process.exitCode=2;}
}
