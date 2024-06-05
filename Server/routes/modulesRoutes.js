const express = require('express')
const router = express.Router();


const 
    {
        getAllModules
    } = require('../controller/modulesController')

   




router.route("/").get(getAllModules);
module.exports = router;