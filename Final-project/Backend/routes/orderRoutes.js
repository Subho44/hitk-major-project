const express = require('express');
const router = express.Router();

const orderctrl = require("../controller/orderController");

router.post("/place",orderctrl.placeorder);
router.get("/my-orders",orderctrl.getmyorders);



module.exports = router;
