# phase 2. Set up page routing  

### 1. install router dependancies:  
#### Terminal:  
```bash
npm i react-router-dom
```  
### wrap the ChakraProvider & App inside the BrowseRoute:  
`frontend` -----> `src` -----> `main.jsx`  
```jsx
    <BrowserRouter>
      <ChakraProvider>
          <App />
      </ChakraProvider>
    </BrowserRouter>
```  
full snippet:
```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";

ReactDOM. createRoot(document.getElementById("root")).render(
<React.StrictMode>
    <BrowserRouter>
      <ChakraProvider>
          <App />
      </ChakraProvider>
    </BrowserRouter>
</React.StrictMode>
);
```  

### 2. declare our UI pages & components in out `App.js`:  
`frontend` -----> `src` -----> `App.jsx`  
we use `<Routes></Routes>` as outer shell & `<Route path=""></Route>` for inner path declarations  
```jsx
import { Box } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
// import HomePage from "./pages/HomePage";
// import CreatePage from "./pages/CreatePage";
// import Navbar from "./components/Navbar";

function App() {
  return(
    <Box minH={"100vh"}>
    
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/create" element={<CreatePage/>} />
      </Routes>

    </Box>
  );
}
export default App;
```  