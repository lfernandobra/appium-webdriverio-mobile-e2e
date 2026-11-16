# Mobile Test Case Inventory — Appium + WebdriverIO

---

## 1. Android Suite (`ColorNote+Notepad.apk`)

| ID | Spec File | Scenario | Screen Objects / Locators | Expected Outcome |
| :--- | :--- | :--- | :--- | :--- |
| `TC-AND-01` | `test/specs/android/add-note-screen.spec.js` | Skip onboarding tutorial | `AddNoteScreen.skipBtn` (`resource-id: btn_start_skip`) | `"Add note"` button is displayed |
| `TC-AND-02` | `test/specs/android/add-note-screen.spec.js` | Create multi-line text note | `AddNoteScreen` (`edit_title`, `edit_note`, `driver.back()` x2) | `edit_btn` visible and `view_note` equals `"Naruto\nOnePiece\nAOT"` |
| `TC-AND-03` | *(Screen Object ready)* | Delete note to Trash Can | `EditNoteScreen` (`firstNote`, `~More`, `Delete`, `Trash Can`) | Reusable helper methods ready for Trash Can verification spec |

---

## 2. iOS Hybrid & Native Suites

| ID | Spec File | Target App | Scenario | Expected Outcome |
| :--- | :--- | :--- | :--- | :--- |
| `TC-IOS-01` | `test/specs/ios/webview.spec.js` | `wdiodemoapp.app` | Dynamic WebView switch & return | `.hero__subtitle` contains `"automation"`; returns to `NATIVE_APP` `"WEBDRIVER"` home screen |
| `TC-IOS-02` | `test/specs/ios-findElements.spec.js` | `UIKitCatalog.app` | Find by Accessibility ID | Opens `Alert Views -> Simple`; alert text contains `"A Short Title Is Best"` |
| `TC-IOS-03` | `test/specs/ios-findElements.spec.js` | `UIKitCatalog.app` | Find multiple by Tag Name | Queries `XCUIElementTypeStaticText` elements cleanly |
| `TC-IOS-04` | `test/specs/ios-findElements.spec.js` | `UIKitCatalog.app` | Find by XPath | Locates `Alert Views` / `Simple` and asserts alert text |
| `TC-IOS-05` | `test/specs/ios-findElements.spec.js` | `UIKitCatalog.app` | Find by `-ios class chain` | Matches `label CONTAINS "Alert"` and asserts alert text |
| `TC-IOS-06` | `test/specs/ios-findElements.spec.js` | `UIKitCatalog.app` | Find by `-ios predicate string` | Matches `value BEGINSWITH[c] "alert"` and asserts alert text |
| `TC-IOS-07` | `test/specs/ios-findElements.spec.js` | `UIKitCatalog.app` | Search field input & clear | Sets text in `XCUIElementTypeSearchField`, verifies `value`, taps `~Clear text`, verifies cleared |
| `TC-IOS-08` | `test/specs/ios/ios-native.spec.js` | `UIKitCatalog.app` | Dismiss native alert dialog | Taps `Okay / Cancel`, calls `driver.dismissAlert()`, verifies `~OK` no longer exists |
| `TC-IOS-09` | `test/specs/ios/ios-native.spec.js` | `UIKitCatalog.app` | Picker View RGB wheel values | Sets `125`, `0`, `125` on Red/Green/Blue pickers and verifies `value` attributes |
| `TC-IOS-10` | `test/specs/ios/ios-todo-list-screen.spec.js` | `MVCTodo.app` *(external)* | Create Todo List via `ListScreen` | `"Things to do today"` item exists via `ListScreen.listNameField` |
| `TC-IOS-11` | `test/specs/ios/ios-todo-item.spec.js` | `MVCTodo.app` *(external)* | Create Todo Item with due date | Fails on non-2021 simulator dates due to hardcoded date literal (see `BUG-001`) |
