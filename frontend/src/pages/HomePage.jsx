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