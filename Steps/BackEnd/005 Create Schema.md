# Phase 5. Creating DB schema  
`backend`----->`model`----->`product.model.js`  

```javascript
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true }
},{
    timestamps: true // createdAt,updatedAt
})

const Product = mongoose.model("Product", productSchema);
/*
first parameter= Product(uppercase singular name), mongoose will convert it to products(lowercase plural collection)
E.g:
"User" → Collection: users
"Order" → Collection: orders
"Product" → Collection: products
*/
export default Product;
```  