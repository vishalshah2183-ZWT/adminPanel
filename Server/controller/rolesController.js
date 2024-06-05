const asyncHandler = require("express-async-handler")
const db = require('../models')
const UsersModel = db.users
const RolesModel = db.roles
const fs = require('fs');
const { where } = require("sequelize");
const Op = db.Op


//@desc Get all Roles
//@route Get / Roles
//@access public
const getAllRoles = asyncHandler(async (req, res) => {
    
    const roles = await UsersModel.findAll({
        attributes:['role'],
        where: {
            role: { [Op.ne]: 'super_admin' },
        }
    });
    return res.status(200).json(roles)
})


//@desc Post all Roles
//@route Post / Roles
//@access public
const addAllRoles = asyncHandler(async (req, res) => {
    let role = await req?.body?.role
    let module = await JSON.stringify(req?.body?.modules)
    console.log(module)
   /*  const roles = await UsersModel.findAll({
        attributes:['role'],
        where: {
            role: { [Op.ne]: 'super_admin' },
        }
    }); */
    await RolesModel.create({role:role,module:module}) 
    return res.status(200).send("Role added")
})



module.exports = {
    getAllRoles,
    addAllRoles
}