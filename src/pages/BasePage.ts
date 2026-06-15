export default class BasePage {
  protected async open(path: string = ''): Promise<void> {
    await browser.url(path);
    await browser.pause(15000);
  }

  protected async waitAndClick(selector: string): Promise<void> {
    const el = await $(selector);
    await el.waitForClickable({ timeout: 10000 });
    await el.click();
  }

  protected async waitAndSetValue(selector: string, value: string): Promise<void> {
    const el = await $(selector);
    await el.waitForDisplayed({ timeout: 10000 });
    await el.clearValue();
    await el.setValue(value);
  }

  protected async getText(selector: string): Promise<string> {
    const el = await $(selector);
    await el.waitForDisplayed({ timeout: 10000 });
    return el.getText();
  }

  protected async isDisplayed(selector: string): Promise<boolean> {
    const el = await $(selector);
    return el.isDisplayed();
  }
}
