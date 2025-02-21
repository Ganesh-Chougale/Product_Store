# Phase 7. adding router modularity  
`backend`----->`server.js`  
```javascript
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
although this code is perfectly working, but it is too much verbose for a single file, let make it more `modular` & clean  

### 1. Create a `route` package & `product.route.js` file:  
`backend`----->`routes` ----->`product.route.js`  
```javascript
import express from "express";

const router = express.Router();

export default router;
```  

after that we will have all of our endpoints here, 
- cut all CRUD methods from `server.js` & paste it in `product.route.js`  
- rename the method names  
`app.post()`	----->	`router.post()`  
`app.get()`	----->	`router.get()`  
`app.put()`	----->	`router.put()`  
`app.delete()`	----->	`router.delete()`  


`backend`----->`routes` ----->`product.route.js`  
```javascript
import express from "express";

const router = express.Router();

// PostMapping : create a product     (C)
router.post("/api/products", async (req, res)=>{
    
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
router.get("/api/products", async (req, res)=>{
    try {
        const products = await Product.find({});
        res.status(200).json({ success : true, data: products});
    } catch (error) {
        console.log("Error Fetching Products: ", error.message);
        res.status(500).json({ success : false, message: "Server Error"})
    }
});

// PutMapping : Update a product    (U)
router.put("/api/products/:id", async (req, res)=>{
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
router.delete("/api/products/:id", async (req, res)=>{
    const {id} = req.params;

    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Product Deleted"});
    } catch (error) {
        console.log("Error Deleting Product : ", error.message);
        res.status(404).json({ success : false, message: "product not found"});
    }
    
});


export default router;
```  

### 2. make neccessary changes in `server.js`:  
1. import router file into `server.js`  
```json
// import Product from "./model/product.model.js"
// import mongoose from 'mongoose';
import ProductRouter from "./routes/product.route.js"
```  
we can remove Product model & mongoose from `server.js` file  
2. create a commone endpoint in `server.js`  
```javascript
app.use("/api/products", ProductRouter);
```  
#### Full Snippet of `server.js`:  
```javascript
import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import ProductRouter from "./routes/product.route.js" // **

dotenv.config();
const app = express();
const PORT = process.env.PORTNUM || 5000;

app.use(express.json());  // allows us to accept json as payload in req.body

app.use("/api/products", ProductRouter); // created common mutual endpoint **

app.get("/", (req, res)=>{
    res.send("server is ready to work");
});

app.listen(PORT, ()=>{
    console.log(`started server at: http://localhost:${PORT}`);
    connectDB();
});
```  
### 3. now we removed the `mongosee` & `product.model.js` from `server.js` because it no longer needed there, we need to import that into where it needed (`product.route.js`):  
`backend`----->`routes` ----->`product.route.js`  
```javascript
import mongoose from 'mongoose';
import Product from "./model/product.model.js"
```  
### 4. we gave common endpint `("/api/products")` in `server.js` so we can remove them from `product.route.js` CRUD methods:  
```javascript
import express from "express";

import mongoose from 'mongoose';
import Product from "./model/product.model.js"

const router = express.Router();

// PostMapping : create a product     (C)
router.post("/", async (req, res)=>{ // removed: api/products
    
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
router.get("/", async (req, res)=>{ // removed: api/products
    try {
        const products = await Product.find({});
        res.status(200).json({ success : true, data: products});
    } catch (error) {
        console.log("Error Fetching Products: ", error.message);
        res.status(500).json({ success : false, message: "Server Error"})
    }
});

// PutMapping : Update a product    (U)
router.put("/:id", async (req, res)=>{ // removed: /api/products
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
router.delete("/:id", async (req, res)=>{ // removed: /api/products
    const {id} = req.params;

    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Product Deleted"});
    } catch (error) {
        console.log("Error Deleting Product : ", error.message);
        res.status(404).json({ success : false, message: "product not found"});
    }
    
});

export default router;
```  
