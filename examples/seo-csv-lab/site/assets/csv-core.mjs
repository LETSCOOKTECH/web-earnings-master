/** Reference tool core: comma-delimited UTF-8, escaped quotes and quoted newlines.
 * Strict column count, bounded size and errors. This sample is NOT Excel/XLSX.
 * CSV formula escaping is explicit; it may modify text, so show users a choice.
 */
export const LIMITS=Object.freeze({maxBytes:2_000_000,maxRows:5000,maxColumns:200});
export function parseCsv(input,options={}){
 const {maxBytes,maxRows,maxColumns}={...LIMITS,...options};
 if(typeof input!=='string')throw Error('Input must be CSV text');
 if(new TextEncoder().encode(input).length>maxBytes)throw Error('CSV exceeds 2 MB');
 const text=input.replace(/^\uFEFF/,'');
 if(text.length===0)throw Error('CSV is empty');
 const rows=[];let row=[],field='',quoted=false,atStart=true,closed=false;
 function pushField(){row.push(field);field='';atStart=true;closed=false;if(row.length>maxColumns)throw Error('Too many columns');}
 function pushRow(){pushField();rows.push(row);if(rows.length>maxRows)throw Error('Too many rows');row=[];}
 for(let i=0;i<text.length;i++){
  const c=text[i];
  if(quoted){if(c==='"'){if(text[i+1]==='"'){field+='"';i++;}else{quoted=false;closed=true;}}else field+=c;continue;}
  if(c==='"'){if(!atStart)throw Error('Unexpected quote');quoted=true;atStart=false;continue;}
  if(closed&&c!==','&&c!=='\n'&&c!=='\r')throw Error('Trailing data after closed quote');
  if(c===','){pushField();continue}
  if(c==='\r'||c==='\n'){if(c==='\r'&&text[i+1]==='\n')i++;pushRow();continue;}
  field+=c;atStart=false;
 }
 if(quoted)throw Error('Unclosed quoted field');
 // Trailing line break ends final record; extra blank lines remain real empty rows.
 if(row.length||field.length||closed||text.endsWith(','))pushRow();
 if(!rows.length)throw Error('No data records');
 const width=rows[0].length;
 for(let i=1;i<rows.length;i++)if(rows[i].length!==width)throw Error('Row '+(i+1)+' has a different number of columns');
 return rows;
}
export function dedupeCsv(input,{hasHeader=true,caseSensitive=true,...bounds}={}){
 const rows=parseCsv(input,bounds),seen=new Set(),output=[],data=hasHeader?rows.slice(1):rows;
 if(hasHeader)output.push(rows[0]);
 for(const row of data){const key=JSON.stringify(row.map(x=>caseSensitive?x:x.toLocaleLowerCase('en-US')));if(seen.has(key))continue;seen.add(key);output.push(row)}
 return {rows:output,removed:data.length-seen.size,kept:seen.size,original:data.length};
}
const numeric=/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?$/;
function spreadsheetSafe(s){
 const t=String(s);
 // CSV is data; spreadsheet apps may interpret content as formulas.
 // Keep real signed/scientific numbers unchanged while escaping expressions.
 if(/^[\s]*[=+@-]/.test(t)&&!numeric.test(t.trim()))return "'"+t;
 return t;
}
export function serializeCsv(rows,{guardSpreadsheetFormulas=true}={}){
 if(!Array.isArray(rows))throw Error('Rows array required');
 return rows.map(row=>row.map(cell=>{
  const text=guardSpreadsheetFormulas?spreadsheetSafe(cell):String(cell);
  return /[",\r\n]/.test(text)?'"'+text.replace(/"/g,'""')+'"':text;
 }).join(',')).join('\r\n')+'\r\n';
}
export function cleanCsv(input,options={}){
 const {guardSpreadsheetFormulas=true,...rest}=options;
 const result=dedupeCsv(input,rest);
 return {...result,csv:serializeCsv(result.rows,{guardSpreadsheetFormulas})};
}
