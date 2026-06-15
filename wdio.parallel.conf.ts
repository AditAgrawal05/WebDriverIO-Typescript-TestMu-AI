import { config as baseConfig } from './wdio.conf';
import { Options } from '@wdio/types';
import dotenv from 'dotenv';

dotenv.config();

const LT_USERNAME = process.env.LT_USERNAME || 'your_lambdatest_username';
const LT_ACCESS_KEY = process.env.LT_ACCESS_KEY || 'your_lambdatest_access_key';
const buildName = `WDIO TS Parallel Build - ${new Date().toISOString().split('T')[0]}`;

export const config: Options.Testrunner = {
  ...baseConfig,
  maxInstances: 3,
  capabilities: [
    {
      browserName: 'chrome',
      browserVersion: 'latest',
      'LT:Options': {
        username: LT_USERNAME,
        accessKey: LT_ACCESS_KEY,
        platformName: 'Windows 11',
        project: 'WebDriverIO TypeScript Demo',
        build: buildName,
        name: 'Desktop Chrome Test',
        resolution: '1920x1080',
        w3c: true,
        plugin: 'node_js-webdriverIO',
      },
    } as WebdriverIO.Capabilities,
    {
      browserName: 'firefox',
      browserVersion: 'latest',
      'LT:Options': {
        username: LT_USERNAME,
        accessKey: LT_ACCESS_KEY,
        platformName: 'Windows 11',
        project: 'WebDriverIO TypeScript Demo',
        build: buildName,
        name: 'Desktop Firefox Test',
        resolution: '1920x1080',
        w3c: true,
        plugin: 'node_js-webdriverIO',
      },
    } as WebdriverIO.Capabilities,
    {
      browserName: 'MicrosoftEdge',
      browserVersion: 'latest',
      'LT:Options': {
        username: LT_USERNAME,
        accessKey: LT_ACCESS_KEY,
        platformName: 'Windows 11',
        project: 'WebDriverIO TypeScript Demo',
        build: buildName,
        name: 'Desktop Edge Test',
        resolution: '1920x1080',
        w3c: true,
        plugin: 'node_js-webdriverIO',
      },
    } as WebdriverIO.Capabilities,
  ],
};
