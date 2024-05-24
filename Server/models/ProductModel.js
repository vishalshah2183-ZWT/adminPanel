const dbConfig = require('../config/config')
const Model = dbConfig.Model
const sequelize = dbConfig.sequelizeConnection
const DataTypes = dbConfig.DataTypes
const Op = dbConfig.Sequelize.Op;

class ProductModel extends Model {
}

ProductModel.init({
    id:{
        type:DataTypes.INTEGER,
        allowNull:true,
        primaryKey:true,
        autoIncrement:true
    },
    title:{
        type:DataTypes.STRING,
    },
    price:{
        type:DataTypes.FLOAT,    
    },
    description:{
        type:DataTypes.STRING,
    },
    category:{
        type:DataTypes.STRING,    
    },
    image:{
        type:DataTypes.BLOB,
    },
    stock:{
        type:DataTypes.INTEGER,
    },
},{
    sequelize,
    timestamps:false,
    modelName:'products',
})

module.exports = ProductModel