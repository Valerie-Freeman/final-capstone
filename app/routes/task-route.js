'use strict';

const { Router } = require('express');
const router = Router();

const {
  createTask
} = require("../controllers/taskCtrl");

router.post('/tasks', createTask);

module.exports = router;