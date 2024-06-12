const db = require('../models')
const UsersModel = db.users
const RolesModel = db.roles
const bcrypt = require('bcrypt');
const router = require("../routes/productRoutes");
const dotenv = require("dotenv").config()
const jwt = require('jsonwebtoken');


//@desc Authenticates Admin
//@route Post /Login
//@access public
const getAccessDetails = async (req, res) => {
    const ID = await jwt.decode(req.headers.authorization,process.env.JWTKEY)?.id 
    let user = await UsersModel.findByPk(ID,{attributes:['role','email']})
    let role = user.role
    let email = user.email
    let accessDetails = await RolesModel.findOne({
        where:{ role : role },
        attributes:['module'],
        })
        accessDetails = await JSON.parse(accessDetails?.module)
        
        res.status(200).json({email:email,accessDetails:accessDetails});
        // res.status(200).json('heyyy')
}   


module.exports = {
    getAccessDetails
}