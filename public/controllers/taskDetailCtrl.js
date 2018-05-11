'use strict';

angular.module("TaskApp").controller("TaskDetailCtrl", function($scope, $routeParams) {
  $scope.message = `This is the view of task with id: ${$routeParams.id}`;
});