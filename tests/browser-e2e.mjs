import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {chromium,firefox,webkit} from 'playwright';
import {startOwnedWebLab} from '../scripts/owned-web-lab.mjs';
// Exactly actual, locally launched browser engines; NOT actual Googlebot/ChatGPT crawler.
const fixture=await startOwnedWebLab(),results=[];
test.after(async()=>{
 await fixture.close();
 const target=path.resolve('.tmp/browser-e2e-results.json');
 fs.mkdirSync(path.dirname(target),{recursive:true});
 fs.writeFileSync(target,JSON.stringify({evidence:'OWNED_LOCAL_REAL_BROWSER_RUNS_NOT_SEARCH_INDEXING',at:new Date().toISOString(),results},null,2)+'\n');
});
for(const [name,engine] of [['Chromium/Blink',chromium],['Firefox/Gecko',firefox],['WebKit/WebCore',webkit]]){
 test(name+': real rendering and accessibility, security, HTTP, errors',async()=>{
  let browser;
  const record={engine:name,status:'INCOMPLETE',checks:[]};
  results.push(record);
  try{
   browser=await engine.launch({headless:true});
   record.browser_version=browser.version();
   const context=await browser.newContext({viewport:{width:390,height:844}});
   const page=await context.newPage();
   const normal=await page.goto(fixture.origin+'/document',{waitUntil:'domcontentloaded'});
   assert.equal(normal.status(),200);
   record.checks.push('HTTP200');
   await assert.doesNotReject(page.getByRole('heading',{name:'Local string length tool'}).waitFor());
   await page.getByRole('textbox',{name:'Test phrase'}).fill('robot and human');
   await page.getByRole('button',{name:'Calculate'}).click();
   assert.equal(await page.getByRole('status').textContent(),'Characters: 15');
   record.checks.push('SEMANTIC_FORM_AND_ACTION');
   assert.equal(await page.locator('link[rel=canonical]').getAttribute('href'),fixture.origin+'/document');
   assert.equal(await page.getByRole('link',{name:'Documentation'}).getAttribute('href'),'/document');
   record.checks.push('CANONICAL_AND_LINK');
   const missing=await page.goto(fixture.origin+'/missing');
   assert.equal(missing.status(),404);
   const soft=await page.goto(fixture.origin+'/soft404');
   assert.equal(soft.status(),200);
   assert.equal(await page.locator('h1').textContent(),'Not found');
   record.checks.push('REAL404_VS_SOFT404');
   await page.goto(fixture.origin+'/hydration-only');
   assert.equal(await page.getByRole('heading',{name:'Rendered with JavaScript'}).count(),1);
   record.checks.push('JS_HYDRATION');
   await page.goto(fixture.origin+'/csp-block');
   assert.equal(await page.locator('#result').textContent(),'Original');
   record.checks.push('CSP_PREVENTED_INLINE_SCRIPT');
   const errors=[];
   page.on('pageerror',error=>errors.push(error.message));
   await page.goto(fixture.origin+'/js-crash');
   assert.ok(errors.some(x=>x.includes('Intentional fixture JS failure')));
   record.checks.push('JAVASCRIPT_EXCEPTION_CAPTURE');
   const auth=await page.goto(fixture.origin+'/private/account');
   assert.equal(auth.status(),401);
   assert.match(await page.locator('body').textContent(),/Authentication required/);
   record.checks.push('SERVER_AUTHORIZATION');
   const withoutJS=await browser.newContext({javaScriptEnabled:false});
   const noJSPage=await withoutJS.newPage();
   await noJSPage.goto(fixture.origin+'/document');
   assert.equal(await noJSPage.getByRole('heading',{name:'Local string length tool'}).count(),1);
   await noJSPage.goto(fixture.origin+'/hydration-only');
   assert.equal(await noJSPage.locator('h1').count(),0);
   record.checks.push('RAW_HTML_VS_JS_CONTENT');
   await withoutJS.close();await context.close();
   record.status='PASS';
  }catch(error){record.status='FAIL';record.error=String(error?.stack||error).slice(0,1500);throw error;}
  finally{if(browser)await browser.close();}
 });
}
