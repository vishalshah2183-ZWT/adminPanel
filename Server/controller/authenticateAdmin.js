const db = require('../models')
const users = db.users
const roles = db.roles
const bcrypt = require('bcrypt');
const router = require("../routes/productRoutes");
const dotenv = require("dotenv").config()
const jwt = require('jsonwebtoken');


//@desc Authenticates Admin
//@route Post /Login
//@access public
const AuthenticateAdmin = async (req, res) => {
    const { userEmail, userPassword } = req.body;   
  
    const user = await users?.findOne({
        where: {
            email: userEmail,
        },
    });
    // console.log(user)
    if(!user)
        {
            return res.status(401).json({error:"User Not Found"})           
        }
        // res.status(200).json({email:userEmail,userPassword:userPassword})
    let  passwordMatch 
        if(user.password == userPassword || bcrypt.hashSync(userPassword, user.password)){
            passwordMatch = true 
        }
    if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid Password' });
        }
    
    const token = await jwt.sign({id: user?.id},process.env.JWTKEY,{ expiresIn: '1h'})
    AccessDetails = await roles.findOne({
        where:{ role:user?.role }
    })

    // res.status(200).json({ token:token, email:user?.email,role:user?.role , access:JSON.parse(AccessDetails?.module )});
    res.status(200).json({ token:token, email:user?.email,role:user?.role , access:JSON.parse(AccessDetails?.module )});
}

module.exports = {
    AuthenticateAdmin
}