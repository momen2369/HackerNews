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

The workflow in `.github/workflows/playwright.yml` runs on pushes to `main` and pull requests targeting `main`. It uses the Playwright `v1.64.1` container, which includes the browsers and system dependencies, installs project dependencies, runs the full test suite, and uploads the HTML report as an artifact. `HOME=/root` is set for the test step to support Firefox in the container.

To run the suite manually, open **Actions → Playwright Tests (Manual) → Run workflow** on GitHub. Choose Chromium, Firefox, WebKit, or all browsers. The manual workflow uses the same container and uploads the HTML report.
