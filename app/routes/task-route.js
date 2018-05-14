'use strict';

const { Router } = require('express');
const router = Router();

const {
  createTask,
  getAllHouseholdTasks,
  getOneTask,
  createUserTask
} = require("../controllers/taskCtrl");

router.post('/newtask', createTask);
router.get('/householdtasks', getAllHouseholdTasks);
router.get('/task', getOneTask);
router.post('/usertask', createUserTask);

module.exports = router;