# phase 7. impletmenting show all active prodcuts functionality       
----->`src`----->`pages`----->`HomePage.jsx`  
### 1. need to import simpleGrid:  
```jsx
import { SimpleGrid } from '@chakra-ui/react'
```  
### 2. template snippet:  
```jsx
    <SimpleGrid
    columns={{ base: 1, md: 2, lg: 3 }}
    spacing={10} w={"full"}
    >

    </SimpleGrid>
```  
### 3. Need to implement get products frontend function:
----->`src`----->`store`----->`product.jsx`  
```javascript
    // Get products
    fetchProducts: async ()=>{
        const res = await fetch("/api/products");
        const backendData = await res.json();
        set({ products: backendData.data})
    }
```  
### 4. useEffect in `HomePage.js` & some modifications:  
----->`src`----->`pages`----->`HomePage.jsx`  
```javascript
  const { fetchProducts, products } = useProductStore();

  useEffect(()=>{
    fetchProducts();
  }, [fetchProducts]);
  console.log("Product", products);
```  
### 5. we need to create a component to show product (`ProductCard.jsx`):  
----->`src`----->`components`----->`ProductCard.jsx`  
```jsx
import React from 'react'

import { Box, Heading, HStack, IconButton, Image, Text, useColorModeValue } from '@chakra-ui/react'
import { LiaEditSolid } from "react-icons/lia";
import { AiOutlineDelete } from "react-icons/ai";

const ProductCard = ({ product }) => {

    const textColor = useColorModeValue("gray.600", "gray.200");
    const bg = useColorModeValue("white", "gray.800");
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
            <IconButton icon={<AiOutlineDelete/>} colorScheme='red' />  
        </HStack>

    </Box>
  )
}

export default ProductCard
```  
### 6. some times this `<Image>` snippet gives an error :  
----->`src`----->`eslint.config.js`  
so we need to turn off the linting  
```javascript
rules: {
      "react/prop-types": "off",
}
```  
### 7. Conditional rendering products screen or create product screen:  
----->`src`----->`pages`----->`HomePage.jsx`  
```jsx

```  
### 8. Final Snippet:  
----->`src`----->`pages`----->`HomePage.jsx`  
```jsx
import React, { useEffect } from 'react'
import { Container, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { Link } from "react-router-dom"; // from router & not from chakra
import { useProductStore } from "../store/product.js"
import ProductCard from '../components/ProductCard.jsx';

const HomePage = () => {

// 1. product fetching part start
  const { fetchProducts, products } = useProductStore();

  useEffect(()=>{
    fetchProducts();
  }, [fetchProducts]);
  console.log("Product", products);
// 1. product fetching part ends

  return (
    <Container maxW="container.xl" py={12}>

    <VStack spacing={8}>

    <Text
    fontSize={"30"} fontWeight={"bold"}
    bgGradient={"linear(to-r, cyan.400, blue.500)"}
    bgClip={"text"} textAlign={"center"} >
    Current Page 🚀
    </Text>

    {/* 2. Renders this */}
    <SimpleGrid
    columns={{ base: 1, md: 2, lg: 3 }}
    spacing={10} w={"full"}
    >
    {products.map((product)=>(
      <ProductCard key={product._id} product={product} />
    ))}
    </SimpleGrid>


    {/* 3. if no products available then renders this */}
    {products.length === 0 && (
      <Text fontSize="xl" textAlign={"center"} fontWeight="bold" color="gray.500">
    No product found 😞 {" "}
    <Link to={"/create"}>
      <Text as='span' color="blue.500" _hover={{ textDecoration: "underline" }}>
      Create a product
      </Text>
    </Link>
    </Text>
    )}

    </VStack>

    </Container>
  )
}

export default HomePage
```  