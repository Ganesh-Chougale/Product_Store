// const express = require('express');
import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import ProductRouter from "./routes/product.route.js"
import path from "path";

dotenv.config();
const app = express();
const PORT = process.env.PORTNUM || 5000;

const __dirname = path.resolve();

app.use(express.json());  // allows us to accept json as payload in req.body

app.use("/api/products", ProductRouter);

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "frontend/dist")));
    
    app.get("*", (req, res)=>{
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
    })
}

app.get("/", (req, res)=>{
    res.send("server is ready to work");
});

app.listen(PORT, ()=>{
    console.log(`started server at: http://localhost:${PORT}`);
    connectDB();
});

