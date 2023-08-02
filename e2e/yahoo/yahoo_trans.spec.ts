import { test, expect } from "@playwright/test";
import { YahooIndex } from "@pages/yahoo/index";
import { YahooAuctions } from "@pages/yahoo/auctions";

test("yahoo top page move to auctions page", async ({ page }) => {
  const yahooIndex = new YahooIndex(page);
  const yahooAuctions = new YahooAuctions(page);

  await yahooIndex.load();
  await yahooIndex.auctionsServiceLink.click();
  await expect.soft(yahooAuctions.bannerLink).toBeVisible();
});

test("yahoo top page api response", async ({ page }) => {
  const yahooIndex = new YahooIndex(page);

  await yahooIndex.load();
  let str = (
    await (await page.request.get("https://www.yahoo.co.jp/")).text()
  ).toString();
  await expect.soft(str).toContain("<title>Yahoo! JAPAN</title>");
});
