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
    // const users = await UsersModel.findAll({ attributes: ['email', 'role', 'id'] });
    const modules = await ModulesModel.findAll({
        attributes: ['module'],

    });
    res.status(200).json(modules);
}


module.exports = {
 getAllModules
}