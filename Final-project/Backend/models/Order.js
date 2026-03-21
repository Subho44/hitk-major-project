const mongoose = require('mongoose');

const orderschema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        items: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product"

                },
                name:String,
                price:Number,
                quantity:Number
            }
        ],

        totalAmount:{
            type:Number,
            required:true
        },
        status:{
            type:String,
            default:"Placed"
        }
    },
    { timestamps: true }
);
module.exports = mongoose.model("Order-hitk", orderschema);