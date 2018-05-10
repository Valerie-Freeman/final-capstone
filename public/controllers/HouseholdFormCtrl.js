'use strict';

angular.module("TaskApp").controller("HouseholdFormCtrl", function($scope, HouseholdFactory, $location) {
  $scope.message = "New Household";
  $scope.household = {};

  $scope.createNewHousehold = () => {
    console.log('The household you entered in controller', $scope.household); 
    HouseholdFactory.createHousehold($scope.household)
      .then(response => {
        console.log('Ok, what happened?', response); 
        $location.path('/households');
      });
  };
});