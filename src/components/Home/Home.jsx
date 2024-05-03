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
    <Box className="home">
      
      <Box mt={{ base: "32%", sm: "32%", md: "32%", lg:"0", xl:"0" }}>
        <Scroller setSymbol={setSymbol} stockLogo={stockLogo} />
      </Box>

      <Flex
        flexDir={{
          base: "column",
          sm: "column",
          md: "column",
          lg: "row",
          xl: "row",
        }}
        height={{
          base: "180vh",
          sm: "180vh",
          md: "180vh",
          lg: "65vh",
          xl: "65vh",
        }}
        width={"100vw"}
        p={5}
        gap={{ base: 5, sm: 5, md: 5 }}
        // p={{ base: 5, sm: 5, md: 5, lg: 5, xl: 5}}
        justifyContent={"space-between"}
        alignItems={{ base: "center", sm: "center", md: "center" }}
      >
        <Flex
          height={"100%"}
          width={{
            base: "100%",
            sm: "100%",
            md: "100%",
            lg: "25%",
            xl: "25%",
          }}
        >
          <StockSummary symbol={symbol} />
        </Flex>
        <Box
          height={"100%"}
          width={{
            base: "100%",
            sm: "100%",
            md: "100%",
            lg: "40%",
            xl: "40%",
          }}
        >
          <SearchStocks setSymbol={setSymbol} />
          <StockDiagram symbol={symbol} stockLogo={stockLogo} />
        </Box>

        <Flex
          height={"100%"}
          flexDir={"column"}
          justifyContent={"space-between"}
          width={{
            base: "100%",
            sm: "100%",
            md: "100%",
            lg: "25%",
            xl: "25%",
          }}
        >
          <MarketGainers setSymbol={setSymbol} />
          <MarketLosers setSymbol={setSymbol} />
        </Flex>
      </Flex>

      <StockNews symbol={symbol} />
    </Box>
  );
};

export default Home;
