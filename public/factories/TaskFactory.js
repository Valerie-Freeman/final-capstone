'use srict';

angular.module("TaskApp").factory("TaskFactory", $http => {
  const taskFact = {};

  taskFact.createTask = (task) => {
    return $http.post("/newtask", angular.toJson(task));
  };

  taskFact.getTasks = (householdId) => {
    return $http.get(`/householdtasks?household=${householdId}`);
  };

  taskFact.getOneTask = (taskId) => {
    console.log('Called'); 
    return $http.get(`/task?task=${taskId}`);
  };

  return taskFact;
});