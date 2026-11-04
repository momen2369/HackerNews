import { test } from '@playwright/test';
import { NewestPage } from './pages/newestPage';

test('the first 100 articles are sorted from newest to oldest', async ({ page }) => {
  const newestPage = new NewestPage(page);

  await newestPage.goto();
  await newestPage.expectFirstArticlesSortedByNewest(100);
});
