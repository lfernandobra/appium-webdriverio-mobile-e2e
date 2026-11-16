@mobile @ios
Feature: iOS Hybrid WebView, Todo & Native Controls
  As an iOS mobile QA automation suite
  I want to verify hybrid WebView context switching, native controls, and MVCTodo flows
  So that XCUITest selectors and Screen Objects remain reliable across iOS apps

  @webview @hybrid
  Scenario: Switch between native iOS app and dynamic WebView context
    Given the "wdiodemoapp.app" application is launched via XCUITest
    When I tap the "Webview" tab
    And I wait until more than 1 execution context is available
    And I switch context to the WebView context
    Then the ".hero__subtitle" element text should contain "automation"
    When I switch back to "NATIVE_APP" context and tap "Home"
    Then the native element "WEBDRIVER" should be displayed

  @todo @screen-object
  Scenario: Create a Todo List and Todo Item in MVCTodo
    Given the "MVCTodo.app" application is launched via XCUITest
    When I create a list named "Things to do today" via ListScreen
    And I open the "Things to do today" list
    And I create an item titled "Buy Groceries" with a selected due date via ItemScreen
    Then the accessibility item "Buy Groceries" should exist in the list

  @native @uikit
  Scenario Outline: Locate iOS alert triggers using native locator strategies
    Given the "UIKitCatalog.app" application is launched via XCUITest
    When I open "Alert Views" using "<strategy>" and tap "Simple"
    Then the native alert text should contain "A Short Title Is Best"

    Examples:
      | strategy           |
      | Accessibility ID   |
      | XPath              |
      | iOS Class Chain    |
      | Predicate String   |
