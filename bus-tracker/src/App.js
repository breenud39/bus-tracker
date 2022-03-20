import './App.css';
// 1. Import the extendTheme function
import { extendTheme, ChakraProvider } from '@chakra-ui/react'
// import { Box, Flex, Stack, Grid, Wrap, AspectRatio } from "@chakra-ui/layout" --downloaded

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
}

const theme = extendTheme({ colors })

// 3. Pass the `theme` prop to the `ChakraProvider`
function App() {
  return (
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  )
}

export default App;
