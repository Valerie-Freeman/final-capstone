'use strict';

angular.module("TaskApp").controller("NavCtrl", function($scope, $rootScope, AuthFactory, $location) {
  
  $rootScope.checkIfUser = () => {
    if(AuthFactory.getCurrentUser() !== null) {
      $rootScope.user = true; 
    } else {
      $rootScope.user = false; 
    }
  };

  $rootScope.checkIfUser();

  $scope.logout = () => {
    AuthFactory.logout()
      .then(response => {
        $rootScope.checkIfUser();
        $location.path("/");
      })
      .catch(error => {
        console.log('ERROR', error); 
      });
  };

});