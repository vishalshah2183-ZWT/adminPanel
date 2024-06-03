const express = require('express')
const router = express.Router();



const 
    {
        getAllRoles,
    } = require('../controller/rolesController')

router.route("/").get(getAllRoles)


module.exports = router