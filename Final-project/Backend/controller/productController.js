const Product = require("../models/Product");

//insert

exports.createProduct = async(req,res) => {
    const product = await Product.create(req.body);
    res.status(201).json(product);
};

//view all
exports.allProduct = async(req,res) => {
    const products = await Product.find();
    res.status(201).json(products);
};
//singel view
exports.oneProduct = async(req,res) => {
    const product = await Product.findById(req.params.id);
    res.status(201).json(product);
};
//update
exports.updateProduct = async(req,res) => {
    const product = await Product.findByIdAndUpdate(req.params.id,req.body,{new:true});
    res.status(201).json(product);
};
//delete
exports.deleteProduct = async(req,res) => {
    await Product.findByIdAndDelete (req.params.id);
    res.status(201).json({message:"product deletesuccessfully"});
};