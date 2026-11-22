import fs from 'node:fs';
import path from 'node:path';
const root = path.resolve(import.meta.dirname, '..');
const skills = path.join(root,'.agents','skills');
const errors=[];
const seen=new Set();
for(const d of fs.readdirSync(skills,{withFileTypes:true}).filter(x=>x.isDirectory())) {
 const f=path.join(skills,d.name,'SKILL.md');
 if(!fs.existsSync(f)){errors.push(`${d.name}: missing SKILL.md`);continue;}
 const s=fs.readFileSync(f,'utf8');
 const match=s.match(/^---\s*\r?\n([\s\S]*?)\r?\n---\s*\r?\n/);
 if(!match){errors.push(`${d.name}: malformed YAML frontmatter`);continue;}
 const yaml=match[1];
 const name=yaml.match(/^name:\s*(.+)$/m)?.[1]?.trim();
 const desc=yaml.match(/^description:\s*(.+)$/m)?.[1]?.trim();
 if(name!==d.name)errors.push(`${d.name}: name mismatch ${name??''}`);
 if(!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(name??''))errors.push(`${d.name}: invalid skill name`);
 if(!desc||desc.length<25||desc.length>1024)errors.push(`${d.name}: description missing/too short/too long`);
 if(s.slice(match[0].length).trim().length<350)errors.push(`${d.name}: unusably short instructions`);
 if(seen.has(name))errors.push(`${d.name}: duplicate name`);
 seen.add(name);
}
if(seen.size<8)errors.push(`only ${seen.size} skills`);
if(errors.length){console.error(errors.join('\n'));process.exitCode=1;}
else console.log(`PASS: ${seen.size} unique skill manifests and frontmatter checked.`);

