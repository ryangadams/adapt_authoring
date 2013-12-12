Feature: Browsing & Creating Courses

  Scenario: Adding a new course
    Given I am logged in as "admin"
    When I go to the "User Dashboard"
    And I click "Add new course"
    And I enter a name of "Test Course"
    Then the course appears in my course listing

  Scenario: Viewing a course
    Given I am logged in as "admin"
    When I go to the "User Dashboard"
    And I click "Test Course"
    Then I see the course overview