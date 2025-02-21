# File Strustcure
## Entire Project Structure:  
`Main Dir`  
----->`backend`  
----->`frontend`  
----->`node_modules`  
----->`Steps`  
----->`.env`  
----->`package-lock.json`  
----->`package.json`  

### Backend Project Structure:  
`backend`  
----->`server.js`

`backend`  
----->`config`  
----->`config`----->`db.js`  

`backend`  
----->`model`  
----->`model`----->`product.model.js`  

`backend`  
----->`routes`  
----->`routes`----->`product.route.js`  

`backend`  
----->`controllers`  
----->`controllers`----->`product.controller.js`  

### Frontend Project Structure:  
`frontend`  
----->`src`  
----->`.gitignore`    
----->`eslint.config.js`    
----->`index.html`    
----->`package-lock.jsons`    
----->`package.jsons`    
----->`README.md`    
----->`vite.config.js`    

`frontend`  
----->`src`----->`App.jsx`  
----->`src`----->`main.jsx`  

`frontend`  
----->`src`----->`components`  
----->`src`----->`components`----->`Navbar.jsx`  

`frontend`  
----->`src`----->`pages`  
----->`src`----->`pages`----->`CreatePage.jsx`  
----->`src`----->`pages`----->`HomePage.jsx`  

# Dependancies  
### 1. node_Modules:  
```bash
npm install
```  
### 2. Chakra UI V2:  
```bash
npm i @chakra-ui/react@v2.10.3 @emotion/react @emotion/styled framer-motion
```  
### 3. React Icons:  
```bash
npm i react-icons
```  
### 4. To maintain global state:  
```bash
npm i zustand
```  