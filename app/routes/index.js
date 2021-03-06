"use strict";

const { Router } = require("express");
const router = Router();

router.use(require("./auth-route"));
router.use(require("./household-route"));
router.use(require("./user-route"));
router.use(require("./task-route"));

module.exports = router;
