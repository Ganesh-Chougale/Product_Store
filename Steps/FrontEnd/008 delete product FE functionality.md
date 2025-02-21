# phase 8. impletmenting delete product frontend functionality      
### 1. create deleteProduct function in `product.js` (global storage):  
`src`----->`store`----->`product.js`  
#### snippet:  
```javascript
    // Delete Products
    deleteProduct: async (pid) => {
        const res = await fetch(`/api/products/${pid}`, { method: "DELETE"}); // used backticks in endpoint instead of double or single quotes 
        const data = await res.json(); 

        if(!data.success) return { seccess: false, message: data.message }

        // updates the UI realtime, without a page refresh:
        set(state => ({ products: state.products.filter(products => products._id !== pid) }))

        return { success: true, message: data.message }
    }
```  
#### Entire snippet:  
```javascript
import { data } from "react-router-dom";
import { create } from "zustand";

export const useProductStore = create((set)=>({
    products: [],
    // POST product
    setProducts: (products) => set({products}),
    createProduct: async (newProduct) => {
        if(!newProduct.name || !newProduct.price || !newProduct.image){
            return { seccess: false, message: "please fill all inputs"}
        }
        const res = await fetch("/api/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newProduct)
        })
        const frontEndData = await res.json();
        set((state)=>({products: [...state.products, frontEndData.data]})) 
        // frontEndData.data(this .data is from backend product.controller.js -> postProdcut function(data: newProduct))
        return { success: true, message: "product created successfully"}

    },
    // Get products
    fetchProducts: async ()=>{
        const res = await fetch("/api/products");
        const data = await res.json();
        set({ products: data.data})
        console.log(data.data);
    },
    // Delete Products
    deleteProduct: async (pid)=>{
        const res = await fetch("/api/products/${pid}", { method: "DELETE"});
        const data = await res.json();

        if(!data.success) return { seccess: false, message: data.message }

        set(state => ({ products: state.products.filter(products => products._id !== pid) }))
        return { success: true, message: data.message }
    }
}));
```  
### 2. create `handleDeleteProduct` function on `ProductCard.jsx` component:  
#### snippet:  
```jsx

    {/* deletion functionality */}
    const { deleteProduct } = useProductStore();
    const toast = useToast();
    const handleDeleteProduct = async (pid)=>{
        const { success, message } = await deleteProduct(pid);
        if(!success){
            toast({
                title: "Error", description: message,
                status: "error", duration: 3000,
                isClosable: true
            })
        }else{
            toast({
                title: "Success", description: message,
                status: "success", duration: 3000,
                isClosable: true
            })
        }
    }
    
    {/* passing the function call */}
    <IconButton icon={<AiOutlineDelete/>} colorScheme='red' onClick={() => handleDeleteProduct(product._id)}/> 
```  
#### Entire functionality:  
```jsx
import React from 'react'

import { Box, Heading, HStack, IconButton, Image, Text, useColorModeValue, useToast } from '@chakra-ui/react'
import { LiaEditSolid } from "react-icons/lia";
import { AiOutlineDelete } from "react-icons/ai";
import { useProductStore } from '../store/product';

const ProductCard = ({ product }) => {

    const textColor = useColorModeValue("gray.600", "gray.200");
    const bg = useColorModeValue("white", "gray.800");

    const { deleteProduct } = useProductStore();
    const toast = useToast();
    const handleDeleteProduct = async (pid)=>{
        const { success, message } = await deleteProduct(pid);
        if(!success){
            toast({
                title: "Error", description: message,
                status: "error", duration: 3000,
                isClosable: true
            })
        }else{
            toast({
                title: "Success", description: message,
                status: "success", duration: 3000,
                isClosable: true
            })
        }
    }
  return (
    <Box
    shadow='lg'
    rounded='lg'
    overflow='hidden'
    transition='all 0.3s'
    _hover={{ transform: "translateY(-5px)", shadow: "xl"}}
    bg = {bg}
    >
        <Image src={product.image} alt={product.name} h={48} w='full' objectFit='cover' />

        <Box p={4}>
            <Heading as="h3" size="md" mb={2}>
                {product.name}
            </Heading>
        </Box>

        <Text fontWeight='bold' fontSize="xl" color={ textColor } mb={4} >
        {product.price}₹
        </Text>

        <HStack spacing={2}>
            <IconButton icon={<LiaEditSolid/>} colorScheme='blue' />
            <IconButton icon={<AiOutlineDelete/>} colorScheme='red'
            onClick={() => handleDeleteProduct(product._id)}/>  
        </HStack>

    </Box>
  )
}

export default ProductCard
```  