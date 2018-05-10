'use strict';

angular.module("TaskApp").controller("HouseholdsCtrl", function($scope, HouseholdFactory, $location) {
  $scope.message = "A list of all your households";
  
  HouseholdFactory.getUserHouseholds()
    .then(response => {
      console.log('This is what we get in the .then in the ng controller', response.data); 
      $scope.userHouseholds = response.data;
    })
    .catch(error => {
      console.log('ERROR brodcasted in ng controller', error); 
    });

  $scope.addNewHousehold = () => {
    $location.path('/newhousehold');
  };

});