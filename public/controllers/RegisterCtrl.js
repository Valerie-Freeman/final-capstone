'use strict';

angular.module("TaskApp").controller("RegisterCtrl", function($scope, AuthFactory, $location) {
  $scope.message = "The Register Page!";
  $scope.user = {};

  $scope.register = () => {
    if ($scope.user.password === $scope.user.confirmation) {
      console.log('What are you?', $scope.user); 
      AuthFactory.createUser($scope.user)
        .then(user => {
          console.log('the user:', user); 
          $location.path("/households");
        });
    } else {
      console.log('Bad match'); 
    }
  };
});