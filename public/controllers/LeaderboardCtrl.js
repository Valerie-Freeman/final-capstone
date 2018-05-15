'use strict';

angular.module("TaskApp").controller("LeaderboardCtrl", function($scope, $routeParams, StatFactory) {
  $scope.test = `this is the leaderboard page of household: ${$routeParams.householdId}`;

  StatFactory.getLeaderboardData($routeParams.householdId)
    .then(({data}) => { 
      $scope.leaderboardData = data;
      console.log('The data', $scope.leaderboardData); 
    })
    .catch(error => {
      console.log('error', error); 
    });
});