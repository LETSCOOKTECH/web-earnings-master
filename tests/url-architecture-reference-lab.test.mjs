import test from 'node:test';import assert from 'node:assert/strict';
import {inspectLinkGraph,EXAMPLE,pathnameSegments} from '../scripts/url-architecture-reference-lab.mjs';
test('URL depth and navigation distance can reverse their numerical order',()=>{
 const results=inspectLinkGraph(EXAMPLE);
 assert.equal(results[0].url_path_segments,3);
 assert.equal(results[0].navigation_click_distance,1);
 assert.equal(results[1].url_path_segments,1);
 assert.equal(results[1].navigation_click_distance,3);
});
test('A root-depth URL can be orphaned despite its short slug',()=>{
 const x=inspectLinkGraph(EXAMPLE).find(x=>x.url==='/unlinked-orphan');
 assert.equal(x.url_path_segments,1);assert.equal(x.navigation_click_distance,null);assert.equal(x.reachable_from_home,false);
});
test('HTML graph distance is not determined from path segment count',()=>{
 assert.equal(pathnameSegments('/tools/audio/mp4-to-mp3'),3);
 assert.equal(pathnameSegments('/mp4-to-mp3'),1);
 assert.equal(pathnameSegments('/'),0);
});
test('Same-origin links are counted; external-origin destinations are not falsely internal',()=>{
 const x=inspectLinkGraph({origin:'https://example.test',edges:[['/','https://outside.test/link'],['/','/a']],targets:['/a','https://outside.test/link']});
 assert.equal(x[0].navigation_click_distance,1);
 assert.equal(x[1].navigation_click_distance,null);
});
test('Cyclic internal links do not cause infinite graph exploration',()=>{
 const x=inspectLinkGraph({origin:'https://example.test',edges:[['/','/a'],['/a','/b'],['/b','/a']],targets:['/b']});
 assert.equal(x[0].navigation_click_distance,2);
});
test('Direct link and non-linear link graph diagnosed without implying actual search rankings',()=>{
 const results=inspectLinkGraph(EXAMPLE);
 assert.equal(results[2].linked_from_internal_pages,2);
 assert.ok(results[2].reachable_from_home);
 const body=JSON.stringify(results);
 assert.ok(!body.includes('googleRank')&&!body.includes('ranking_boost'));
});
