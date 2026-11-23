// Reference diagnostic: URL path segment count and HTML navigation link distance are
// DISTINCT independent dimensions. Not an implementation of Google ranking/Googlebot.
import {pathToFileURL} from 'node:url';
export function pathnameSegments(value, origin='https://example.test'){
 const url=new URL(value,origin);
 return url.pathname.split('/').filter(Boolean).length;
}
export function inspectLinkGraph({origin,home='/',edges,targets=[]}){
 const base=new URL(origin), key=v=>{
   const url=new URL(v,base);
   if(url.origin!==base.origin) return null;
   return url.pathname+(url.search||'');
 };
 const graph=new Map();
 for(const [from,to] of edges){
   const f=key(from),t=key(to);
   if(f===null||t===null)continue; // cross-domain links are external; separate authority question
   if(!graph.has(f))graph.set(f,new Set());
   graph.get(f).add(t);
 }
 const start=key(home),dist=new Map([[start,0]]),queue=[start];
 for(let i=0;i<queue.length;i++){
   const u=queue[i];
   for(const v of graph.get(u)||[]){
     if(!dist.has(v)){dist.set(v,dist.get(u)+1);queue.push(v);}
   }
 }
 return targets.map(target=>{
   const t=key(target);
   return {url:t||String(target),url_path_segments:t===null?null:pathnameSegments(t,origin),navigation_click_distance:t===null?null:(dist.get(t)??null),linked_from_internal_pages:t===null?0:[...graph.values()].filter(s=>s.has(t)).length,reachable_from_home:t!==null&&dist.has(t)};
 });
}
export const EXAMPLE={
 origin:'https://example.test',
 home:'/',
 edges:[
   ['/','/tools/audio/mp4-to-mp3'], // 3 path segments, ONE link away
   ['/','/browse'],
   ['/browse','/formats'],
   ['/formats','/mp4-to-mp3'],       // 1 path segment, THREE links away
   ['/','/video-compressor'],
   ['/tools/audio/mp4-to-mp3','/video-compressor']
 ],
 targets:['/tools/audio/mp4-to-mp3','/mp4-to-mp3','/video-compressor','/unlinked-orphan']
};
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){
 console.log(JSON.stringify({classification:'EDUCATIONAL_GRAPH_ONLY_NO_SEARCH_RANKING',results:inspectLinkGraph(EXAMPLE)},null,2));
}
