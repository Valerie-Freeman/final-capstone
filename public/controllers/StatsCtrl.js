'use strict';

angular.module("TaskApp").controller("StatsCtrl", function($scope, $routeParams) {
  $scope.test = `This is the stats page of household: ${$routeParams.householdId}`;
});