# Phase 8. adding controller modularity   
for this we need to grab all the async callback methods only  
### 1. give mutual endpoint, common prefix in `sever.js` :  
```javascript
// const express = require('express');
import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import ProductRouter from "./routes/product.route.js"

dotenv.config();
const app = express();
const PORT = process.env.PORTNUM || 5000;

app.use(express.json());  // allows us to accept json as payload in req.body

app.use("/api/products", ProductRouter);

app.get("/", (req, res)=>{
    res.send("server is ready to work");
});

app.listen(PORT, ()=>{
    console.log(`started server at: http://localhost:${PORT}`);
    connectDB();
});
```  
### 2. we need to cut all async callbacks of crud methods individually & export them as a function expression:  
`backend`----->`controllers`----->`product.controller.js`  
```javascript
import mongoose from "mongoose";
import Product from "../model/product.model.js";

export const postProdcut = async (req, res)=>{ // removed: api/products
    
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

    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Product Deleted"});
    } catch (error) {
        console.log("Error Deleting Product : ", error.message);
        res.status(404).json({ success : false, message: "product not found"});
    }
    
};
```  


### 3. now pass those experssion names in `product.route.js`:  
```javascript
import express from "express";

import { deleteProduct, getAllProducts, postProdcut, updateProduct } from "../Controllers/product.controller.js";

const router = express.Router();

router.post("/", postProdcut);          // C
router.get("/", getAllProducts);        // R
router.put("/:id", updateProduct);      // U
router.delete("/:id", deleteProduct);   // D

export default router;
```  