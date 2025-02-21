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