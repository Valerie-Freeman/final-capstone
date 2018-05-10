'use strict';

angular.module("TaskApp").factory("HouseholdFactory", $http => {
  const houseFact = {};

  houseFact.getUserHouseholds = () => {
    console.log('getUserHouseholds called in factory'); 
    return $http.get("/households");
  };

  houseFact.createHousehold = (household) => {
    console.log('createHousehold called, new household:', household);
    console.log('JSON', angular.toJson(household) );  
    return $http.post("/households", angular.toJson(household));
  };

  return houseFact;
});