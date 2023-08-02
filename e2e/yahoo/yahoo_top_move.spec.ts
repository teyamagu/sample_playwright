import { test, expect } from "@playwright/test";
import { YahooIndex } from "@pages/yahoo/index";

test("yahoo top page moving", async ({ page }) => {
  const yahooIndex = new YahooIndex(page);

  await yahooIndex.load();
  await yahooIndex.change_tabs();
  await expect.soft(yahooIndex.mainPanel).toHaveCount(22);
  await expect.soft(yahooIndex.mainPanel.nth(0)).toContainText("更新");
  await yahooIndex.showArticleAndBack(1);
  await yahooIndex.showArticleAndBack(2);
  await yahooIndex.showArticleAndBack(3);
});
