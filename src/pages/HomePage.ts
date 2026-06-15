import BasePage from './BasePage';

class HomePage extends BasePage {
  private get searchBar() { return $('[name="q"], [aria-label="Search"], input[type="search"]'); }
  private get heroHeading() { return $('h1'); }
  private get navLinks() { return $$('nav a'); }

  async open(): Promise<void> {
    await super.open('/');
  }

  async getTitle(): Promise<string> {
    return browser.getTitle();
  }

  async getUrl(): Promise<string> {
    return browser.getUrl();
  }

  async getHeadingText(): Promise<string> {
    return super.getText('h1');
  }

  async isSearchBarDisplayed(): Promise<boolean> {
    return super.isDisplayed('[name="q"], input[type="search"]');
  }

  async getNavLinkCount(): Promise<number> {
    return (await this.navLinks).length;
  }
}

export default new HomePage();
