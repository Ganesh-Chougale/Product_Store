# phase 9. impletmenting update product frontend functionality      
### 1. create `updateProduct` function in `product.js` (global storage):  
`src`----->`store`----->`product.js`  
#### snippet:  
```jsx
    // Update Product
    updateProduct: async (pid, updatedProduct) => {
        const res = await fetch(`/api/products/${pid}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedProduct)
            });
        const data = await res.json();
        if(!data.success) return { success: false, message: data.message }
        // updates the UI realtime, without a page refresh:
        set((state) => ({
            products: state.products.map((product) => (product._id === pid ? data.data : product))
        }));    

        return { success: true, message: data.message };
    }
```  
#### entire snippet:  
```jsx
import { data } from "react-router-dom";
import { create } from "zustand";

export const useProductStore = create((set)=>({
    products: [],
    // POST product
    setProducts: (products) => set({products}),
    createProduct: async (newProduct) => {
        if(!newProduct.name || !newProduct.price || !newProduct.image){
            return { success: false, message: "please fill all inputs"}
        }
        const res = await fetch("/api/products", 
            {
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
    // Delete Product
    deleteProduct: async (pid) => {
        const res = await fetch(`/api/products/${pid}`, { method: "DELETE"}); // used backticks in endpoint instead of double or single quotes 
        const data = await res.json(); 

        if(!data.success) return { success: false, message: data.message }

        // updates the UI realtime, without a page refresh:
        set(state => ({ products: state.products.filter(products => products._id !== pid) }))

        return { success: true, message: data.message }
    },
    // Update Product
    updateProduct: async (pid, updatedProduct) => {
        const res = await fetch(`/api/products/${pid}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedProduct)
            });
        const data = await res.json();
        if(!data.success) return { success: false, message: data.message }
        // updates the UI realtime, without a page refresh:
        set((state) => ({
            products: state.products.map((product) => (product._id === pid ? data.data : product))
        }));    

        return { success: true, message: data.message };
    }
}));
```  


### 2. import `Modal` from chakra-UI:  
`Note`: import {useDisclosure} from from '@chakra-ui/react'  
is mandatory otherwise we will have disclose error for chakra Modal UIs
### snippet:
```jsx
    // update product functionalatiy
    const { isOpen, onOpen, onClose } = useDisclosure() // for Modal Functionality
    const [updatedProduct, setUpdatedProduct] = useState(product);

    const { updateProduct } = useProductStore();
    const handleUpdateProduct = async (pid, updatedProduct) => {
        const { success, message } = await updateProduct(pid, updatedProduct);
        onClose();

        if(!success){
            toast({
                title: "Error", description: "something went wrong",
                status: "error", duration: 3000,
                isClosable: true
            })
        }else{
            toast({
                title: "Success", description: "Product updated successfully",
                status: "success", duration: 3000,
                isClosable: true
            })
        }
    }
```    
```jsx
            {/* update product UI starts*/}
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />

                <ModalContent>
                    <ModalHeader>Update Product</ModalHeader>
                    <ModalCloseButton />


                <ModalBody>
                    <VStack spacing={4}>
                        <Input placeholder='Product Name'
                        name='name' value={updatedProduct.name}
                        onChange={(e)=> setUpdatedProduct({...updatedProduct, name: e.target.value})}
                        />
                        <Input placeholder='Product Price'
                        name='price' value={updatedProduct.price}
                        onChange={(e)=> setUpdatedProduct({...updatedProduct, price: e.target.value})}
                        />
                        <Input placeholder='Product Image URL'
                        name='image' value={updatedProduct.image}
                        onChange={(e)=> setUpdatedProduct({...updatedProduct, image: e.target.value})}
                        />
                    </VStack>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' mr={3} 
                    onClick={() => handleUpdateProduct(product._id, updatedProduct)}
                    >Update</Button>
                    <Button variant='ghost' onClick={onClose}
                    >Cancel</Button>
                    {/* built In function of chakra-UI Modal */}
                </ModalFooter>

                </ModalContent>
        </Modal>
            {/* update product UI Ends*/}
```  
### Full snippet:  
```jsx
import React, { useState } from 'react'

import { Box, Button, Heading, HStack, IconButton, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useColorModeValue, useToast, VStack, useDisclosure } from '@chakra-ui/react'

import { LiaEditSolid } from "react-icons/lia";
import { AiOutlineDelete } from "react-icons/ai";
import { useProductStore } from '../store/product';

const ProductCard = ({ product }) => {

    const textColor = useColorModeValue("gray.600", "gray.200");
    const bg = useColorModeValue("white", "gray.800");

    // delete product functionality
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

    // update product functionalatiy
    const { isOpen, onOpen, onClose } = useDisclosure() // for Modal Functionality
    const [updatedProduct, setUpdatedProduct] = useState(product);

    const { updateProduct } = useProductStore();
    const handleUpdateProduct = async (pid, updatedProduct) => {
        const { success, message } = await updateProduct(pid, updatedProduct);
        onClose();

        if(!success){
            toast({
                title: "Error", description: "something went wrong",
                status: "error", duration: 3000,
                isClosable: true
            })
        }else{
            toast({
                title: "Success", description: "Product updated successfully",
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
            <IconButton icon={<LiaEditSolid/>} colorScheme='blue' 
                onClick={onOpen} // built In function of chakra-UI Modal
            />
            <IconButton icon={<AiOutlineDelete/>} colorScheme='red'
            onClick={() => handleDeleteProduct(product._id)}/>  
        </HStack>

            {/* update product UI starts*/}
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />

                <ModalContent>
                    <ModalHeader>Update Product</ModalHeader>
                    <ModalCloseButton />


                <ModalBody>
                    <VStack spacing={4}>
                        <Input placeholder='Product Name'
                        name='name' value={updatedProduct.name}
                        onChange={(e)=> setUpdatedProduct({...updatedProduct, name: e.target.value})}
                        />
                        <Input placeholder='Product Price'
                        name='price' value={updatedProduct.price}
                        onChange={(e)=> setUpdatedProduct({...updatedProduct, price: e.target.value})}
                        />
                        <Input placeholder='Product Image URL'
                        name='image' value={updatedProduct.image}
                        onChange={(e)=> setUpdatedProduct({...updatedProduct, image: e.target.value})}
                        />
                    </VStack>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' mr={3} 
                    onClick={() => handleUpdateProduct(product._id, updatedProduct)}
                    >Update</Button>
                    <Button variant='ghost' onClick={onClose}
                    >Cancel</Button>
                    {/* built In function of chakra-UI Modal */}
                </ModalFooter>

                </ModalContent>
        </Modal>
            {/* update product UI Ends*/}

    </Box>
  )
}

export default ProductCard
```  