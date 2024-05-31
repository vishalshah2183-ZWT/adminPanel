const express = require('express');
const { AuthenticateAdmin } = require('../controller/authenticateAdmin');
const router = express.Router();

router.route("/").post(AuthenticateAdmin)

module.exports = router; 