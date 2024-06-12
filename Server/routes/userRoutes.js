const express = require('express')
const router = express.Router();



const 
    {
        deleteUser,
        updateUser,
        getUser,
        createUser,
        getAllUsers
    } = require('../controller/userController');
const { checkAccess } = require('../middleware/RBAC');

router.route("/").get(getAllUsers).post(checkAccess({module:'Add Users',action:'create'}),createUser).put(checkAccess({module:'Add Users',action:'update'}),updateUser)
router.route("/:id").get(getUser).delete(checkAccess({module:'Add Users',action:'update'}),deleteUser)


module.exports = router