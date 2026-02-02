# Playwright E2E – Sauce Demo

[![Playwright E2E Tests](https://github.com/YOUR_USERNAME/playwright-e2e-saucedemo/actions/workflows/playwright.yml/badge.svg)](https://github.com/artbajrami/playwright-e2e-saucedemo/actions/workflows/playwright.yml)

End-to-end test suite for [Sauce Demo](https://www.saucedemo.com) built with **Playwright** and **TypeScript**. Includes **CI/CD with GitHub Actions** (push, PR, scheduled). 

---

## Why Sauce Demo?

Sauce Demo is a stable, public demo store (login, products, cart, checkout) with consistent behavior and no auth barriers. It fits portfolio E2E work: real flows, clear assertions, and easy reproduction by reviewers.

---

## Tech Stack

| Technology            | Purpose                                    |
| --------------------- | ------------------------------------------ |
| **Playwright**        | Cross-viewport E2E automation              |
| **TypeScript**        | Type safety and maintainability            |
| **Page Object Model** | Reusable page logic and selectors          |
| **GitHub Actions**    | CI/CD: run tests on push, PR, and schedule |

Tests run on **desktop**, **tablet**, and **mobile** viewports (Chromium).

---

## Put This on GitHub (Resume)

1. **Create a new repo** on GitHub (e.g. `playwright-e2e-saucedemo`). Do **not** add a README or .gitignore (you already have them).

2. **From your project folder:**

   ```bash
   git init
   git add .
   git commit -m "Initial commit: Playwright E2E + CI/CD"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/playwright-e2e-saucedemo.git
   git push -u origin main
   ```

3. **Replace** `YOUR_USERNAME` in this README (badge link at the top) with your GitHub username.

4. After the first push, the **Actions** tab will run the workflow. Green check = pipeline passed.

---

## How the CI/CD Pipeline Works

The pipeline is defined in [`.github/workflows/playwright.yml`](.github/workflows/playwright.yml).

### When it runs (triggers)

| Trigger          | When                                                                         |
| ---------------- | ---------------------------------------------------------------------------- |
| **Push**         | You push to `main` or `master`                                               |
| **Pull request** | Someone opens a PR into `main` or `master`                                   |
| **Schedule**     | Every day at 06:00 UTC                                                       |
| **Manual**       | In the Actions tab, click “Run workflow” (if `workflow_dispatch` is enabled) |

### What it does (steps)

1. **Checkout** – Gets your repo code.
2. **Setup Node.js** – Installs Node LTS and uses npm cache.
3. **Install dependencies** – `npm ci` (uses `package-lock.json`).
4. **Install Playwright browsers** – Only Chromium (desktop/tablet/mobile use it).
5. **Run tests** – `npm run test` (all viewports).
6. **Upload report** – Saves the HTML report as an artifact (always).
7. **Upload test results** – On failure, saves screenshots/traces (optional).

### How to see results

- **Actions tab** → Click a run → See logs and **Artifacts**.
- **Artifacts:** download `playwright-report` → open `index.html` in a browser for the full report.
- **On failure:** download `test-results` for screenshots and traces.

---

## Test Strategy

| Layer          | Scope                      | Examples                                             |
| -------------- | -------------------------- | ---------------------------------------------------- |
| **Smoke**      | App and login page load    | URL, title, visible login form                       |
| **E2E**        | Full user journeys         | Login → add to cart → checkout → confirmation        |
| **Risk-based** | Critical and brittle areas | Sorting, cart persistence, required-field validation |

Tests run on **desktop (1280×720)**, **tablet (834×1194)**, and **mobile (390×844)**.

---

## Project Structure

```
playwright-e2e-saucedemo/
├── tests/
│   ├── auth/           # Login success and failure
│   ├── shopping/       # Cart and checkout flows
│   └── smoke/          # Load and visibility checks
├── pages/              # Page Object Model
├── test-data/          # Centralized users and data
├── .github/workflows/  # CI/CD pipeline
├── playwright.config.ts
└── package.json
```

---

## Running Tests Locally

**Prerequisites:** Node.js (LTS), npm.

```bash
# Install dependencies
npm ci

# Install browsers (Chromium for desktop/tablet/mobile)
npx playwright install

# Run all tests (desktop + tablet + mobile)
npm run test

# Run by suite
npm run test:smoke
npm run test:auth
npm run test:shopping

# Run by viewport
npm run test:desktop
npm run test:tablet
npm run test:mobile

# Run with UI
npm run test:ui
```

---

## Viewing Reports

**Locally (after a run):**

```bash
npm run report
```

**In GitHub Actions:** Open the workflow run → **Artifacts** → download `playwright-report` → open `index.html` in a browser.

---

## Configuration Highlights

- **Base URL:** `https://www.saucedemo.com`
- **Workers:** local = 4; CI = 2
- **Retries:** local = 0; CI = 2
- **Viewports:** desktop, tablet, mobile (Chromium)
- **Artifacts on failure:** HTML report, screenshot, trace

---

## License

MIT.
