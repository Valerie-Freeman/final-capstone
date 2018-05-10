'use strict';

const { Router } = require('express');
const router = Router();

const {
  getUserHouseholds,
  createHousehold
} = require("../controllers/householdCtrl");

router.get("/households", getUserHouseholds);
router.post("/households", createHousehold);

module.exports = router;