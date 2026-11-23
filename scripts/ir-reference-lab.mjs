#!/usr/bin/env node
// Reproducible toy IR implementation; deliberately NOT a Google/Bing ranker.
import path from 'node:path';
import {fileURLToPath} from 'node:url';
export const tokenize=s=>String(s).toLocaleLowerCase('en').match(/[\p{L}\p{N}]+/gu)||[];
export const invertedIndex=docs=>{
 const map=new Map();
 docs.forEach((text,id)=>{
  const terms=tokenize(text);
  terms.forEach((term,pos)=>{if(!map.has(term))map.set(term,new Map());const posts=map.get(term);if(!posts.has(id))posts.set(id,[]);posts.get(id).push(pos);});
 });
 return map;
};
export const bm25=(documents,query,{k1=1.2,b=.75}={})=>{
 if(!documents.length)return [];
 const tokens=documents.map(tokenize),n=tokens.length;
 const lengths=tokens.map(x=>x.length),avgdl=lengths.reduce((a,b)=>a+b,0)/n||1;
 const terms=[...new Set(tokenize(query))];
 return documents.map((text,id)=>{
  let score=0;
  for(const term of terms){
   const df=tokens.filter(x=>x.includes(term)).length;
   if(!df)continue;
   const freq=tokens[id].filter(x=>x===term).length;
   if(!freq)continue;
   const idf=Math.log(1+(n-df+.5)/(df+.5));
   score+=idf*((freq*(k1+1))/(freq+k1*(1-b+b*lengths[id]/avgdl)));
  }
  return {id,text,score:Number(score.toFixed(8))};
 }).sort((a,b)=>b.score-a.score||a.id-b.id);
};
export const rrf=(rankLists,k=60)=>{
 if(!Number.isFinite(k)||k<=0)throw Error('k must be positive');
 const scores=new Map();
 for(const list of rankLists)list.forEach((id,index)=>scores.set(id,(scores.get(id)||0)+1/(k+index+1)));
 return [...scores].map(([id,score])=>({id,score})).sort((a,b)=>b.score-a.score||String(a.id).localeCompare(String(b.id)));
};
export const pageRank=(links,{damping=.85,iterations=80}={})=>{
 const names=[...new Set([...Object.keys(links),...Object.values(links).flat()])].sort();
 const n=names.length;if(!n)return {};
 if(damping<=0||damping>=1||!Number.isInteger(iterations)||iterations<1)throw Error('invalid configuration');
 let score=Object.fromEntries(names.map(x=>[x,1/n]));
 for(let i=0;i<iterations;i++){
  const next=Object.fromEntries(names.map(x=>[x,(1-damping)/n]));
  for(const name of names){
   const dst=[...new Set(links[name]||[])].filter(x=>names.includes(x));
   if(!dst.length){for(const x of names)next[x]+=damping*score[name]/n;}
   else for(const x of dst)next[x]+=damping*score[name]/dst.length;
  }
  score=next;
 }
 return score;
};
if(process.argv[1]&&fileURLToPath(import.meta.url)===path.resolve(process.argv[1])){
 const docs=['resize photo quickly','compress image locally','image size calculator','batch convert PNG to JPG','reduce picture file size'];
 console.log(JSON.stringify({label:'EDUCATIONAL_REFERENCE_IMPLEMENTATION_NOT_GOOGLE_OR_BING',postings:[...invertedIndex(docs)].map(([term,p])=>({term,documents:[...p.keys()]})),bm25:bm25(docs,'image compress'),rrf:rrf([[1,2,3],[2,1,4]]),pageRank:pageRank({A:['B'],B:['A','C'],C:['B']})},null,2));
}
