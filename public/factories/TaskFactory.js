'use srict';

angular.module("TaskApp").factory("TaskFactory", $http => {
  const taskFact = {};

  taskFact.createTask = (task) => {
    return $http.post("/tasks", angular.toJson(task));
  };

  taskFact.getTasks = (householdId) => {
    return $http.get(`/tasks?household=${householdId}`);
  };

  return taskFact;
});