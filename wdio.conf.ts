import { Options } from '@wdio/types';
import dotenv from 'dotenv';

dotenv.config();

const LT_USERNAME = process.env.LT_USERNAME || 'your_lambdatest_username';
const LT_ACCESS_KEY = process.env.LT_ACCESS_KEY || 'your_lambdatest_access_key';
const LT_GRID_URL = `https://${LT_USERNAME}:${LT_ACCESS_KEY}@hub.lambdatest.com/wd/hub`;

export const config: Options.Testrunner = {
  runner: 'local',
  autoCompileOpts: {
    autoCompile: true,
    tsNodeOpts: {
      project: './tsconfig.json',
      transpileOnly: true,
    },
  },

  specs: ['./src/tests/**/*.ts'],
  exclude: [],

  maxInstances: 1,

  capabilities: [
    {
      browserName: 'chrome',
      browserVersion: 'latest',
      'wdio:enforceWebDriverClassic': true,
      'LT:Options': {
        username: LT_USERNAME,
        accessKey: LT_ACCESS_KEY,
        platformName: 'Windows 11',
        project: 'WebDriverIO TypeScript Demo',
        build: `WDIO TS Build - ${new Date().toISOString().split('T')[0]}`,
        name: 'Desktop Chrome Test',
        resolution: '1920x1080',
        selenium_version: '4.0.0',
        w3c: true,
        plugin: 'node_js-webdriverIO',
      },
    } as WebdriverIO.Capabilities,
  ],

  logLevel: 'info',
  bail: 0,
  baseUrl: 'https://www.lambdatest.com',
  waitforTimeout: 15000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,

  hostname: 'hub.lambdatest.com',
  port: 443,
  path: '/wd/hub',
  protocol: 'https',

  services: [],

  framework: 'mocha',
  reporters: [
    'spec',
    [
      'allure',
      {
        outputDir: 'allure-results',
        disableWebdriverStepsReporting: false,
        disableWebdriverScreenshotsReporting: false,
      },
    ],
  ],

  mochaOpts: {
    ui: 'bdd',
    timeout: 120000,
  },

  afterTest: async function (
    _test,
    _context,
    { error, passed }
  ) {
    if (error || !passed) {
      await browser.takeScreenshot();
    }
  },
};
