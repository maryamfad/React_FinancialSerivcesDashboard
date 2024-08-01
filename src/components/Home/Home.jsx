import { useState, useEffect } from "react";
import StockDiagram from "./StockDiagram/StockDigaram.jsx";
import Scroller from "./Scroller/Scroller.jsx";
import SearchStocks from "./SearchStocks/SearchStocks.jsx";
import getStockLogo from "../../api/getStockLogo.js";
import StockSummary from "./StockSummary/StockSummary.jsx";
import MarketGainers from "./MarketGainers/MarketGainers.jsx";
import MarketLosers from "./MarketLosers/MarketLosers.jsx";
import StockNews from "./StockNews/StocksNew.jsx";
import { Box, Flex,Text } from "@chakra-ui/react";
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
      <Box position="fixed" top={0} left={0} width="100%" zIndex={1000}>
        <NavbarMenu />
      </Box>
      <Box width="100%" mt={{ base: "12%", md: "5%" }}>
        <Scroller setSymbol={setSymbol} stockLogo={stockLogo} />
      </Box>

      <Box width="100%" height="calc(100% - 128px)" mt={"1%"}>
        <Flex
          direction={{ base: "column", md: "row" }}
          width="100%"
          height={{ base: "auto", md: "50%" }}
          mb={4}
          wrap="wrap"
        >
          <Box width={{ base: "100%", md: "25%" }} p={4}>
            <StockSummary symbol={symbol} height={"100%"} />
          </Box>
          <Box
            width={{ base: "100%", md: "50%" }}
            p={4}
          >
            <Box
              bg="secondary"
              borderTopRadius={"5px"}
              width="100%"
              height={{ base: "auto", md: "10%" }}
              mb={{ base: 4, md: 0 }}
              p={4}
            >
              <SearchStocks setSymbol={setSymbol} />
            </Box>
            <Box
              bg="secondary"
              width="100%"
              borderBottomRadius={"5px"}
              height={{ base: "auto", md: "90%" }}
              p={4}
            >
              <StockDiagram symbol={symbol} stockLogo={stockLogo} />
            </Box>
          </Box>
          <Box
            width={{ base: "100%", md: "25%" }}
            p={4}
            display="flex"
            flexDirection="column"
            
          >
            <Box
              bg="secondary"
              borderTopRadius={"5px"}
       
              width="100%"
              height={{ base: "auto", md: "50%" }} 
              mb={{ base: 4, md: 0 }}
              p={4}
            >
              <Text fontWeight={"bold"}>Market Biggest Gainers</Text>
              <Box w="100%" h="100%" overflow="hidden" borderRadius="md">
                <Box
                  bg="white"
                  w="100%"
                  h="200px"
                  overflowY="auto"
                  borderRadius={"10px"}
                  boxShadow={
                    "rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px"
                  }
                  border={"2x"}
                  borderColor={"#F1D7D7"}
                >
                  <MarketGainers setSymbol={setSymbol} />
                </Box>
              </Box>
            </Box>
            <Box
              bg="secondary"
              width="100%"
              height={{ base: "auto", md: "50%" }}
              borderBottomRadius={"5px"}
              p={4}
            >
              <Text fontWeight={"bold"}>Market Biggest Losers</Text>
              <Box w="100%" h="100%" overflow="hidden" borderRadius="md"  >
                <Box
                  bg="white"
                  w="100%"
                  h="200px"
                  overflowY="auto"
                  borderRadius={"10px"}
                  boxShadow={
                    "rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px"
                  }
                  border={"2x"}
                  borderColor={"#F1D7D7"}
                >
                  <MarketLosers setSymbol={setSymbol} />
                </Box>
              </Box>
            </Box>
          </Box>
        </Flex>
        <Flex
          direction={{ base: "column", md: "row" }}
          width="100%"
          height={{ base: "auto", md: "50%" }}
        >
          <Box bg="secondary" width={{ base: "100%", md: "50%" }} p={4}>
            <StockNews symbol={symbol} />
          </Box>
          <Box bg="secondary" width={{ base: "100%", md: "50%" }} p={4}>
            
          </Box>
        </Flex>
      </Box>
    </Box>
    
  );
};

export default Home;
