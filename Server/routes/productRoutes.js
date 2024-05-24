const express = require('express')
const router = express.Router();


const 
    {
        getAllProduct,
        createProduct,
        getProduct,
        updateProduct,
        deleteProduct
    } = require('../controller/productController')

router.route("/").get(getAllProduct).post(createProduct);
router.route("/:id").get(getProduct).put(updateProduct).delete(deleteProduct)

module.exports = router;