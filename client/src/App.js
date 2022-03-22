import "./App.css";
// 1. Import the extendTheme function
import { extendTheme, ChakraProvider } from "@chakra-ui/react";
// import { Box, Flex, Stack, Grid, Wrap, AspectRatio } from "@chakra-ui/layout" --downloaded
import { Header } from "./components/Header/Header";
import { Hero } from "./components/Hero";
import { Footer } from "./components/Footer";
import { Login } from "./components/login";
// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
};
const [pages] = useState([
  {
    name: "Home",
  },
  { name: "Trip Planner" },
  { name: "Routes/Schedules" },
  {
    name: "Fares/Passes",
  },
  {
    name: "Service Advisories",
  },
  {
    name: "Contact",
  },
]);
const theme = extendTheme({ colors });
const [currentPage, setCurrentPage] = useState(pages[0]);
// 3. Pass the `theme` prop to the `ChakraProvider`
function App() {
  return (
    <ChakraProvider theme={theme}>
      <Header>
        <Nav
          pages={pages}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        ></Nav>
      </Header>

      <Hero></Hero>
      <Login></Login>
      <Footer></Footer>
    </ChakraProvider>
  );
}

export default App;
