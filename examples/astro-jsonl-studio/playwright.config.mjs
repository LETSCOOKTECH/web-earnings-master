import {defineConfig} from '@playwright/test';
export default defineConfig({
 testDir:'./tests',
 testMatch:'browser.spec.mjs',
 fullyParallel:false,
 timeout:30000,
 retries:0,
 reporter:[['line'],['json',{outputFile:'artifacts/playwright.json'}]],
 use:{baseURL:'http://127.0.0.1:4321',viewport:{width:1280,height:800},acceptDownloads:true,trace:'retain-on-failure'},
 projects:[{name:'chromium',use:{browserName:'chromium'}},
           {name:'firefox',use:{browserName:'firefox'}},
           {name:'webkit',use:{browserName:'webkit'}}],
 webServer:{command:'npm run preview -- --port 4321',url:'http://127.0.0.1:4321/',reuseExistingServer:false,timeout:60000},
 outputDir:'artifacts/test-results'
});
