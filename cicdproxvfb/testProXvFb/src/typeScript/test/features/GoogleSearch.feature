

@ProtractorHomePage
Feature: Navigating to the Protractor Home page
    As a test automation developer, i want to navigate to the protractor website using google search


    Scenario: Successfully navigating to the Protractor home page.
        Given User navigates to the Google page
        When  User types protractor in the search field
         And  clicks on the search button
         And  clicks on the www.protractortest.org link
        Then  the user should be navigated to the protractor home page
         