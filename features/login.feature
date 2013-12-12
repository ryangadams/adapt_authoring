Feature: Logging In
  As a user of the Adapt Authoring Tool
  I want to be able to log in
  So that I can see my work

  Scenario: Not logged in
    When I go to the "Authoring Tool homepage"
    Then I should see a "link" with "Login"

  Scenario: Logging In
    When I go to the "Login page"
    And I log in as "admin" with password "password"
    Then I am redirected to my dashboard
    And I see "Hello admin"