# Hacker News Playwright Tests

This project uses Playwright to check that the first 100 articles on Hacker News' [newest page](https://news.ycombinator.com/newest) are ordered from newest to oldest. The test uses a page object to navigate, collect timestamps across pages, and verify their order.

## Run locally

```bash
npm ci
npx playwright install
npx playwright test
```

Run only the sorting test in Chromium:

```bash
npx playwright test tests/sortedArticles.spec.ts --project=chromium
```

## GitHub Actions

The workflow in `.github/workflows/playwright.yml` runs on pushes to `main` and pull requests targeting `main`. It installs dependencies and browsers, runs the Playwright suite on Ubuntu, and uploads the HTML report as an artifact.
