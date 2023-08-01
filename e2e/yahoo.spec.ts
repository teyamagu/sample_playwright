import { test, expect } from "@playwright/test";
import { YahooTopIndex } from "../page/yahoo/top";

test("yahoo top page moving", async ({ page }) => {
  const yahooTopIndex = new YahooTopIndex(page);

  await yahooTopIndex.load();
  await yahooTopIndex.change_tabs();
  await expect.soft(yahooTopIndex.mainPanel).toHaveCount(22);
  await expect.soft(yahooTopIndex.mainPanel.nth(0)).toContainText("更新");
  await yahooTopIndex.showArticleAndBack(1);
  await yahooTopIndex.showArticleAndBack(2);
  await yahooTopIndex.showArticleAndBack(3);
});
