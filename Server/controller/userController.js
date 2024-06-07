const db = require('../models')
const bcrypt = require('bcrypt');
const UsersModel = db.users
const fs = require('fs');
const { where } = require("sequelize");
const dotenv = require("dotenv").config();
const Op = db.Op
//@desc Create a User
//@route Post /Users
//@access public
const createUser = async (req, res) => {
    const { email, password, role } = await req.body
    console.log(password)
    let emailExists = await UsersModel.findAll({where:{email:email}})
    if(emailExists?.length > 0)
        {
          return res.status(401).json({ message: "Email already Exists" })
        }
    let salt = await bcrypt.genSaltSync(Number(process.env.SALT_ROUNDS));
    let hashedPassword = await bcrypt.hashSync(password, salt);
    await UsersModel.create({ email: email, password: hashedPassword, role: role })
    const users = await UsersModel.findAll({
        attributes: ['email', 'role', 'id'],
        where: {
            role: { [Op.ne]: 'super_admin' },
        },
    });
    res.status(201).json({ users: users, message: "User Created...!!" })
}

//@desc Get Particular User
//@route Get /api/Users/:id
//@access public
const getUser = async (req, res) => {
    let id = await req.params.id
    const user = await UsersModel.findByPk(id, { attributes: ['email', 'role', 'id'] });
    res.status(200).json(user);
}


//@desc Get Particular User
//@route Get /api/Users/:id
//@access public
const getAllUsers = async (req, res) => {
    // const users = await UsersModel.findAll({ attributes: ['email', 'role', 'id'] });
    const users = await UsersModel.findAll({
        attributes: ['email', 'role', 'id'],
        where: {
            role: { [Op.ne]: 'super_admin' },
        },
    });
    console.log(users)
    res.status(200).json(users);
}

//@desc Update User
//@route put /api/Users/:id
//@access public
const updateUser = async (req, res) => {
    const { id, email, role } = await req.body
    await UsersModel.update({ id: id, email: email, role: role },
        { where: { id: id } }
    )

    const users = await UsersModel.findAll({ attributes: ['email', 'role', 'id'],
    where: {
      role: { [Op.ne]: 'super_admin' },
    },
  });
    res.status(200).json({ message: "User Updated Successfully", users: users })
}


//@desc Delete User
//@route Delete /api/Users/:id
//@access public
const deleteUser = async (req, res) => {
    let id = req.params.id
    UsersModel.destroy({
        where: {
            id: id
        }
    })
    const users =await UsersModel.findAll({ attributes: ['email', 'role', 'id'],
    where: {
      role: { [Op.ne]: 'super_admin' },
    },
  });
    return res.status(200).json(users)
}


module.exports = {
    deleteUser,
    updateUser,
    getUser,
    createUser,
    getAllUsers
}