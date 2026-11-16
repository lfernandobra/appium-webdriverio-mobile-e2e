# BUG-001: Hardcoded Date Assertion Breaks `ios-todo-item.spec.js` Across Calendar Years

| Field | Value |
| :--- | :--- |
| **ID** | `BUG-001` |
| **Severity** | Medium |
| **Priority** | P2 |
| **Status** | Open — Tracked in Test Suite Maintenance |
| **Component** | `test/specs/ios/ios-todo-item.spec.js` (lines 33 & 39) |
| **Environment** | iOS XCUITest (`MVCTodo.app`) |

---

## Summary

`test/specs/ios/ios-todo-item.spec.js` selects and asserts a static calendar date string (`"Sunday, November 28"` / `"Due Sunday, November 28, 2021"`). When executed on any iOS simulator whose system date is not November 2021, the `UIDatePicker` accessibility element `"Sunday, November 28"` does not exist on the current calendar page, causing a deterministic `NoSuchElement` timeout.

---

## Evidence in Test Code

In [`test/specs/ios/ios-todo-item.spec.js`](../../../test/specs/ios/ios-todo-item.spec.js):

```javascript
// Line 33: Static day-of-week + date label
await ItemScreen.getByAccessibility('Sunday, November 28').click();
...
// Line 39: Static year assertion
await expect(ItemScreen.getByAccessibility('Due Sunday, November 28, 2021')).toBeExisting();
```

### Related Configuration & Selector Issues Resolved During Audit
1. **Double-tilde selector in `ios-todo-item.spec.js` (line 11):** `ListScreen.listNameField('~Things to do today')` previously evaluated to `~~Things to do today` because `ListScreen.listNameField(name)` already prepends `~`. Fixed to `ListScreen.listNameField("Things to do today")`.
2. **Mismatched Android APK in `config/wdio.android.conf.js`:** Local Android config pointed to `app/android/ApiDemos-debug.apk` while running `add-note-screen*.js` (which targets `ColorNote+Notepad.apk`). Fixed to `app/android/ColorNote+Notepad.apk`.

---

## Recommended Fix

1. Compute the target date dynamically from `new Date()` (e.g., today or `tomorrow = today + 1 day`) formatted with `Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })`.
2. Use the computed weekday/month/day string to tap the visible `Date Picker` cell and verify the rendered `"Due ..."` label dynamically.
3. Bundle `MVCTodo.app` or split `ios-todo-*.spec.js` into a dedicated capability config separate from `wdiodemoapp.app`.
