'use strict';

angular.module("TaskApp").controller("StatsCtrl", function($scope, $routeParams, StatFactory) {
  $scope.test = `This is the stats page of household: ${$routeParams.householdId}`;

  StatFactory.getStatData($routeParams.householdId)
    .then( ({data}) => {
      console.log('data', data); 
    })
    .catch(error => {
      console.log('Error', error); 
    });

});