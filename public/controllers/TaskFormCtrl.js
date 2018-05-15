'use strict';

angular.module("TaskApp").controller("TaskFormCtrl", function($scope, $location, $routeParams, TaskFactory) {
  $scope.message = "Create a new task";

  $scope.task = {
    is_new: true,
    household_id: $routeParams.householdId
  };

  $scope.test = () => {
    console.log('What?', $scope.task.repeat ); 
  };

  $scope.createNewTask = () => { 
    console.log('The task', $scope.task); 

    TaskFactory.createTask($scope.task)
      .then( ({ data }) => {
        console.log('YO', data); 
        $location.path(`/households/${$routeParams.householdId}`);
      })
      .catch(error => {
        console.log('error', error); 
      });

  };
});