const express = require('express');
const router = express.Router();

const tokenBL = require('../models/tokenBL');
router.get("/", tokenBL.refreshToken);

module.exports = router;