const asyncHandler = require("express-async-handler")
const db = require('../models')
const ProductsModel = db.product
const fs = require('fs');
const { where } = require("sequelize");

const getAllProduct = asyncHandler(async (req, res) => {
    const token = await req.headers.authorization
    const products = await ProductsModel.findAll();
    return res.status(200).json(products)
})


//@desc Create a Product
//@route Post /Products
//@access public
const createProduct = async (req, res) => {
    const token = await req.headers.authorization
    const { title, price, description, category, stock } = req.body;
    const image = `/uploads/products/${req?.file?.filename}`
    await ProductsModel.create({ title: title, image: image, price: price, description: description, category: category, stock: stock })
    const product = await ProductsModel.findAll()
    res.status(201).json({ product: product, message: "Product Created" })
}

//@desc Get Particular Product
//@route Get /api/Products/:id
//@access public
const getProduct = asyncHandler(async (req, res) => {
    const token = await req.headers.authorization
    let id = req.params.id
    const product = await ProductsModel.findByPk(id);
    res.status(200).json(product);
})


//@desc Update Product
//@route put /api/Products/:id
//@access public
const updateProduct = asyncHandler(async (req, res) => {
    const token = await req.headers.authorization
    const { id, title, price, description, category, stock } = req.body;
    const image = `/uploads/products/${req?.file?.filename}` 
    if ( image == '/uploads/products/undefined' ) {
        await ProductsModel.update({ title: title, price: price, description: description, category: category, stock: stock },
            { where: { id: id } }
        )
    }
    else {
        await ProductsModel.update({ title: title, image: image, price: price, description: description, category: category, stock: stock },
            { where: { id: id } }
        )
    }

    const product = await ProductsModel.findAll()
     res.status(200).json({ message: `Product Updated Successfully`, product: product })
})

//@desc Delete Product
//@route Delete /api/Products/:id
//@access public
const deleteProduct = asyncHandler(async (req, res) => {
    const token = await req.headers.authorization
    let id = await req.params.id
    await ProductsModel.destroy({
        where: {
            id: id
        }
    })
    const products = await ProductsModel.findAll();
    return res.status(200).json(products)
})


module.exports = {
    getAllProduct,
    createProduct,
    getProduct,
    updateProduct,
    deleteProduct
}