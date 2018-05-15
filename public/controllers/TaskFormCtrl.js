'use strict';

angular.module("TaskApp").controller("TaskFormCtrl", function($scope, $location, $routeParams, TaskFactory) {

  $scope.task = {
    is_new: true,
    household_id: $routeParams.householdId
  };

  TaskFactory.getCompleted($routeParams.householdId)
    .then( ({data}) => {
      console.log('Final result!', data); 
      $scope.completedTasks = data;
      console.log($scope.completedTasks ); 
    })
    .catch(error => {
      console.log('error', error); 
    });

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

  $scope.makeNew = () => {
    console.log('The task you chose', $scope.taskId); 

    TaskFactory.updateTask($scope.taskId, true)
      .then( () => {
        $location.path(`/households/${$routeParams.householdId}`);
      })
      .catch(error => {
        console.log('error', error); 
      });
  };


});