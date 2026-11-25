import {defineConfig,devices} from '@playwright/test';
export default defineConfig({
 testDir:'./tests',
 testMatch:'*.spec.ts',
 timeout:20000,
 expect:{timeout:7000},
 retries:process.env.CI?1:0,
 workers:process.env.CI?2:undefined,
 reporter:process.env.CI?[['list'],['html',{open:'never'}]]:'list',
 use:{baseURL:'http://127.0.0.1:4327',trace:'retain-on-failure',screenshot:'only-on-failure',acceptDownloads:true},
 projects:[
  {name:'chromium',use:{...devices['Desktop Chrome']}},
  {name:'firefox',use:{...devices['Desktop Firefox']}},
  {name:'webkit',use:{...devices['Desktop Safari']}}
 ],
 webServer:{command:'npm run preview -- --host 127.0.0.1 --port 4327',
  url:'http://127.0.0.1:4327/tools/jsonl-inspector/',
  reuseExistingServer:!process.env.CI,timeout:45000,
  env:{SITE_URL:'https://starter.example.org',RELEASE_STAGE:'FIXTURE_ONLY'}}
});
