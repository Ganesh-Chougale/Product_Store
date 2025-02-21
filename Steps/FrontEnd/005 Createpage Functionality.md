# phase 5. impletmenting CreatePage UI & functionality      
`frontend` -----> `src`-----> `pages` -----> `CreatePage.jsx`  

## `Note`: we need to use Global State for the fields, so that it has centrelized value, & donot need to re-render every traversing component each time when value changes  
### 1. Creating global state:  
for that we need a dependancy call `zustand`  
#### Terminal:  
```bash
npm i zustand
```   
`frontend` -----> `src`-----> `store` -----> `product.jsx`  
```javascript
import { create } from "zustand";

export const useProductStore = create((set)=>({
    products: [],
    setProducts: (products) => set({products}),
    createProduct: async (newProduct) => {
        if(!newProduct.name || !newProduct.price || !newProduct.image){
            return { seccess: false, message: "please fill all inputs"}
        }
        const res = await fetch("/api/products", {
            method: "POST",
            header: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newProduct)
        })
        const frontEndData = await res.json();
        set((state)=>({products: [...state.products, frontEndData.data]})) 
        // frontEndData.data(this .data is from backend product.controller.js -> postProdcut function(data: newProduct))
    } 
}))
```  
here at this line
```javascript
        const res = await fetch("/api/products", {})
```  
we can pass the hardcode end point api link like this `http://localhost:5000/api/products`, but since the first part `http://localhost:5000` is common for all of the link we can store it as prefix in  
`frontend` -----> `vite.config.js`  
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: false
      }
    }
  }
})
```  
which means any time we pass `"/api"` in fetch parameter, it will use `"/api"` as prefix & auto complete it with `"http://localhost:5000/api"`, so this way we are passing the initial mutual part of the end point url commonly  
