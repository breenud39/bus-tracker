import './App.css';
// 1. Import the extendTheme function
import { ChakraProvider } from '@chakra-ui/react'
// import { Box, Flex, Stack, Grid, Wrap, AspectRatio } from "@chakra-ui/layout" --downloaded

// 2. Extend the theme to include custom colors, fonts, etc

// 3. Pass the `theme` prop to the `ChakraProvider`
function App() {
  return (
    <ChakraProvider>
      <App />
    </ChakraProvider>
  )
}

export default App;
