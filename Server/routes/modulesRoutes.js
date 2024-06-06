const express = require('express')
const router = express.Router();


const 
    {
        getAllModules,
        createModule,
        deleteModule
    } = require('../controller/modulesController')

   




router.route("/").get(getAllModules).post(createModule);
router.route("/:id").delete(deleteModule);

module.exports = router;