'use strict';

angular.module("TaskApp").factory("HouseholdFactory", $http => {
  const houseFact = {};

  houseFact.getUserHouseholds = () => { 
    return $http.get("/households");
  };

  houseFact.createHousehold = (household) => {
    return $http.post("/households", angular.toJson(household));
  };

  houseFact.createHouseholdMember = (memberData) => {
    return $http.post("/householdmember", angular.toJson(memberData));
  };

  houseFact.getHousehold = (householdId) => {
    return $http.get(`/household?household=${householdId}`);
  };

  return houseFact;
});