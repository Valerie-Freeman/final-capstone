'use strict';

angular.module("TaskApp").controller("LoginCtrl", function($scope, $rootScope, AuthFactory, $location) {
  $scope.message = "The Login Page!";
  $scope.user = {};

  $scope.login = () => {
    AuthFactory.loginUser($scope.user)
      .then(user => {
        console.log("the user:", user);
        $rootScope.checkIfUser();
        console.log('user?', $rootScope.user); 
        $location.path("/households");
      });
  };

});