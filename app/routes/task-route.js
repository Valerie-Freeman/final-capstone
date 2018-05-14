'use strict';

const { Router } = require('express');
const router = Router();

const {
  createTask,
  getAllHouseholdTasks,
  getOneTask
} = require("../controllers/taskCtrl");

router.post('/newtask', createTask);
router.get('/householdtasks', getAllHouseholdTasks);
router.get('/task', getOneTask);

module.exports = router;