@mobile @android
Feature: ColorNote Android Notes Management
  As an Android ColorNote user
  I want to skip onboarding and create text notes
  So that my notes are saved and visible inside the application

  Background:
    Given the ColorNote Android app ("app/android/ColorNote+Notepad.apk") is launched via UIAutomator2

  @positive @smoke
  Scenario: Skip onboarding tutorial
    When I tap the "btn_start_skip" button
    Then the "Add note" option should be displayed

  @positive @create
  Scenario: Create and save a multi-line text note
    Given I am on the ColorNote home screen
    When I tap "Add note" and select "Text"
    And I enter heading "Anime List" and body "Naruto\nOnePiece\nAOT"
    And I navigate back twice to save the note
    Then the edit button "edit_btn" should be displayed
    And the saved note view should display "Naruto\nOnePiece\nAOT"
