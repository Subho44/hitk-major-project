const express = require('express');
const router = express.Router();

const pctrl = require("../controller/productController");

router.post("/add",pctrl.createProduct);
router.get("/",pctrl.allProduct);
router.get("/:id",pctrl.oneProduct);
router.put("/:id",pctrl.updateProduct);
router.delete("/:id",pctrl.deleteProduct);


module.exports = router;
