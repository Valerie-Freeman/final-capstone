'use strict';

const { Router } = require('express');
const router = Router();

const {
  createTask,
  getAllHouseholdTasks
} = require("../controllers/taskCtrl");

router.post('/tasks', createTask);
router.get('/tasks', getAllHouseholdTasks);

module.exports = router;