const express = require('express')
const router = express.Router();



const 
    {
        getAllRoles,
        addAllRoles,
        getRole,
        updateRole,
        deleteRole
    } = require('../controller/rolesController')

router.route("/").get(getAllRoles).post(addAllRoles).put(updateRole)
router.route("/:id").get(getRole).delete(deleteRole)
module.exports = router