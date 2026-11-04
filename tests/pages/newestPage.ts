import { expect, type Locator, type Page } from '@playwright/test';

export class NewestPage {
  private readonly articleRows: Locator;
  private readonly moreLink: Locator;

  constructor(private readonly page: Page) {
    this.articleRows = page.locator('tr.athing');
    this.moreLink = page.locator('a.morelink');
  }

  async goto(): Promise<void> {
    await this.page.goto('https://news.ycombinator.com/newest');
  }

  async expectFirstArticlesSortedByNewest(count: number): Promise<void> {
    const timestamps = await this.getNewestArticleTimestamps(count);

    expect(timestamps).toHaveLength(count);

    for (let index = 0; index < timestamps.length - 1; index += 1) {
      expect(
        timestamps[index],
        `Article ${index + 1} should be no older than article ${index + 2}`,
      ).toBeGreaterThanOrEqual(timestamps[index + 1]);
    }
  }

  private async getNewestArticleTimestamps(count: number): Promise<number[]> {
    const timestamps: number[] = [];

    while (timestamps.length < count) {
      await expect(this.articleRows.first()).toBeVisible();

      const currentPageTimestamps = await this.articleRows.evaluateAll((rows) =>
        rows.map((row) => {
          const timestamp = row.nextElementSibling
            ?.querySelector('.age')
            ?.getAttribute('title');

          if (!timestamp) {
            throw new Error(`Missing timestamp for article ${row.id || '(unknown)'}`);
          }

          return timestamp;
        }),
      );

      timestamps.push(
        ...currentPageTimestamps.map((timestamp) => {
          const parsedTimestamp = Date.parse(timestamp);

          if (Number.isNaN(parsedTimestamp)) {
            throw new Error(`Invalid article timestamp: ${timestamp}`);
          }

          return parsedTimestamp;
        }),
      );

      if (timestamps.length >= count) {
        break;
      }

      await expect(this.moreLink, `Could not load ${count} articles; the next-page link is missing.`)
        .toBeVisible();
      await this.moreLink.click();
    }

    return timestamps.slice(0, count);
  }
}
