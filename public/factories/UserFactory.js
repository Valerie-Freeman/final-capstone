'use strict';

angular.module("TaskApp").factory("UserFactory", $http => {
  const userFact = {};

  userFact.getAllUsers = () => {
    console.log('get all users called in angular controller'); 
    return $http.get("/users");
  };

  return userFact;
});