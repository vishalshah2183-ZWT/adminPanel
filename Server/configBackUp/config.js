const { Sequelize, Model, DataTypes } = require('sequelize')
require('dotenv').config()


let dbConfig = {
  db_name: process.env.DATABASE,
  db_user: process.env.USER,
  db_pass: process.env.PASSWORD,
  db_dialect: process.env.DIALECT,
  db_host: process.env.HOST,
}


const sequelizeConnection = new Sequelize(dbConfig.db_name,dbConfig.db_user,dbConfig.db_pass,{
  host: dbConfig.db_host,
  dialect: dbConfig.db_dialect
})

sequelizeConnection.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });



const connection = {}

connection.Sequelize = Sequelize
connection.Model = Model
connection.DataTypes = DataTypes
connection.sequelizeConnection = sequelizeConnection

module.exports = connection