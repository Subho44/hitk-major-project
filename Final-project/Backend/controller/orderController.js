const Order = require("../models/Order");

exports.placeorder = async (req,res)=>{
    try {
        const {items,totalAmount} = req.body;
        if(!items || items.length === 0) {
            return res.status(400).json({message:"cart is empty"});
        }

        const order = await Order.create({
            userId:req.user.userId,
            items,
            totalAmount
        });
        res.status(201).json({
            message:"order placed successfully",
            order
        });
    } catch(err) {
        console.error(err);
    }
};
//myall orders
exports.getmyorders = async (req,res)=>{
    try {
       

        const orders = await Order.find({
            userId:req.user.userId
        });
        res.status(200).json(orders);
    } catch(err) {
        console.error(err);
    }
};