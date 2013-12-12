Feature: Browsing & Creating Courses

#  Scenario: Quick view of courses, none available
#    Given I am logged in as "nocourses"
#    When I go to the "User Dashboard"
#    And I have no courses available
#    Then I see "You have no courses"

  Scenario: Adding a new course
    Given I am logged in as "admin"
    When I go to the "User Dashboard"
    And I click "Add new course"
    And I enter a name of "Test Course"
    Then the course appears in my course listing