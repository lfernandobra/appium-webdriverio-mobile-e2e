# Mobile QA Test Plan — Appium + WebdriverIO

**Author:** Luis Fernando Brandão  
**Platforms:** Android (`UIAutomator2`) & iOS (`XCUITest`)  
**Stack:** Appium, WebdriverIO v9, Mocha, Allure Reporter, BrowserStack, ESLint (`eslint-plugin-wdio`)  

---

## 1. Objective & Scope

Validate native and hybrid mobile workflows across Android and iOS applications using a shared WebdriverIO configuration architecture that supports both local emulators/simulators and cloud execution on BrowserStack.

### In Scope
* **Android Native Flows (`ColorNote+Notepad.apk`):** Onboarding skip, text note creation, multi-line body persistence, and Screen Object encapsulation (`AddNoteScreen`, `EditNoteScreen`).
* **iOS Hybrid WebView (`wdiodemoapp.app`):** Asynchronous context polling (`driver.getContexts()`), switching from `NATIVE_APP` to `WEBVIEW`, DOM assertion (`.hero__subtitle`), and switching back to native controls.
* **iOS Native Controls (`UIKitCatalog.app`):** Locator strategy coverage (Accessibility ID, Tag Name, XPath, iOS Class Chain, Predicate Strings), search bar clearing, alert dialog dismissal, and picker wheel interaction.
* **iOS Todo Flows (`MVCTodo.app`):** List and item creation using `ListScreen` and `ItemScreen` (requires `MVCTodo.app` binary in `app/ios/` when running locally).
* **Observability & Static Quality:** Failure screenshots via `afterTest` hook, Allure HTML report generation via `onComplete`, and WDIO-specific lint enforcement (`await-expect`, `no-debug`, `no-pause`).

### Out of Scope
* Real-device biometric hardware flows (Face ID / Fingerprint).
* Push notification delivery across OS background states.
* Performance profiling of APK/IPA startup times.

---

## 2. Architecture & Engineering Decisions

1. **Layered WDIO Configuration (`config/`):**  
   Common runner settings, Mocha timeouts (`60000 ms`), Allure reporter options, and failure screenshot hooks live in [`config/wdio.shared.conf.js`](../../config/wdio.shared.conf.js). Platform-specific configs (`wdio.android.conf.js`, `wdio.ios.conf.js`, `wdio.android.bs.conf.js`) extend `sharedConfig` via ES module spreads to avoid duplicating hook and reporter code.
2. **Screen Object Pattern (`test/screenobjects/`):**  
   Platform locators (`resource-id`, `~accessibilityId`, iOS `XCUIElementType*`) are decoupled from test assertions in `add-note.screen.js`, `edit-note.screen.js`, `list.screen.js`, and `item.screen.js`.
3. **Deterministic Hybrid Context Switching:**  
   Instead of hard sleeps (`driver.pause`), `webview.spec.js` uses `driver.waitUntil` polling `driver.getContexts()` until `contexts.length > 1` before calling `driver.switchContext(contexts[1])`.
4. **CI Gating Strategy (`.github/workflows/ci.yaml`):**  
   Every `push` and `pull_request` runs static verification (`npm run lint` + ESM config import validation) so regressions in `it.only`, missing `await expect`, or `driver.pause` fail immediately without consuming paid cloud device minutes. Cloud execution on BrowserStack (`wdio.android.bs.conf.js`) runs on-demand via `workflow_dispatch` using repository secrets (`BS_USER`, `BS_KEY`).

---

## 3. Target Test Environments

| Target | Config File | Driver | Target App / Device |
| :--- | :--- | :--- | :--- |
| Local Android | `config/wdio.android.conf.js` | `UIAutomator2` | `app/android/ColorNote+Notepad.apk` (`Pixel 4`, Android 16.0) |
| Local iOS | `config/wdio.ios.conf.js` | `XCUITest` | `app/ios/wdiodemoapp.app` (`iPhone 12`, iOS 17.2) |
| Cloud Android | `config/wdio.android.bs.conf.js` | `UIAutomator2` (BrowserStack) | `Google Pixel 5` (Android 11.0, `BROWSERSTACK_APP_ID` / `bs://...`) |

---

## 4. Exit Criteria & Known Limitations

* **Static Gates:** `npm run lint` (`eslint test/ config/`) passes with `0` errors and `0` warnings; all 4 WDIO config files import cleanly under Node 24 ESM.
* **Functional Execution:** Android (`add-note-screen.spec.js`) and iOS WebView (`webview.spec.js`) pass against target emulators/simulators or BrowserStack with Allure failure screenshots captured automatically.
* **Known Testability Defect:** `test/specs/ios/ios-todo-item.spec.js` depends on a hardcoded calendar date (`Sunday, November 28, 2021`) and requires the external `MVCTodo.app` binary — tracked in [`BUG-001`](./bug-reports/BUG-001-hardcoded-date-ios-todo-item.md).
