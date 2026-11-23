// Local diagnostic parser/evaluator for a useful, tested subset of RFC 9309.
// NOT a substitute for every vendor-specific robots implementation.
// Assumptions documented in docs/foundations/20-owned-web-lab-and-robots.md.
export function parseRobots(text) {
  const groups=[];let current=null;let inRules=false;
  for(const raw of String(text).replace(/^\uFEFF/,'').split(/\r?\n/)){
    const line=raw.replace(/#.*/,'').trim();if(!line)continue;
    const match=/^([^:]+):\s*(.*)$/.exec(line);if(!match)continue;
    const field=match[1].trim().toLowerCase(),value=match[2].trim();
    if(field==='user-agent'){
      if(!value)continue;
      if(!current || inRules){current={agents:[],rules:[]};groups.push(current);inRules=false;}
      current.agents.push(value.toLowerCase());continue;
    }
    if(field==='allow'||field==='disallow'){
      if(!current)continue;inRules=true;
      if(field==='disallow'&&value==='')continue;
      if(value!=='')current.rules.push({type:field,path:value});continue;
    }
    // sitemap, crawl-delay, comments, unknown fields do not split an agent group.
  }
  return groups;
}
function regexFor(pattern) {
  const end=pattern.endsWith('$');
  const body=end?pattern.slice(0,-1):pattern;
  const r=body.split('*').map(x=>x.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).join('.*');
  return new RegExp('^'+r+(end?'$':''));
}
export function evaluateRobots(text,userAgent,url) {
  const groups=parseRobots(text),ua=String(userAgent).toLowerCase();
  const path=String(url).startsWith('/')?String(url):new URL(url).pathname+new URL(url).search;
  let longest=0,selected=[];
  for(const g of groups){
    let score=0;
    for(const agent of g.agents){
      if(agent==='*'){score=Math.max(score,1);continue;}
      if(ua.includes(agent))score=Math.max(score,agent.length+1);
    }
    if(score>longest){longest=score;selected=[g];}
    else if(score===longest&&score>0)selected.push(g);
  }
  const matches=selected.flatMap(g=>g.rules).filter(r=>regexFor(r.path).test(path));
  matches.sort((a,b)=>{
    const len=x=>x.path.replace(/[\*$]/g,'').length;
    return len(b)-len(a)||(a.type==='allow'?-1:1);
  });
  const decisive=matches[0]||null;
  return {allowed:decisive?decisive.type==='allow':true,match:decisive,selectedAgents:[...new Set(selected.flatMap(g=>g.agents))],matchedRuleCount:matches.length,path,limitations:'educational RFC9309 subset: URL octet percent-encoding and provider-specific extensions require authoritative checker'};
}
