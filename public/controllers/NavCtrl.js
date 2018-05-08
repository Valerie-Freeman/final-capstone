'use strict';

angular.module("TaskApp").controller("NavCtrl", function($scope, AuthFactory, $location) {
  
  $scope.logout = () => {
    AuthFactory.logout()
      .then(response => {
        console.log('Response', response); 
        $location.path("/");
      })
      .catch(error => {
        console.log('ERROR', error); 
      });
  };
});