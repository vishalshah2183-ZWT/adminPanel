const express = require('express')
const router = express.Router();
const {
  checkAccess
} = require("../middleware/RBAC")

const 
    {
        getAllProduct,
        createProduct,
        getProduct,
        updateProduct,
        deleteProduct
    } = require('../controller/productController')

    const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/products");
  },
  filename: function (req, file, cb) {
    const uniquePrefix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniquePrefix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });



// router.route("/").get(getAllProduct).post((upload.single('image')),createProduct).put((upload.single('image')),updateProduct);
router.route("/").get(getAllProduct).post(checkAccess({module:'All Products',action:'create'}),(upload.single('image')),createProduct).put(checkAccess({module:'All Products',action:'update'}),(upload.single('image')),updateProduct);
router.route("/:id").get(getProduct).delete(checkAccess({module:'All Products',action:'delete'}),deleteProduct)

module.exports = router;