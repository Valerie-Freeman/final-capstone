'use strict';

angular.module("TaskApp").controller("TaskListCtrl", function($scope, $routeParams, TaskFactory, UserFactory, HouseholdFactory, $location) {
  $scope.message = 'Hey, welcome to the task list of the household you clicked on';
  console.log('Route param', $routeParams.id); 

  UserFactory.getAllUsers()
    .then( ({ data }) => {
      $scope.users = data;
    })
    .catch(error => {
      console.log('ERROR', error); 
    });
  
  TaskFactory.getTasks($routeParams.id)
    .then(({data}) => {
      $scope.taskList = data; 
    })
    .catch(error => {
      console.log('ERROR', error); 
    }) ;
  
  $scope.addHouseholdMember = (memberId) => {
    console.log('What you chose:', memberId); 

    HouseholdFactory.createHouseholdMember({ 
      household_id: $routeParams.id,
      user_id: memberId,
      isAdmin: false
    })
      .then( ({ data }) => {
        console.log('The goods:', data); 
      })
      .catch(error => {
        console.log('error', error); 
      });
  };

  $scope.toTaskForm = () => {
    $location.path(`/newtask/${$routeParams.id}`);
  };
});