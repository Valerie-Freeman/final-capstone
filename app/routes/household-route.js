'use strict';

const { Router } = require('express');
const router = Router();

const {
  getUserHouseholds,
  createHousehold,
  createHouseholdMember
} = require("../controllers/householdCtrl");

router.get("/households", getUserHouseholds);
router.post("/households", createHousehold);
router.post("/householdmember", createHouseholdMember);

module.exports = router;