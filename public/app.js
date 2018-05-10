"use strict";

// Define application here
angular.module("TaskApp", ["ngRoute"]).config($routeProvider => {
  $routeProvider
    .when('/', {
      templateUrl: "partials/welcome.html",
      controller: "WelcomeCtrl"
    })
    .when('/register', {
      templateUrl: "partials/register.html",
      controller: "RegisterCtrl"
    })
    .when('/login', {
      templateUrl: "partials/login.html",
      controller: "LoginCtrl"
    })
    .when('/households', {
      templateUrl: "partials/households.html",
      controller: "HouseholdsCtrl"
    })
    .when('/newhousehold', {
      templateUrl: "partials/householdForm.html",
      controller: "HouseholdFormCtrl"
    })
    .otherwise('/');
});