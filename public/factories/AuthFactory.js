'use strict';

angular.module("TaskApp").factory("AuthFactory", ($q, $http) => {
  const authFact = {};
  // let currentUser = JSON.parse(sessionStorage.getItem("currentUser")) || null;

  authFact.createUser = (userObj) => {
    return $q((resolve, reject) => {
      $http.post("/register", userObj)
        .then(({data}) => {
          console.log('you added a new user:', data);
          sessionStorage.setItem('currentUser', JSON.stringify(data));
          console.log('we set current user in factory', JSON.parse(sessionStorage.getItem("currentUser"))); 
          resolve(data);
        });
    }).catch(err => {
      reject(err);
    });
  };

  authFact.loginUser = (userObj) => {
    return $http.post("/login", userObj)
      .then(({data}) => {
        console.log('logged in user:', data); 
        sessionStorage.setItem('currentUser', JSON.stringify(data));
        console.log('we set current user in factory', JSON.parse(sessionStorage.getItem("currentUser"))); 
        return data;
      });
  };

  authFact.logout = () => {
    sessionStorage.removeItem('currentUser');
    return $http.post("/logout");
  };

  authFact.getCurrentUser = () => {
    return JSON.parse(sessionStorage.getItem("currentUser"));
  };

  return authFact;
});