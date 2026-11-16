# Appium + WebdriverIO Mobile E2E Automation Framework

[![Mobile E2E CI](https://github.com/lfernandobra/appium-webdriverio-mobile-e2e/actions/workflows/ci.yaml/badge.svg)](https://github.com/lfernandobra/appium-webdriverio-mobile-e2e/actions/workflows/ci.yaml)
[![WebdriverIO](https://img.shields.io/badge/WebdriverIO-v9.20-EA5906?style=flat-square&logo=webdriverio&logoColor=white)](https://webdriver.io/)
[![Appium](https://img.shields.io/badge/Appium-3.x-662D91?style=flat-square&logo=appium&logoColor=white)](https://appium.io/)
[![Allure Report](https://img.shields.io/badge/Allure-Report-FF6B6B?style=flat-square)](https://allurereport.org/)
[![BrowserStack](https://img.shields.io/badge/BrowserStack-Cloud-F58220?style=flat-square&logo=browserstack&logoColor=white)](https://www.browserstack.com/)

Cross-platform mobile test automation framework for **Android (`UIAutomator2`)** and **iOS (`XCUITest`)** using **Appium** and **WebdriverIO v9**. Includes Screen Object abstractions, hybrid native/WebView context switching, **Allure** reporting with automatic failure screenshots, **ESLint (`eslint-plugin-wdio`)** enforcement, **Gherkin BDD** specs, and **BrowserStack** cloud execution via GitHub Actions.

---

## 1. QA Strategy & Documentation

| Artifact | Purpose | Location |
| :--- | :--- | :--- |
| **Test Plan** | Cross-platform scope, architecture decisions, and CI gating | [`docs/qa/TEST_PLAN.md`](docs/qa/TEST_PLAN.md) |
| **Test Case Inventory** | 14 mapped Android & iOS mobile scenarios | [`docs/qa/TEST_CASES.md`](docs/qa/TEST_CASES.md) |
| **BDD Specifications** | Gherkin scenarios for Android notes and iOS hybrid/native flows | [`specs/features/`](specs/features/) |
| **Bug Report Example** | Analysis of hardcoded date fragility & config/selector fixes | [`BUG-001`](docs/qa/bug-reports/BUG-001-hardcoded-date-ios-todo-item.md) |

---

## 2. Repository Structure

```text
.
├── .github/workflows/
│   └── ci.yaml                         # ESLint + ESM config check on push; BrowserStack on manual dispatch
├── app/
│   ├── android/                        # ColorNote+Notepad.apk & ApiDemos-debug.apk
│   └── ios/                            # UIKitCatalog.app & wdiodemoapp.app
├── config/
│   ├── wdio.shared.conf.js             # Shared Mocha opts, Allure reporter & failure screenshot hook
│   ├── wdio.android.conf.js            # Local Android UIAutomator2 configuration (ColorNote)
│   ├── wdio.ios.conf.js                # Local iOS XCUITest configuration (WebView)
│   └── wdio.android.bs.conf.js         # BrowserStack Android cloud configuration
├── docs/qa/
│   ├── bug-reports/
│   │   └── BUG-001-hardcoded-date-ios-todo-item.md
│   ├── TEST_CASES.md
│   └── TEST_PLAN.md
├── specs/features/
│   ├── android-notes.feature           # BDD scenarios for ColorNote Android
│   └── ios-mobile.feature              # BDD scenarios for iOS WebView, UIKitCatalog & Todo
├── test/
│   ├── screenobjects/
│   │   ├── android/                    # AddNoteScreen & EditNoteScreen
│   │   ├── item.screen.js              # iOS Todo Item Screen Object
│   │   └── list.screen.js              # iOS Todo List Screen Object
│   └── specs/
│       ├── android/                    # Android E2E specs
│       ├── ios/                        # iOS WebView, Native & Todo specs
│       └── ios-findElements.spec.js    # iOS locator strategies (Accessibility ID, Class Chain, Predicate)
├── .env_template                       # Environment variable template for BrowserStack
├── .nvmrc                              # Node.js 24.11.1
├── eslint.config.mjs                   # ESLint 9 flat config + eslint-plugin-wdio rules
└── package.json
```

---

## 3. Technical Highlights

* **Multi-Environment Config Inheritance:** [`config/wdio.shared.conf.js`](config/wdio.shared.conf.js) centralizes Mocha timeouts, Allure report generation (`onComplete`), and automatic failure screenshots (`afterTest` -> `driver.takeScreenshot()`), extended cleanly by local Android, local iOS, and BrowserStack configs.
* **Screen Object Model:** Platform-specific selectors (`resource-id`, `~accessibilityId`, `-ios class chain`, `-ios predicate string`) are isolated from test steps under `test/screenobjects/`.
* **Dynamic Hybrid WebView Handling:** [`test/specs/ios/webview.spec.js`](test/specs/ios/webview.spec.js) polls `driver.getContexts()` via `driver.waitUntil()` instead of static sleeps before switching between `NATIVE_APP` and `WEBVIEW`.
* **Static WDIO Guardrails:** [`eslint.config.mjs`](eslint.config.mjs) enforces `wdio/await-expect`, `wdio/no-debug`, and `wdio/no-pause` across tests and configs.

---

## 4. Setup & Execution

### Prerequisites
* Node.js `>= 22.x` (pinned in [`.nvmrc`](.nvmrc): `24.11.1`)
* Local Appium drivers (when running against local emulators/simulators):
  ```bash
  npm install -g appium
  appium driver install uiautomator2
  appium driver install xcuitest
  ```
* Android Studio Emulator (`Pixel 4`, API matching `wdio.android.conf.js`) or macOS Xcode iOS Simulator (`iPhone 12`, iOS 17.2)

### Installation & Local Commands

```bash
# 1. Install project dependencies
npm ci

# 2. Run ESLint checks (no device required)
npm run lint

# 3. Run local Android suite (requires running Android emulator)
npm run test:android

# 4. Run local iOS WebView suite (requires macOS + iOS Simulator)
npm run test:ios

# 5. Generate & open Allure report
npm run report
```

### BrowserStack Cloud Execution

1. Copy `.env_template` to `.env` (never commit `.env`):
   ```env
   BROWSERSTACK_USER=your_browserstack_username
   BROWSERSTACK_KEY=your_browserstack_access_key
   ```
2. Run locally against BrowserStack:
   ```bash
   npm run test:bs
   ```
3. Or trigger the **`BrowserStack Android E2E`** job manually via **Actions -> Mobile E2E CI -> Run workflow** after configuring `BS_USER` and `BS_KEY` in GitHub Repository Secrets.

---

## 5. Author

**Luis Fernando Brandão**  
QA Automation Engineer  
* [LinkedIn](https://linkedin.com/in/lfernandobra)  
* [GitHub](https://github.com/lfernandobra)  
* lfernandobra@gmail.com
