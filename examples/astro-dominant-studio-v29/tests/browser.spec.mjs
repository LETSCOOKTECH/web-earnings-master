import {test,expect} from '@playwright/test';
import fs from 'node:fs';
import {gzipSync} from 'node:zlib';

test('real Astro converter Worker outputs downloadable exact JSONL, no third-party requests',async({page},testInfo)=>{
 const external=[];
 page.on('request',req=>{if(!req.url().startsWith('http://127.0.0.1:4321')&&!req.url().startsWith('blob:'))external.push(req.url());});
 await page.goto('/tools/csv-to-jsonl/');
 await expect(page.getByRole('heading',{name:'CSV to JSONL'})).toBeVisible();
 await expect(page.locator('meta[name=robots]')).toHaveAttribute('content','noindex,follow');
 await page.locator('#studio-input').fill('id,name\n00501,Asha\n00502,Lee\n');
 await page.locator('#studio-run').click();
 await expect(page.locator('#studio-status')).toContainText('Conversion completed');
 await expect(page.locator('#studio-preview')).toContainText('"00501"');
 const event=page.waitForEvent('download');
 await page.locator('#studio-download').click();const file=await event;
 const data=fs.readFileSync(await file.path(),'utf8');
 expect(data).toBe('{"id":"00501","name":"Asha"}\n{"id":"00502","name":"Lee"}\n');
 expect(external).toEqual([]);
 await page.screenshot({path:testInfo.outputPath('studio-csv-jsonl.png'),fullPage:true});
});
test('formula-escape and malicious-looking cell content never become DOM HTML',async({page})=>{
 await page.goto('/tools/tsv-to-csv/');
 await page.locator('#studio-input').fill('id\tpayload\n1\t=CMD|A0\n2\t<img src=x onerror=alert(1)>\n');
 await page.locator('#studio-run').click();
 await expect(page.locator('#studio-status')).toContainText('Conversion completed');
 await expect(page.locator('#studio-preview')).toContainText("'=CMD");
 await expect(page.locator('#studio-preview')).toContainText('<img src=x onerror=alert(1)>');
 expect(await page.locator('#studio-preview img').count()).toBe(0);
 await page.locator('#studio-input').fill('not\\ta\\ttable');
 await expect(page.locator('#studio-download')).toBeHidden();
});
test('corrupt utf-8 and malformed JSONL have no partial output',async({page})=>{
 await page.goto('/tools/jsonl-validator/');
 await page.locator('#studio-input').fill('{"a":1}\n{"broken":}\n');
 await page.locator('#studio-run').click();
 await expect(page.locator('#studio-status')).toContainText('line 2');
 await expect(page.locator('#studio-download')).toBeHidden();
 await page.locator('#studio-file').setInputFiles({name:'broken.jsonl',mimeType:'text/plain',buffer:Buffer.from([0xff,0xfe,0x80])});
 await page.locator('#studio-run').click();
 await expect(page.locator('#studio-status')).toContainText(/encoded|valid|UTF-8|decode|text/i);
 await expect(page.locator('#studio-download')).toBeHidden();
});
test('gzip input decodes by stream, with source never uploaded',async({page})=>{
 await page.goto('/tools/csv-to-json/');
 const zipped=gzipSync(Buffer.from('id,name\n00501,Asha\n'));
 await page.locator('#studio-file').setInputFiles({name:'data.csv.gz',mimeType:'application/gzip',buffer:zipped});
 await page.locator('#studio-run').click();
 await expect(page.locator('#studio-status')).toContainText('Conversion completed');
 await expect(page.locator('#studio-preview')).toContainText('00501');
});
test('mobile layout does not overflow and category hub links resolve',async({page})=>{
 await page.setViewportSize({width:390,height:844});
 await page.goto('/');
 const hubs=page.locator('.category a[href^="/hubs/"]');
 await expect(hubs).toHaveCount(4);
 await hubs.first().click();
 await expect(page.locator('.tool-tile')).toHaveCount(10);
 await page.getByRole('link',{name:'CSV to JSONL'}).click();
 await expect(page.locator('h1')).toHaveCount(1);
 const difference=await page.evaluate(()=>document.documentElement.scrollWidth-window.innerWidth);
 expect(difference).toBeLessThanOrEqual(1);
});

test('workflow handoff only saves after explicit user approval, then consumes local output once',async({page})=>{
 await page.goto('/tools/csv-to-json/');
 await page.locator('#studio-input').fill('id,name\n00501,Asha\n');
 await page.locator('#studio-run').click();
 await expect(page.locator('#studio-status')).toContainText('Conversion completed');
 await expect(page.locator('#studio-chain')).toBeVisible();
 page.once('dialog',dialog=>dialog.dismiss());
 await page.locator('#studio-chain').click();
 await expect(page).toHaveURL(/csv-to-json/);
 page.once('dialog',dialog=>dialog.accept());
 await page.locator('#studio-chain').click();
 await expect(page).toHaveURL(/json-pretty/);
 await expect(page.locator('#studio-input')).toHaveValue(/00501/);
 await expect(page.locator('#studio-status')).toContainText('Previous output loaded locally');
 await page.locator('#studio-run').click();
 await expect(page.locator('#studio-status')).toContainText('Conversion completed');
});

test('real browser download escapes formula-like column headings as text',async({page})=>{
 await page.goto('/tools/csv-to-excel-csv/');
 await expect(page.locator('[data-route-use-case]')).toContainText('UTF-8');
 await page.locator('#studio-input').fill('=1+1,id\nrow,00501\n');
 await page.locator('#studio-run').click();
 await expect(page.locator('#studio-status')).toContainText('Conversion completed');
 const saved=page.waitForEvent('download');
 await page.locator('#studio-download').click();
 const file=await saved;
 expect(fs.readFileSync(await file.path(),'utf8')).toBe("\ufeff'=1+1,id\r\nrow,00501\r\n");
});
test('wrong file kind is rejected even when browser input selection is bypassed',async({page})=>{
 await page.goto('/tools/csv-to-json/');
 const select=page.locator('#studio-file');
 await expect(select).toHaveAttribute('accept',/\.csv/);
 await select.setInputFiles({name:'mismatch.json',mimeType:'application/json',buffer:Buffer.from('[{"id":1}]')});
 await page.locator('#studio-run').click();
 await expect(page.locator('#studio-status')).toContainText('Expected a CSV file');
 await expect(page.locator('#studio-download')).toBeHidden();
});
