const express = require('express')
const router = express.Router();



const 
    {
        deleteUser,
        updateUser,
        getUser,
        createUser,
        getAllUsers
    } = require('../controller/userController')

router.route("/").get(getAllUsers).post(createUser).put(updateUser)
router.route("/:id").get(getUser).delete(deleteUser)


module.exports = router