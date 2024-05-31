const db = require('../models')
const users = db.users
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
    if(!user)
        {
            return res.status(401).json({error:"User Not Found"})           
        }
        // res.status(200).json({email:userEmail,userPassword:userPassword})
    let  passwordMatch 
        if(user.password == userPassword){
            passwordMatch = true 
        }
    if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid Password' });
        }
    console.log(user)
    const token = await jwt.sign({id: user?.id},process.env.JWTKEY,{ expiresIn: '1h'})
    res.status(200).json({ token:token, User:{email:user?.email,role:user?.password}});
}

module.exports = {
    AuthenticateAdmin
}