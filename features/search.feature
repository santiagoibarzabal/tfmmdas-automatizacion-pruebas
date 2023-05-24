Feature: Search

  Scenario: Initial Search
    Given Access to the home page
    When Searching a flight from "Barcelona"
    And Searching a flight to "Madrid"
    And Selecting type "Ida"
    And Searching with date of departure "24" of "JUNIO"
    Then An available flight is returned
