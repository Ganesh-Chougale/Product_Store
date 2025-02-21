import mongoose from "mongoose";
import Product from "../model/product.model.js";

export const postProduct = async (req, res)=>{ // removed: api/products
    
    const product  = req.body; // payload

    if(!product.name || !product.price || !product.image){
        return res.status(404).json({success: false, message: "provide all fields"});
    }

    const newProduct = new Product(product);

    try {
        await newProduct.save();
        res.status(201).json({success : true, data: newProduct})
    } catch (error) {
        console.log("Error in creating product: ", error.message);
        res.status(500).json({success : false, message: "Server Error"});
    }

};

export const getAllProducts = async (req, res)=>{ // removed: api/products
    try {
        const products = await Product.find({});
        res.status(200).json({ success : true, data: products});
    } catch (error) {
        console.log("Error Fetching Products: ", error.message);
        res.status(500).json({ success : false, message: "Server Error"})
    }
};

export const updateProduct = async (req, res)=>{ // removed: /api/products
    // Put: to update all fields, Patch: to update a certain field
    const {id} = req.params;
    const product = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        console.log("Error Updating Product : ", error.message);
        return res.status(404).json({ success : false, message : "Product Not Found"});
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new: true}); 
        // those 2nd & 3rd parameter gives updated data
        res.status(200).json({ success : true, data : updatedProduct});
    } catch (error) {
        console.log("Error Updating Product: ", error.message);
        res.status(505).json({ success : true, message: "Server Error"})
    }
};

export const deleteProduct = async (req, res)=>{ // removed: /api/products
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        console.log("Error Updating Product : ", error.message);
        return res.status(404).json({ success : false, message : "Product Not Found"});
    }
    
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Product Deleted"});
    } catch (error) {
        console.log("Error Deleting Product : ", error.message);
        res.status(500).json({ success : false, message: "Server Error"});
    }
    
};