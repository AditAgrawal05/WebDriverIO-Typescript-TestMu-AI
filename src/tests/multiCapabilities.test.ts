import { Logger } from '../utils/Logger';
import { LambdaTestHelper } from '../utils/LambdaTestHelper';

describe('Cross-Browser Navigation - Desktop', () => {
  const targetUrl = 'https://www.lambdatest.com';

  after(async function () {
    const passed = this.currentTest?.state !== 'failed';
    await LambdaTestHelper.setTestStatus(passed ? 'passed' : 'failed');
  });

  it('should navigate to LambdaTest and verify title', async () => {
    Logger.step(1, `Navigating to ${targetUrl}`);
    await browser.url(targetUrl);
    await browser.pause(15000);

    Logger.step(2, 'Getting page title');
    const title = await browser.getTitle();
    Logger.info(`Title: ${title}`);
    expect(title).toContain('LambdaTest');
  });

  it('should check page load time is within acceptable range', async () => {
    Logger.step(1, 'Measuring page load performance');
    const startTime = Date.now();
    await browser.url(targetUrl);
    await browser.pause(15000);
    const loadTime = Date.now() - startTime;

    Logger.info(`Page loaded in ${loadTime}ms`);
    expect(loadTime).toBeLessThan(30000);
  });

  it('should handle browser navigation (back/forward)', async () => {
    Logger.step(1, 'Navigate to homepage');
    await browser.url(targetUrl);
    await browser.pause(15000);

    Logger.step(2, 'Navigate to features page');
    await browser.url(`${targetUrl}/features/`);
    await browser.pause(15000);

    Logger.step(3, 'Go back');
    await browser.back();
    await browser.pause(15000);
    const backUrl = await browser.getUrl();
    expect(backUrl).toMatch(/lambdatest\.com|testmuai\.com/);

    Logger.step(4, 'Go forward');
    await browser.forward();
    await browser.pause(15000);
    const forwardUrl = await browser.getUrl();
    expect(forwardUrl).toMatch(/lambdatest\.com|testmuai\.com/);
  });

  it('should resize window to desktop resolution and verify layout', async () => {
    Logger.step(1, 'Set window size to 1920x1080');
    await browser.setWindowSize(1920, 1080);

    await browser.url(targetUrl);
    await browser.pause(15000);

    const size = await browser.getWindowSize();
    Logger.info(`Window size: ${size.width}x${size.height}`);
    expect(size.width).toBe(1920);
    expect(size.height).toBe(1080);
  });
});
