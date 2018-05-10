'use strict';

angular.module("TaskApp").controller("TaskListCtrl", function($scope, $routeParams) {
  $scope.message = 'Hey, welcome to the task list of the household you clicked on';
  console.log('Route param', $routeParams.id); 
});