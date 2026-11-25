import {test,expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import {readFile,mkdir} from 'node:fs/promises';
test('actual Astro site serves descriptive HTML and a real linked tool',async({page})=>{
 await page.goto('/');
 await expect(page.getByRole('heading',{level:1})).toHaveCount(1);
 await expect(page.getByRole('link',{name:/Open JSONL inspector/i})).toBeVisible();
 await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content','noindex,nofollow');
 const canonical=await page.locator('link[rel="canonical"]').getAttribute('href');
 expect(canonical).toBe('https://starter.example.org/');
});
test('actual JSONL job produces correct download, counts and safe preview',async({page},info)=>{
 await page.goto('/tools/jsonl-inspector/');
 await page.getByRole('button',{name:'Load sample'}).click();
 await page.getByRole('button',{name:/Validate JSONL/}).click();
 await expect(page.getByRole('status')).toContainText('Validated 2 JSONL records');
 await expect(page.locator('#records')).toHaveText('2');
 await expect(page.locator('#preview li')).toHaveCount(2);
 await mkdir('artifacts/screenshots',{recursive:true});
 await page.screenshot({path:'artifacts/screenshots/'+info.project.name+'-completed.png',fullPage:true});
 const [download]=await Promise.all([page.waitForEvent('download'),page.getByRole('link',{name:/Download normalized JSONL/}).click()]);
 const bytes=await readFile(await download.path(),'utf8');
 expect(bytes).toBe('{"id":1,"name":"Asha"}\n{"id":2,"name":"Lee"}\n');
 await page.getByLabel('Ignore empty lines').check();
 await expect(page.locator('#result')).toBeHidden();
 await expect(page.locator('#download')).toBeHidden();
});
test('invalid JSONL and rejected file encoding produce a visible failure without download',async({page})=>{
 await page.goto('/tools/jsonl-inspector/');
 await page.locator('#jsonl-paste').fill('{"id":1}\n{"id":}\n');
 await page.getByRole('button',{name:/Validate JSONL/}).click();
 await expect(page.getByRole('status')).toContainText('Invalid JSON at line 2');
 await expect(page.locator('#download')).toBeHidden();
 await page.locator('#jsonl-file').setInputFiles({name:'corrupt.jsonl',mimeType:'application/x-ndjson',buffer:Buffer.from([0xff,0x80])});
 await page.getByRole('button',{name:/Validate JSONL/}).click();
 await expect(page.getByRole('status')).toContainText('File is not valid UTF-8');
 await expect(page.locator('#download')).toBeHidden();
});
test('HTML-looking data cannot execute and is visibly literal text',async({page})=>{
 await page.goto('/tools/jsonl-inspector/');
 await page.locator('#jsonl-paste').fill('{"html":"<img src=x onerror=alert(1)>"}\n');
 await page.getByRole('button',{name:/Validate JSONL/}).click();
 await expect(page.getByRole('status')).toContainText('Validated 1 JSONL records');
 await expect(page.locator('#preview img')).toHaveCount(0);
 await expect(page.locator('#preview li')).toContainText('<img src=x onerror=alert(1)>');
});
test('mobile viewport reflows without horizontal overflow and primary job remains available',async({page},info)=>{
 await page.setViewportSize({width:390,height:844});
 await page.goto('/tools/jsonl-inspector/');
 await expect(page.getByRole('button',{name:/Validate JSONL/})).toBeVisible();
 const over=await page.evaluate(()=>document.documentElement.scrollWidth>window.innerWidth+1);
 expect(over).toBe(false);
 await mkdir('artifacts/screenshots',{recursive:true});
 await page.screenshot({path:'artifacts/screenshots/'+info.project.name+'-mobile.png',fullPage:true});
});
test('privacy and about pages contain true limitations and no tracking scripts',async({page})=>{
 await page.goto('/privacy/');
 await expect(page.getByRole('heading',{name:/Local processing/})).toBeVisible();
 await expect(page.locator('script[src*="google-analytics"],script[src*="googletagmanager"]')).toHaveCount(0);
 await page.goto('/about/');
 await expect(page.getByRole('heading',{name:/Tools that do the work/})).toBeVisible();
});
test('automated critical/serious accessibility check on the real tool page',async({page})=>{
 await page.goto('/tools/jsonl-inspector/');
 const report=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa']).analyze();
 const high=report.violations.filter(x=>x.impact==='critical'||x.impact==='serious');
 expect(high,JSON.stringify(high.map(x=>({id:x.id,nodes:x.nodes.length,impact:x.impact}))).slice(0,3000)).toEqual([]);
});
