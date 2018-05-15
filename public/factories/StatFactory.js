'use strict';

angular.module("TaskApp").factory("StatFactory", $http => {
  let statFact = {};

  statFact.getLeaderboardData = (householdId) => {
    return $http.get(`/leaderboard?household=${householdId}`);
  };

  return statFact;
});