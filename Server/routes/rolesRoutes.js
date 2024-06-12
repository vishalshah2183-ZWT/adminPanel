const express = require('express')
const router = express.Router();



const 
    {
        getAllRoles,
        addAllRoles,
        getRole,
        updateRole,
        deleteRole
    } = require('../controller/rolesController');
const { checkAccess } = require('../middleware/RBAC');

router.route("/").get(getAllRoles).post(checkAccess({module:'Manage Roles',action:'create'}),addAllRoles).put(checkAccess({module:'Manage Roles',action:'update'}),updateRole)
router.route("/:id").get(getRole).delete(checkAccess({module:'Manage Roles',action:'delete'}),deleteRole)
module.exports = router