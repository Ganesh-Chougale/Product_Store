# phase 4. impletmenting Navbar UI & functionality      
`frontend` -----> `src`-----> `components` -----> `Navbar.jsx`  

```jsx
import React from 'react'
import { Button, Container, Flex, HStack, Text, useColorMode } from "@chakra-ui/react"
import { CiSquarePlus } from "react-icons/ci";
import { Link } from "react-router-dom"; // from router & not from chakra
import { IoMoon } from "react-icons/io5"
import { LuSun } from "react-icons/lu"


const Navbar = () => {

  const {colorMode, toggleColorMode} = useColorMode();
  return (
    <Container maxW={"1140px"} px={4}>
      <Flex 
      h={16} alignContent={"center"} 
      justifyContent={"space-between"}
      flexDir={{base:"column", sm:"row"}}
      >

    <Text
      fontSize={{ base: "22", sm: "28" }}
      fontWeight={"bold"}
      textTransform={"uppercase"}
      textAlign={"center"}
      bgGradient={"linear(to-r, cyan.400, blue.500)"}
      bgClip={"text"}
    >
      <Link to={"/"} style={{ color: "inherit" }}>
        Product Store 🛒
      </Link>
    </Text>

      <HStack spacing={2} alignItems={"center"}>
      <Link to={"/create"}>
        <Button><CiSquarePlus fontSize={20}/></Button>
      </Link>
      <Button onClick={toggleColorMode}>
        {colorMode === "light" ? <IoMoon/> : <LuSun/>}
      </Button>
      </HStack>
      

      </Flex>
    </Container>
  )
}

export default Navbar
```  