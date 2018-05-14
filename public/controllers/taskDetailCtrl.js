'use strict';

angular.module("TaskApp").controller("TaskDetailCtrl", function($scope, $routeParams, $location, TaskFactory) {
  
  TaskFactory.getOneTask($routeParams.id)
    .then( ({data}) => {
      console.log('TASK DATA', data); 
      $scope.task = data;
    })
    .catch(error => {
      console.log('ERROR', error); 
    });

  $scope.complete = (taskId) => {
    // TaskFactory.completeTask(taskId)
    console.log('The task id', taskId); 
    $location.path(`households/${$scope.task.household_id}`);
  };
});