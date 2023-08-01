import { Locator, Page } from "@playwright/test";

export class YahooAuctions {
  readonly page: Page;
  readonly bannerLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.bannerLink = page
      .getByRole("banner")
      .getByRole("link", { name: "ヤフオク!" });
  }
}
