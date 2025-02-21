we have server on: `localhost:5000`   
& have react app on: `localhost:5173`  

our endgoal is to merge both into single port like eg. at `localhost:5000`  
## 1. configure `server.js`:  
`Main`----->`backend`----->`server.js`  
### snippet:  
```javascript
import path from "path";
```  
### snippet:  
```javascript
const __dirname = path.resolve();
```  
when we run build command for frontend, it creates a `dist` folder  
### snippet:  
```javascript
if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "/Product_Store/frontend/dist")));
    
    app.get("*", (req, res)=>{
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
    })
}
```  
## 2. Build a custome script for build:  
`Main`----->`package.json`  
inside `"scripts":` key object  
```json
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "cross-env NODE_ENV=development nodemon backend/server.js",
    "build": "npm install && npm install --prefix frontend && npm run build --prefix frontend",
    "start": "cross-env NODE_ENV=production node backend/server.js"
  },
```  
## 3. install `cross-env:  
we need to install `cross-env  
#### Terminal:  
```bash
npm install --save-dev cross-env
```  
## 4. run build command:  
#### Terminal:  
```bash
npm run build
```  
## 5. run start command:  
```bash
npm run start
```  