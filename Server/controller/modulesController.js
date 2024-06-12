const db = require('../models')
const ModulesModel = db.modules
const fs = require('fs');
const { where } = require("sequelize");
const dotenv = require("dotenv").config();
const Op = db.Op





//@desc Get Particular User
//@route Get /api/Users/:id
//@access public
const getAllModules = async (req, res) => {
    const token = await req.headers.authorization
    const modules = await ModulesModel.findAll({
        attributes: ['module','id'],

    });
    res.status(200).json(modules);
}

//@desc Create a Module
//@route Post/api/Users/:id
//@access public
const createModule = async (req, res) => {
    const token = await req.headers.authorization
    const { module } = await req.body
    const moduleExists = await ModulesModel.findAll({
        where:{module:module}
    });

    if(moduleExists?.length > 0)
        {
            return res.status(201).send("Module already Exists")
        }
    await ModulesModel.create({module:module});
    res.status(200).send("Module Added");
}


//@desc Delete a Module
//@route Put/api/Module/:id
//@access public
const deleteModule = async (req, res) => {
    const token = await req.headers.authorization
   let id = await  req.params.id
   await ModulesModel.destroy({
        where:{
            id:id
        }
   })
   /*  const { module } = await req.body
    const moduleExists = await ModulesModel.findAll({
        where:{module:module}
    }); */

    const modules = await ModulesModel.findAll({
        attributes: ['module','id'],
    });
    res.status(200).json(modules);
}

module.exports = {
 getAllModules,
 createModule,
 deleteModule
}