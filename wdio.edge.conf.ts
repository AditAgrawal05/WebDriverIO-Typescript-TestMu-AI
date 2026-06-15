import { config as baseConfig } from './wdio.conf';
import { Options } from '@wdio/types';
import dotenv from 'dotenv';

dotenv.config();

const LT_USERNAME = process.env.LT_USERNAME || 'your_lambdatest_username';
const LT_ACCESS_KEY = process.env.LT_ACCESS_KEY || 'your_lambdatest_access_key';

export const config: Options.Testrunner = {
  ...baseConfig,
  capabilities: [
    {
      browserName: 'MicrosoftEdge',
      browserVersion: 'latest',
      'LT:Options': {
        username: LT_USERNAME,
        accessKey: LT_ACCESS_KEY,
        platformName: 'Windows 11',
        project: 'WebDriverIO TypeScript Demo',
        build: `WDIO TS Build - ${new Date().toISOString().split('T')[0]}`,
        name: 'Desktop Edge Test',
        resolution: '1920x1080',
        w3c: true,
        plugin: 'node_js-webdriverIO',
      },
    } as WebdriverIO.Capabilities,
  ],
};
