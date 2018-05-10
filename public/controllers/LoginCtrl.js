'use strict';

angular.module("TaskApp").controller("LoginCtrl", function($scope, AuthFactory, $location) {
  $scope.message = "The Login Page!";
  $scope.user = {};

  $scope.login = () => {
    AuthFactory.loginUser($scope.user)
      .then(user => {
        console.log("the user:", user);
        $location.path("/households");
      });
  };
});