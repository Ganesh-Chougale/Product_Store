inside entry point (at our case its `server.js`)  
# Phase 2. we need to import express, we can do this with 2 ways
### 01. using `require` syntax  
```javascript
const express = require('express');
```  
### 02. using `import` syntax (es6 module way)  
`inside package.json`  
```json
// after scripts key object put this
  "type" : "module",
// by default it is "type" : "commonjs" implicitly
```  

# 2. run the first Backend execution  
`server.js`  
```json
// const express = require('express');
import express from 'express';

const app = express();

app.listen(5000, ()=>{
    console.log("started server at port 5000");
})
```  
`Terminal`  
```bash
$ nodemon backend/server.js 
```  
#### Output:  
```vbnet
$ nodemon backend/server.js 
[nodemon] 3.1.7
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,cjs,json
[nodemon] starting `node backend/server.js`
started server at port 5000
┌───────────────────────────────────┐
│ New version of nodemon available! │
│ Current Version: 3.1.7            │
│ Latest Version: 3.1.9             │
└───────────────────────────────────┘
```  

or we can assing custome command in `package.json` to run the project  
``package.json`  
```json
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "nodemon backend/server.js "
    // after adding this we can use : npm run dev
  },
```  
`Terminal`  
```bash
npm run dev
```  
#### Output:  
```vbnet
$ npm run dev

> product-store@1.0.0 dev
> nodemon backend/server.js

[nodemon] 3.1.9
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,cjs,json
[nodemon] starting `node backend/server.js`
started server at port 5000
```  