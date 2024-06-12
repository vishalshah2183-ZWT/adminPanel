const jwt = require('jsonwebtoken');
const db = require('../models')
const RolesModel = db.roles
const UsersModel = db.users
const dotenv = require("dotenv").config()
// console.log(process.env.JWTKEY)
const checkAccess = (access) =>{
    return async(req,res,next) => {
        const ID = await jwt.decode(req.headers.authorization,process.env.JWTKEY)?.id 
        let role = await UsersModel.findByPk(ID,{attributes:['role']})
        let accessDetails = await RolesModel.findOne({
            where:{ role : role.role },
            attributes:['module'],
        })
        accessDetails = await JSON.parse(accessDetails?.module)
        if(accessDetails?.find((item)=>Object.keys(item)[0] == access?.module)?.[access?.module]?.[access?.action])
            {
                await next()
            }
        else{
            return res.status(403).send("Access Denied")
        }
    }
}

module.exports = {
    checkAccess
}