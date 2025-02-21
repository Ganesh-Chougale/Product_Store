# phase 6. impletmenting Toast in CreatePage UI       
----->`src`----->`pages`----->`CreatePage.jsx`  
### 1. import the toast into component:  
```jsx
import { useToast } from '@chakra-ui/react';
```  
### 2. implement the Toast in component:  
```jsx

  const toast = useToast();

  const { createProduct } = useProductStore();
  const handleAddProduct = async ()=>{
    const { success, message} = await createProduct(newProduct)

    if(!success){
      toast({
        title: "Error",
        description: message,
        status: "error",
        isClosable: true
      })
    }else{
      toast({
        title: "Success",
        description: message,
        status: "success",
        isClosable: true
      })
    }

    setNewProducts({name: "", price: "", image: ""})
  }
```  
### 3. Entire Snippet:  
```jsx
import { Box, Button, Container, Heading, Input, useColorModeValue, VStack, useToast } from '@chakra-ui/react';
import React, { useState } from 'react'
import { useProductStore } from '../store/product';

const CreatePage = () => {

  const [newProduct, setNewProducts] = useState({
    name: "",
    price: "",
    image: ""
  });

// Start
  const toast = useToast();

  const { createProduct } = useProductStore();
  const handleAddProduct = async ()=>{
    const { success, message} = await createProduct(newProduct)

    if(!success){
      toast({
        title: "Error",
        description: message,
        status: "error",
        isClosable: true
      })
    }else{
      toast({
        title: "Success",
        description: message,
        status: "success",
        isClosable: true
      })
    }

    setNewProducts({name: "", price: "", image: ""})
  }
  // End
  return (
    <Container maxW={"container.sm"}>
    <VStack
    spacing={8}
    >
    <Heading as="h1" size={"2xl"} textAlign={"center"} mb={8}>
      Create New Product
    </Heading>
    <Box
    w={"full"} bg={useColorModeValue("white", "gray.800")}
    p={6} rounded={"lg"} shadow={"md"}
    >
      <VStack spacing={4}>
        <Input 
        placeholder='Product Name'
        name='name'
        value={newProduct.name}
        onChange={(e)=> setNewProducts({...newProduct, name: e.target.value})}
         />
         <Input 
          placeholder='Price'
          name='price'
          type='number'
          value={newProduct.price}
          onChange={e => setNewProducts({...newProduct, price: e.target.value})}
         />
         <Input 
          placeholder='Image Url'
          name='image'
          value={newProduct.image}
          onChange={e => setNewProducts({...newProduct, image: e.target.value})}
         />
         <Button colorScheme='blue' onClick={handleAddProduct} w={"full"}>Add Product</Button>
      </VStack>
    </Box>
    </VStack>
    </Container>
  )
}

export default CreatePage
```  