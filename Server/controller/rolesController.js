const asyncHandler = require("express-async-handler")
const db = require('../models')
const UsersModel = db.users
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



module.exports = {
    getAllRoles
}