'use strict';

angular.module("TaskApp").controller("StatsCtrl", function($scope, $routeParams, StatFactory) {
  $scope.test = `This is the stats page of household: ${$routeParams.householdId}`;

  StatFactory.getStatData($routeParams.householdId)
    .then( ({data}) => {
      $scope.statData = data;
      console.log('data', data); 
    })
    .catch(error => {
      console.log('Error', error); 
    });

  $(document).ready(function(){
    $('.collapsible').collapsible();
  });
        
});