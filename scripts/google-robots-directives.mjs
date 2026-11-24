/** Bounded parse for X-Robots-Tag directives applicable to Googlebot.
 * Header scope can differ from generic meta robots; do not apply otherbot directives.
 * This parser does not replace a deployed HTTP/header inspection or every vendor extension.
 */
export function extractGoogleRobotHeaderDirectives(value){
 const withParameters=new Set(['max-snippet','max-image-preview','max-video-preview','unavailable_after']);
 const out=[];
 for(let line of String(value||'').split(/\r?\n/)){
  line=line.trim().replace(/^x-robots-tag\s*:\s*/i,'');
  if(!line)continue;
  let scope='*';
  for(let piece of line.split(',')){
   piece=piece.trim();if(!piece)continue;
   const m=/^([a-z][a-z0-9_-]*)\s*:\s*(.*)$/i.exec(piece);
   if(m&&!withParameters.has(m[1].toLowerCase())){scope=m[1].toLowerCase();piece=m[2].trim();}
   if((scope==='*'||scope==='googlebot')&&piece)out.push(piece);
  }
 }
 return out;
}
