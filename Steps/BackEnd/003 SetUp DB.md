# Phase 3. Setup a DB in mongoose  
### Server.js  
```javascript
app.get("/products", (req, res)=>{
    // no DB yet
});
```  
we want to handle this urlMapping but we dont have the URL yet.  
URL: `https://www.mongodb.com/`  

create account & create totally free cluster (may 512mb), after that you will get a password, copy to use that password later  
`Connect to your application` -> `Drivers`  
& create.  
copy the connection string  something like this:  
`mongodb+srv://gchougale32:<db_password>@cluster0.i3awz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

now create a `.env` file in `Main Dir`  
#### Terminal:  
```bash
touch .env
```  
#### Output:  
```vbnet
RaSkull@DESKTOP-R5QKH67 MINGW64 ~/Videos/Mern/Only-Projects/MERN/Product Store (main)
$ touch .env
```  

& paste the connecion string inside it.  
but you need to do two things  
1. replace this part `<db_password>` with your password  
2. give the database name between `i3awz.mongodb.net/` & `?retryWrites=true`
`.env`  
```env
MONGO_URL = mongodb+srv://gchougale32:17x05zRkhPLRZoqH@cluster0.i3awz.mongodb.net/products?retryWrites=true&w=majority&appName=Cluster0
```  

we are done here but we can do one more thing
on webpage under `Network Access` we can see our Ip address in active status.  
we need to click `ADD IP ADDRESS` then click on `ALLOW ACCESS FROM ANYWHERE` which will give us `0.0.0.0/0` as default then confirm.  

we are all done  

now check the connection

`Server.js`  
```javascript
// previous code...
console.log(process.env.MONGO_URL);
```  
#### Output:  
```vbnet
undefined
started server at: http://localhost:5000
```  
it gives us undefined, because of security concern, we need to import dotenv for that  
```javascript
import dotenv from 'dotenv';
dotenv.config();
console.log(process.env.MONGO_URL);
```  
#### Output:  
```vbnet
mongodb+srv://gchougale32:17x05zRkhPLRZoqH@cluster0.i3awz.mongodb.net/products?retryWrites=true&w=majority&appName=Cluster0
started server at: http://localhost:5000
```  