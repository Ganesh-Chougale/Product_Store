# phase 1. head into frontEnd folder to create frontend project  
### 1. :  
#### Terminal:  
```bash
npm create vite@latest .
// create react project using vite build too in current folder
```  
`y` -----> `react` -----> `javascript`  


```bash
npm intsall
```  

### 2. inject Chakra UI:  
url: `https://chakra-ui.com/docs/get-started/installation`  
click on `vite`  
& paste command from there.  
#### Terminal:  
```bash
#  chakra-ui v2
npm i @chakra-ui/react@v2.10.3 @emotion/react @emotion/styled framer-motion
```  
#### Terminal:  
```bash
npm i react-icons
```  
#### Terminal:  
```bash
# for global state
npm i zustand
```  
### 3. grab the chakra UI snippet & inject it in out entry point js:  
`frontend` -----> `src` -----> `main.jsx`  
```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ChakraProvider } from "@chakra-ui/react"; // ** 

ReactDOM. createRoot(document.getElementById("root")).render(
<React.StrictMode>
    <ChakraProvider> // ** 
        <App />
    </ChakraProvider> // ** 
</React.StrictMode>
);
```  
### 4. Remove Excessive files & clean the project:  
delete these files:  
`App.css`  
`index.css`  
clean `App.jsx` & only keep fragment in the file, inject a single Button from chakre UI  
`frontend` -----> `src` -----> `App.jsx`  
```jsx
import { Button } from "@chakra-ui/react";

  function App() {
    return(
      <>
        <Button>Hello</Button>
      </>
  );
}
export default App;
```  
