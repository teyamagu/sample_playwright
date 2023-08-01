import { test, expect } from "@playwright/test";
import { YahooTopIndex } from "../page/yahoo/top";
import { YahooAuctions } from "../page/yahoo/auctions";

test("yahoo top page move to auctions page", async ({ page }) => {
  const yahooTopIndex = new YahooTopIndex(page);
  const yahooAuctions = new YahooAuctions(page);

  await yahooTopIndex.load();
  await yahooTopIndex.auctionsServiceLink.click();
  await expect.soft(yahooAuctions.bannerLink).toBeVisible();
});

test("yahoo top page api response", async ({ page }) => {
  const yahooTopIndex = new YahooTopIndex(page);

  await yahooTopIndex.load();
  let str = (
    await (await page.request.get("https://www.yahoo.co.jp/")).text()
  ).toString();
  await expect.soft(str).toContain("<title>Yahoo! JAPAN</title>");
});
