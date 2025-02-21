# Phase 1 : Folder Structure & Initialization backend  
Main Dir : `Product Store`  
Sub Dir : `backend`, `frontend`, `Steps.md`  

at Main Dir  
```bash
npm init -y
```  
initializes a new Node.js project with default settings
```bash
npm install express mongoose dotenv
```  
installs three essential dependencies:
1. `Express` – A fast, minimal web framework for Node.js.
2. `Mongoose` – An ODM (Object Data Modeling) library for MongoDB, making database interactions easier.
3. `Dotenv` – Loads environment variables from a .env file, keeping sensitive data (e.g., database URLs) secure.  
`
```bash
touch backend/server.js
```  
create `server.js` at backend folder (BackEnd Entry Point)  
#### Terminal:  
```bash
# we might have nodemon installed on local machine but for sake of server machine we need to install it on server application too
npm i nodemon -d
```  
this will install nodemon add at `package.json` file dependancies section too   
`package.json`:    
```json
  "dependencies": {
    "dotenv": "^16.4.7",
    "express": "^4.21.2",
    "mongoose": "^8.10.0",
    "nodemon": "^3.1.9"
  }
```  