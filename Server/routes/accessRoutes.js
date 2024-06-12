const express = require('express');
const { getAccessDetails } = require('../controller/access');
const router = express.Router();

router.route("/").get(getAccessDetails)

module.exports = router; 