'use strict';

angular.module("TaskApp").controller("HouseholdFormCtrl", function($scope, HouseholdFactory, $location) {
  $scope.message = "New Household";
  $scope.household = {};

  $scope.createNewHousehold = () => { 
    HouseholdFactory.createHousehold($scope.household)
      .then( ({ data }) => {
        console.log('HERE IT IS!!!!!!!', data);
        return HouseholdFactory.createHouseholdMember({ household_id: data.id });
      })
      .then( ({ data }) => {
        console.log('YO', data); 
        $location.path('/households');
      })
      .catch(error => {
        console.log('error', error); 
      });
  };

  $scope.toHouseholdList = () => {
    $location.path('/households');
  };
});
  