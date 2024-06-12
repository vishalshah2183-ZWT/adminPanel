const express = require('express')
const router = express.Router();


const 
    {
        getAllModules,
        createModule,
        deleteModule
    } = require('../controller/modulesController');
const { checkAccess } = require('../middleware/RBAC');

   



   
router.route("/").get(getAllModules).post(checkAccess({module:'Manage Module',action:'create'}),createModule);
router.route("/:id").delete(checkAccess({module:'Manage Module',action:'delete'}),deleteModule);

module.exports = router;