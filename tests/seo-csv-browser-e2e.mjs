import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {chromium,firefox,webkit} from 'playwright';
import {startSeoCsvLab} from '../scripts/serve-seo-csv-lab.mjs';
const site=await startSeoCsvLab(),broken=await startSeoCsvLab({broken:true}),brokenWorker=await startSeoCsvLab({brokenWorker:true}),results=[];
test.after(async()=>{
 await Promise.all([site.close(),broken.close(),brokenWorker.close()]);
 const file='.tmp/seo-csv-lab-browser-results.json';
 fs.mkdirSync(path.dirname(file),{recursive:true});
 fs.writeFileSync(file,JSON.stringify({at:new Date().toISOString(),status:'OWNED_LOCAL_BROWSER_TESTS_ONLY',results,limits:['No native Android or iPhone','No Google indexing','No public DNS/TLS','No publisher approval']},null,2));
});
for(const [name,engine] of [['Chromium',chromium],['Firefox',firefox],['WebKit',webkit]]){
 test(name+' runs shipped CSV UI, verifies downloaded bytes and catches broken script',async()=>{
  let browserInstance;
  const entry={browser:name,status:'NOT_RUN',checks:[]};results.push(entry);
  try{
   browserInstance=await engine.launch({headless:true});
   entry.version=browserInstance.version();
   const context=await browserInstance.newContext({viewport:{width:390,height:844},acceptDownloads:true});
   const page=await context.newPage(),external=[];
   page.on('request',r=>{if(!r.url().startsWith(site.origin)&&!r.url().startsWith('blob:'))external.push(r.url())});
   const response=await page.goto(site.origin+'/',{waitUntil:'load'});assert.equal(response.status(),200);
   assert.equal(await page.getByRole('heading',{name:'Remove Duplicate CSV Rows in Your Browser'}).count(),1);
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth+1));
   entry.checks.push('MOBILE_VIEWPORT_AND_REAL_INITIAL_HTML');
   await page.getByRole('textbox',{name:'Or paste CSV text'}).fill('id,value\n1,-2e3\n1,-2e3\n2,=2+2\n');
   await page.getByRole('button',{name:'Remove duplicate rows'}).click();
   await page.waitForFunction(()=>/Removed 1 duplicate rows; kept 2 rows/.test(document.getElementById('status').textContent));
   assert.match(await page.getByRole('status').textContent(),/Removed 1 duplicate rows; kept 2 rows/);
   const [dl]=await Promise.all([page.waitForEvent('download'),page.getByRole('link',{name:'Download cleaned CSV'}).click()]);
   const bytes=fs.readFileSync(await dl.path(),'utf8');
   assert.equal(bytes,"id,value\r\n1,-2e3\r\n2,'=2+2\r\n");
   fs.mkdirSync('.tmp/premium-csv-screenshots',{recursive:true});
   await page.screenshot({path:'.tmp/premium-csv-screenshots/'+name.toLowerCase()+'-mobile.png',fullPage:true});
   entry.checks.push('REAL_PASTE_AND_DOWNLOAD_BYTES_AND_SCIENTIFIC_NUMBER');
   await page.getByRole('checkbox',{name:'Escape spreadsheet formulas (may modify text)'}).uncheck();
   await page.getByRole('button',{name:'Remove duplicate rows'}).click();
   const [rawDownload]=await Promise.all([page.waitForEvent('download'),page.getByRole('link',{name:'Download cleaned CSV'}).click()]);
   assert.equal(fs.readFileSync(await rawDownload.path(),'utf8'),'id,value\r\n1,-2e3\r\n2,=2+2\r\n');
   entry.checks.push('EXPLICIT_RAW_FIDELITY_OPTION');
   await page.getByRole('textbox',{name:'Or paste CSV text'}).fill('id,name\n1\n');
   await page.getByRole('button',{name:'Remove duplicate rows'}).click();
   await page.waitForFunction(()=>/different number of columns/.test(document.getElementById('status').textContent));
   assert.match(await page.getByRole('status').textContent(),/different number of columns/);
   assert.equal(await page.getByRole('link',{name:'Download cleaned CSV'}).count(),0);
   entry.checks.push('INVALID_INPUT_REJECTED_NO_DOWNLOAD');
   await page.getByRole('textbox',{name:'Or paste CSV text'}).fill('');
   await page.getByLabel('Choose a CSV file (2 MB maximum)').setInputFiles({name:'rows.csv',mimeType:'text/csv',buffer:Buffer.from('name,city\nAsha,Jaipur\nAsha,Jaipur\n')});
   await page.getByRole('button',{name:'Remove duplicate rows'}).click();
   const [fileDownload]=await Promise.all([page.waitForEvent('download'),page.getByRole('link',{name:'Download cleaned CSV'}).click()]);
   assert.equal(fs.readFileSync(await fileDownload.path(),'utf8'),'name,city\r\nAsha,Jaipur\r\n');
   assert.deepEqual(external,[]);
   entry.checks.push('ACTUAL_FILE_UPLOAD_TO_BROWSER_ONLY_AND_ZERO_EXTERNAL_REQUESTS');
   const noJs=await browserInstance.newContext({javaScriptEnabled:false});
   const htmlOnly=await noJs.newPage();await htmlOnly.goto(site.origin);
   assert.equal(await htmlOnly.getByRole('heading',{name:'Remove Duplicate CSV Rows in Your Browser'}).count(),1);
   await noJs.close();entry.checks.push('NO_JS_CONTENT_PRESENT');
   const brokenPage=await context.newPage(),failures=[];
   brokenPage.on('pageerror',e=>failures.push(e.message));
   await brokenPage.goto(broken.origin+'/');
   await brokenPage.getByRole('textbox',{name:'Or paste CSV text'}).fill('id\n1\n1\n');
   await brokenPage.locator('#csv-form').evaluate(form=>form.dispatchEvent(new Event('submit',{bubbles:true,cancelable:true})));
   // Synthetic submit avoids unhandled default navigation when JS is intentionally broken.
   assert.ok(failures.some(x=>x.includes('Intentional broken shipped UI')));
   assert.equal(await brokenPage.getByRole('link',{name:'Download cleaned CSV'}).count(),0);
   entry.checks.push('MUTATED_BROKEN_SCRIPT_NEGATIVE_CONTROL');
   await context.close();entry.status='PASS';
  }catch(e){entry.status='FAIL';entry.error=String(e?.stack||e).slice(0,1500);throw e}
  finally{if(browserInstance)await browserInstance.close()}
 });
}

for(const [name,engine] of [['Chromium',chromium],['Firefox',firefox],['WebKit',webkit]]){
 test(name+' premium studio: key column, preview, stale result, UTF8 strict, XSS and failed worker',async()=>{
  const b=await engine.launch({headless:true});
  try{
   const context=await b.newContext({viewport:{width:1280,height:900},acceptDownloads:true});
   const page=await context.newPage(),offOrigin=[];
   page.on('request',r=>{if(!r.url().startsWith(site.origin)&&!r.url().startsWith('blob:'))offOrigin.push(r.url());});
   await page.goto(site.origin+'/',{waitUntil:'load'});
   assert.equal(await page.getByRole('heading',{name:'Remove Duplicate CSV Rows in Your Browser'}).count(),1);
   assert.equal(await page.locator('h1').count(),1);
   assert.equal(await page.locator('#empty-state').isVisible(),true);
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth+1));
   fs.mkdirSync('.tmp/premium-csv-screenshots',{recursive:true});
   await page.screenshot({path:'.tmp/premium-csv-screenshots/'+name.toLowerCase()+'-initial.png',fullPage:true});
   await page.getByRole('button',{name:'Load sample'}).click();
   assert.match(await page.locator('#csv-paste').inputValue(),/Asha,Jaipur/);
   await page.locator('#scope').selectOption('column');
   assert.equal(await page.locator('#column-controls').isVisible(),true);
   await page.locator('#column').fill('1');
   await page.getByRole('button',{name:'Remove duplicate rows'}).click();
   await page.waitForFunction(()=>/Removed 2 duplicate rows; kept 3 rows/.test(document.querySelector('#status').textContent));
   assert.equal(await page.locator('#stat-original').textContent(),'5');
   assert.equal(await page.locator('#stat-kept').textContent(),'3');
   assert.equal(await page.locator('#stat-removed').textContent(),'2');
   assert.equal(await page.locator('#result-view').isVisible(),true);
   assert.equal(await page.locator('#result-table tbody tr').count(),3);
   assert.equal(await page.locator('#result-table thead th').first().textContent(),'id');
   const [dl]=await Promise.all([page.waitForEvent('download'),page.getByRole('link',{name:/Download cleaned CSV/}).click()]);
   assert.equal(fs.readFileSync(await dl.path(),'utf8'),'id,name,city\r\n1,Asha,Jaipur\r\n2,Lee,Delhi\r\n3,Noor,Jaipur\r\n');
   await page.screenshot({path:'.tmp/premium-csv-screenshots/'+name.toLowerCase()+'-cleaned.png',fullPage:true});
   await page.getByRole('checkbox',{name:'Preserve uppercase and lowercase distinctions'}).uncheck();
   assert.equal(await page.getByRole('link',{name:/Download cleaned CSV/}).count(),0);
   assert.equal(await page.locator('#result-view').isVisible(),false);
   await page.getByRole('button',{name:'Reset'}).click();
   assert.equal(await page.locator('#csv-paste').inputValue(),'');
   assert.equal(await page.locator('#scope').inputValue(),'all');
   await page.getByLabel('Choose a CSV file (2 MB maximum)').setInputFiles({
    name:'corrupt.csv',mimeType:'text/csv',buffer:Buffer.from([0xff,0xfe,0x80])
   });
   await page.getByRole('button',{name:'Remove duplicate rows'}).click();
   await page.waitForFunction(()=>/not valid UTF-8/.test(document.querySelector('#status').textContent));
   assert.equal(await page.getByRole('link',{name:/Download cleaned CSV/}).count(),0);
   await page.getByRole('button',{name:'Reset'}).click();
   await page.getByRole('textbox',{name:'Or paste CSV text'}).fill('id,payload\n1,"<img src=x onerror=alert(1)>"\n1,"<img src=x onerror=alert(1)>"\n');
   await page.getByRole('button',{name:'Remove duplicate rows'}).click();
   await page.waitForFunction(()=>/Removed 1 duplicate rows/.test(document.querySelector('#status').textContent));
   assert.equal(await page.locator('#result-table img').count(),0);
   assert.match(await page.locator('#result-table tbody').textContent(),/<img src=x onerror=alert\(1\)>/);
   assert.deepEqual(offOrigin,[]);
   const badPage=await context.newPage();
   await badPage.goto(brokenWorker.origin+'/');
   await badPage.getByRole('textbox',{name:'Or paste CSV text'}).fill('id\n1\n1\n');
   await badPage.getByRole('button',{name:'Remove duplicate rows'}).click();
   await badPage.waitForFunction(()=>/Background CSV processing failed/.test(document.querySelector('#status').textContent));
   assert.equal(await badPage.getByRole('link',{name:/Download cleaned CSV/}).count(),0);
   await context.close();
  }finally{await b.close()}
 });
}
