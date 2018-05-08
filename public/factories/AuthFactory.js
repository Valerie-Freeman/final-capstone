'use strict';

angular.module("TaskApp").factory("AuthFactory", ($q, $http) => {
  let authFact = {};

  authFact.createUser = (userObj) => {
    return $q((resolve, reject) => {
      $http.post("/register", userObj)
        .then(user => {
          console.log('you added a new user:', user);
          resolve(user.data);
        });
    }).catch(err => {
      reject(err);
    });
  };

  authFact.loginUser = (userObj) => {
    return $http.post("/login", userObj)
      .then(user => {
        console.log('logged in user:', user); 
        return user.data;
      });
  };

  authFact.logout = () => {
    return $http.post("/logout");
  };

  return authFact;
});