import { Locator, Page } from "@playwright/test";

export class YahooIndex {
  readonly page: Page;
  readonly mainTab: Locator;
  readonly mainPanel: Locator;
  readonly mainPanelList: Locator;
  readonly bizTab: Locator;
  readonly bizPanel: Locator;
  readonly entertainmentTab: Locator;
  readonly entertainmentPanel: Locator;
  readonly auctionsServiceLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.mainTab = page.getByRole("link", { name: /主要/ });
    this.mainPanel = page
      .getByRole("tabpanel", { name: "主要" })
      .locator("div");
    this.mainPanelList = page
      .getByRole("tabpanel", { name: "主要" })
      .locator("a");

    this.bizTab = page.getByRole("link", { name: "経済" });
    this.bizPanel = page.getByRole("tabpanel", { name: "経済" }).locator("div");

    this.entertainmentTab = page.getByRole("link", { name: "エンタメ" });
    this.entertainmentPanel = page
      .getByRole("tabpanel", { name: "エンタメ" })
      .locator("div");

    this.auctionsServiceLink = page
      .getByRole("list", { name: "主なサービス" })
      .getByRole("link", { name: "ヤフオク!へ遷移する" });
  }

  async load() {
    await this.page.goto("https://www.yahoo.co.jp/");
    await this.page.waitForURL(this.page.url());
  }

  async change_tabs() {
    await this.bizTab.click();
    await this.entertainmentTab.click();
    await this.mainTab.click();
  }

  async showArticleAndBack(number: number) {
    await this.mainPanelList.nth(number).click();
    await this.page.waitForTimeout(1000);
    await this.page.goBack({ waitUntil: "domcontentloaded" });
  }
}
