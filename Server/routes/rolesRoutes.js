const express = require('express')
const router = express.Router();



const 
    {
        getAllRoles,
        addAllRoles
    } = require('../controller/rolesController')

router.route("/").get(getAllRoles).post(addAllRoles)


module.exports = router