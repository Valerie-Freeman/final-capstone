'use strict';

angular.module("TaskApp").factory("StatFactory", $http => {
  let statFact = {};

  statFact.getLeaderboardData = (householdId) => {
    return $http.get(`/leaderboard?household=${householdId}`);
  };

  statFact.getStatData = (householdId) => {
    return $http.get(`/stats?household=${householdId}`);
  };

  return statFact;
});