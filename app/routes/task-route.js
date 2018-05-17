'use strict';

const { Router } = require('express');
const router = Router();

const {
  createTask,
  getAllHouseholdTasks,
  getOneTask,
  createUserTask,
  updateTask,
  getCompletedTasks,
  getLeaderboardData,
  getStatsData
} = require("../controllers/taskCtrl");

router.post('/newtask', createTask);
router.get('/householdtasks', getAllHouseholdTasks);
router.get('/completed', getCompletedTasks);
router.get('/task', getOneTask);
router.post('/usertask', createUserTask);
router.patch('/task', updateTask);
router.get('/leaderboard', getLeaderboardData);
router.get('/stats', getStatsData);

module.exports = router;