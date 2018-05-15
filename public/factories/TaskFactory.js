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
    return $http.get(`/task?task=${taskId}`);
  };

  taskFact.completeTask = (taskId) => {
    console.log('factory called, what we got:', taskId); 
    return $http.post('/usertask', angular.toJson({taskId}));
  };

  taskFact.updateTask = (taskId, bool) => {
    console.log('factory called, what we got:', taskId, bool); 
    return $http.patch('task', angular.toJson({ taskId, bool }));
  };

  taskFact.getCompleted = (householdId) => {
    return $http.get(`/completed?household=${householdId}`);
  };

  return taskFact;
});