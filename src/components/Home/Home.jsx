import { useState, useEffect } from "react";
import StockDiagram from "./StockDiagram/StockDigaram.jsx";
import Scroller from "./Scroller/Scroller.jsx";
import SearchStocks from "./SearchStocks/SearchStocks.jsx";
import getStockLogo from "../../api/getStockLogo.js";
import StockSummary from "./StockSummary/StockSummary.jsx";
import MarketGainers from "./MarketGainers/MarketGainers.jsx";
import MarketLosers from "./MarketLosers/MarketLosers.jsx";
import StockNews from "./StockNews/StocksNew.jsx";
import { Box, Flex } from "@chakra-ui/react";
import NavbarMenu from "../Navbar/Navbar.jsx";

const Home = () => {
  const [symbol, setSymbol] = useState("AAPL");
  const [stockLogo, setStockLogo] = useState(null);

  const loadStockLogo = async (symbol) => {
    try {
      const result = await getStockLogo(symbol);
      setStockLogo(result);
    } catch (error) {
      console.error("Failed to fetch data: ", error);
    }
  };

  useEffect(() => {
    loadStockLogo(symbol);
  }, [symbol]);

  return (
    <Box width="100vw" minHeight="100vh">
      {/* Top Boxes */}
      {/* <Box width="100%" mb={4}> */}
      <Box position="fixed" top={0} left={0} width="100%" zIndex={1000}>
        <NavbarMenu />
      </Box>
      <Box  width="100%"  mt={{ base: "12%", md: "5%" }}>
        <Scroller setSymbol={setSymbol} stockLogo={stockLogo} />
      </Box>
      {/* </Box> */}

      {/* Main Content */}
      <Box width="100%" height="calc(100% - 128px)" mt={"1%"}>
        {" "}
        {/* Adjust height as needed */}
        <Flex
          direction={{ base: "column", md: "row" }}
          width="100%"
          height={{ base: "auto", md: "50%" }}
          mb={4}
          wrap="wrap"
        >
          <Box bg="tomato" width={{ base: "100%", md: "25%" }} p={4}>
            First Box
          </Box>
          <Box
            bg="blue.500"
            width={{ base: "100%", md: "50%" }}
            p={4}
            display="flex"
            flexDirection="column"
          >
            <Box
              bg="yellow.500"
              width="100%"
              height={{ base: "auto", md: "50%" }}
              mb={{ base: 4, md: 0 }}
              p={4}
            >
              Inner Box 1
            </Box>
            <Box
              bg="pink.500"
              width="100%"
              height={{ base: "auto", md: "50%" }}
              p={4}
            >
              Inner Box 2
            </Box>
          </Box>
          <Box
            bg="green.500"
            width={{ base: "100%", md: "25%" }}
            p={4}
            display="flex"
            flexDirection="column"
          >
            <Box
              bg="cyan.500"
              width="100%"
              height={{ base: "auto", md: "50%" }}
              mb={{ base: 4, md: 0 }}
              p={4}
            >
              Inner Box 3
            </Box>
            <Box
              bg="purple.500"
              width="100%"
              height={{ base: "auto", md: "50%" }}
              p={4}
            >
              Inner Box 4
            </Box>
          </Box>
        </Flex>
        <Flex
          direction={{ base: "column", md: "row" }}
          width="100%"
          height={{ base: "auto", md: "50%" }}
        >
          <Box bg="purple.500" width={{ base: "100%", md: "50%" }} p={4}>
            Fourth Box
          </Box>
          <Box bg="orange.500" width={{ base: "100%", md: "50%" }} p={4}>
            Fifth Box
          </Box>
        </Flex>
      </Box>
    </Box>
    // {/* <NavbarMenu />
    // <Box mt={{ base: "32%", sm: "32%", md: "3%", lg: "0", xl: "0" }}>
    //   <Scroller setSymbol={setSymbol} stockLogo={stockLogo} />
    // </Box> */}

    // {/* <Flex
    //   flexDir={{
    //     base: "column",
    //     sm: "column",
    //     md: "column",
    //     lg: "row",
    //     xl: "row",
    //   }}
    //   height={{
    //     base: "180vh",
    //     sm: "180vh",
    //     md: "180vh",
    //     lg: "65vh",
    //     xl: "65vh",
    //   }}
    //   width={"100%"}
    //   pl={15}
    //   pr={15}
    //   justifyContent={"space-evenly"}
    //   alignItems={{ base: "center", sm: "center", md: "center" }}
    // >
    //   <Flex
    //     height={"100%"}
    //     width={{
    //       base: "100%",
    //       sm: "100%",
    //       md: "100%",
    //       lg: "25%",
    //       xl: "25%",
    //     }}
    //   >
    //     <StockSummary symbol={symbol} />
    //   </Flex>
    //   <Box
    //     height={"100%"}
    //     width={{
    //       base: "100%",
    //       sm: "100%",
    //       md: "100%",
    //       lg: "45%",
    //       xl: "45%",
    //     }}
    //   >
    //     <SearchStocks setSymbol={setSymbol} />
    //     <StockDiagram symbol={symbol} stockLogo={stockLogo} />
    //   </Box>

    //   <Flex
    //     height={"100%"}
    //     flexDir={"column"}
    //     justifyContent={"space-between"}
    //     width={{
    //       base: "100%",
    //       sm: "100%",
    //       md: "100%",
    //       lg: "25%",
    //       xl: "25%",
    //     }}
    //   >
    //     <MarketGainers setSymbol={setSymbol} />
    //     <MarketLosers setSymbol={setSymbol} />
    //   </Flex>
    // </Flex> */}

    // {/* <StockNews symbol={symbol} /> */}
  );
};

export default Home;
