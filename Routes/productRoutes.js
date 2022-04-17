const express = require("express");
const router = express.Router();
var multer = require('multer');
const productController = require("../controller/productController");
const authMiddleware = require("../middleware/authMiddleware");

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '_' + file.originalname)
    }
})


var upload = multer({ storage: storage })

router.route("/").get(authMiddleware.protect, productController.allProduct).post(authMiddleware.protect, upload.single('productImage'), productController.addProduct).delete(authMiddleware.protect, productController.deleteProduct).put(authMiddleware.protect, upload.single('productImage'), productController.updateProduct)
router.post("/qrId", authMiddleware.protect, productController.findProduct)
router.get("/:id", authMiddleware.protect, productController.findProductById);

const productRoutes = router;
module.exports = productRoutes;
