# Phase 6. CRUD operation Implementation  
`backend`----->`server.js`  
```json
// const express = require('express');
import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import Product from "./model/product.model.js"
import mongoose from 'mongoose';

dotenv.config();
const app = express();
const PORT = process.env.PORTNUM || 5000;

app.use(express.json());  // allows us to accept json as payload in req.body

app.get("/", (req, res)=>{
    res.send("server is ready to work");
});

app.listen(PORT, ()=>{
    console.log(`started server at: http://localhost:${PORT}`);
    connectDB();
});

// PostMapping : create a product     (C)
app.post("/api/products", async (req, res)=>{
    
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

});

// GetMapping : get all product  (R)
app.get("/api/products", async (req, res)=>{
    try {
        const products = await Product.find({});
        res.status(200).json({ success : true, data: products});
    } catch (error) {
        console.log("Error Fetching Products: ", error.message);
        res.status(500).json({ success : false, message: "Server Error"})
    }
});

// PutMapping : Update a product    (U)
app.put("/api/products/:id", async (req, res)=>{
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
});

// DeleteMapping : delete a product   (D)
app.delete("/api/products/:id", async (req, res)=>{
    const {id} = req.params;

    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Product Deleted"});
    } catch (error) {
        console.log("Error Deleting Product : ", error.message);
        res.status(404).json({ success : false, message: "product not found"});
    }
    
});
```  
1. `create a product payload:`  
```json
// POST url: http://localhost:5000/api/products
{
    "name" : "Laptop",
    "price" : 32000,
    "image" : "Laptop.jpg"
}
```  
2. `get all products:`  
```json
// GET url: http://localhost:5000/api/products
```  
3. `update a product payload:`  
```json
// PUT url: http://localhost:5000/api/products/{id}
{
    "price" : 899
}
```    
OR
```json
{
    "name" : "Dumbell",
    "price" : 899,
    "image" : "Dumbell.jpg"
}
```    
4. `delete a product`  
```json
// DELETE url : http://localhost:5000/api/products/{id}
```  