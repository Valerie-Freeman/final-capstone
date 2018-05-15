'use strict';

const { Router } = require('express');
const router = Router();

const {
  createTask,
  getAllHouseholdTasks,
  getOneTask,
  createUserTask,
  updateTask
} = require("../controllers/taskCtrl");

router.post('/newtask', createTask);
router.get('/householdtasks', getAllHouseholdTasks);
router.get('/task', getOneTask);
router.post('/usertask', createUserTask);
router.patch('/task', updateTask);

module.exports = router;