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
    const roles = await RolesModel.findAll({
        attributes:['id','role','module']
    });
    return res.status(200).json(roles)
})

//@desc Get Specific Role
//@route Get / Role
//@access public
const getRole = asyncHandler(async (req, res) => {
    const id = await req.params.id
    const role = await RolesModel.findByPk(id,{
        attributes:['id','role','module']
    });
    return res.status(200).json(role)
})


//@desc Update Role
//@route Put / Roles/:id
//@access public
const updateRole = asyncHandler(async (req, res) => {
    const { id, role } = await req.body;
    const modules = await JSON.stringify(req.body.modules)
    console.log(modules)
    await RolesModel.update({ role: role, module:modules },
        { where: { id: id } }
    )
    const roles = await RolesModel.findAll({
        attributes:['id','role','module']
    });
    return res.status(200).json(roles)
})

//@desc Post all Roles
//@route Post / Roles
//@access public
const addAllRoles = asyncHandler(async (req, res) => {
    let role = await req?.body?.role
    let module = await JSON.stringify(req?.body?.modules)
    let roleExist = await RolesModel.findAll({
        where:{
            role: role
        }
    })
    console.log(roleExist)
    if(roleExist?.length > 0)
        {
            return res.status(201).send("Role Already Exists")
        }

    await RolesModel.create({role:role,module:module}) 
    return res.status(200).send("Role added")
})

//@desc Post all Roles
//@route Post / Roles
//@access public
const deleteRole = asyncHandler(async (req, res) => {
    let id = req.params.id
    RolesModel.destroy({
        where: {
            id: id
        }
    })
    // const roles = await RolesModel.findAll({
    //     attributes:['id','role','module']
    // });
    return res.status(200).send('Role Deleted')
})

module.exports = {
    getAllRoles,
    addAllRoles,
    getRole,
    updateRole,
    deleteRole
}