const asyncHandler = require("express-async-handler")
const ProductsModel = require('../models/ProductModel')


//@desc get all Products
//@route Get /api/Products
const getAllProduct = asyncHandler(async (req, res) => {
    const products = await ProductsModel.findAll();
    return res.status(200).json(products)
})


//@desc Create a Product
//@route Post /api/Products
//@access public
const createProduct = asyncHandler(async (req, res) => {
    console.log(req.body)
  /*   const { id, title, price, description, category, image, stock } = req.body;
    if (!title || !price || !description || !category || !image || !stock) {
        res.status(400);
        throw new Error("All fields are Mandatory..!")
    } */
    const {  title, price, description, category, image, stock } = req.body;
    ProductsModel.create({price:price,description:description,category:category,image:image,stock:stock})
    res.status(201).json({ message: "Product Created" })
}
)
//@desc Get Particular Product
//@route Get /api/Products/:id
//@access public
const getProduct = asyncHandler(async (req, res) => {
    let id = req.params.id
    const product = await ProductsModel.findByPk(id);
    res.status(200).json(product);
})


//@desc Update Product
//@route put /api/Products/:id
//@access public
const updateProduct = asyncHandler(async (req, res) => {
   /*  let updatedProduct
    ProductsModel.update(
        req,
        {
            where
        }
    ) */
    res.status(200).json({ message: `Update Product of ${req.params.id}` })
})

//@desc Delete Product
//@route Delete /api/Products/:id
//@access public
const deleteProduct = asyncHandler(async (req, res) => {
    let id = req.params.id
    ProductsModel.destroy({
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