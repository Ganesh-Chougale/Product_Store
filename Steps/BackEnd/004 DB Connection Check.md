# Phase 4. Connect a DB to our Backend  
`Main Dir`  
----->`backend`  
----->`backend`----->`config`  
----->`backend`----->`config`----->`db.js`  

`db.js`  
```javascript
import mongoose from 'mongoose';

export const connectDB = async ()=>{

    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1); // Precess code 1 means exit with failure, ) means success
    }

}
```  

`server.js`  
```javascript
// const express = require('express');
import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

dotenv.config();
const app = express();
const PORT = 5000;

app.get("/", (req, res)=>{
    res.send("server is ready to work");
});

app.get("/products", (req, res)=>{
    // no DB yet
})

app.listen(PORT, ()=>{
    console.log(`started server at: http://localhost:${PORT}`);
    connectDB();
});
```  

#### Output:  
```vbnet
[nodemon] restarting due to changes...
[nodemon] starting `node backend/server.js`
started server at: http://localhost:5000
MongoDB Connected: cluster0-shard-00-02.i3awz.mongodb.net
```  