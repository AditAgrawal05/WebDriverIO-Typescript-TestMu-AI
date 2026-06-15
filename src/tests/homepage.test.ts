import HomePage from '../pages/HomePage';
import { Logger } from '../utils/Logger';
import { LambdaTestHelper } from '../utils/LambdaTestHelper';

describe('LambdaTest Homepage - Desktop', () => {
  before(async () => {
    Logger.info('Opening LambdaTest homepage');
    await HomePage.open();
  });

  after(async function () {
    const passed = this.currentTest?.state !== 'failed';
    await LambdaTestHelper.setTestStatus(passed ? 'passed' : 'failed');
  });

  it('should load the homepage with correct title', async () => {
    Logger.step(1, 'Verify page title contains LambdaTest');
    const title = await HomePage.getTitle();
    Logger.info(`Page title: ${title}`);
    expect(title).toContain('LambdaTest');
  });

  it('should be on the correct URL', async () => {
    Logger.step(1, 'Verify URL is lambdatest.com or testmuai.com');
    const url = await HomePage.getUrl();
    Logger.info(`Current URL: ${url}`);
    expect(url).toMatch(/lambdatest\.com|testmuai\.com/);
  });

  it('should display the main heading', async () => {
    Logger.step(1, 'Verify H1 heading is visible');
    const heading = await HomePage.getHeadingText();
    Logger.info(`Heading text: ${heading}`);
    expect(heading.length).toBeGreaterThan(0);
  });

  it('should have navigation links', async () => {
    Logger.step(1, 'Verify navigation links exist');
    const count = await HomePage.getNavLinkCount();
    Logger.info(`Nav link count: ${count}`);
    expect(count).toBeGreaterThan(0);
  });
});
