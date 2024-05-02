import { useState, useEffect } from "react";
import StockDiagram from "./StockDiagram/StockDigaram.jsx";
import NavbarMenu from "./Navbar/Navbar.jsx";
// import getMostActiveStocks from "../../api/getMostActiveStocks";
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
  const [gainersTableExpanded, setGainersTableExpanded] = useState(false);
  const [losersTableExpanded, setLosersTableExpanded] = useState(false);
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
    // loadMostActiveStocksData();
    loadStockLogo(symbol);
  }, [symbol]);

  return (
    <Box className="home">
      <NavbarMenu />
      <Scroller setSymbol={setSymbol} stockLogo={stockLogo} />

      <Flex height={"65vh"} justifyContent={"space-evenly"}>
        <Flex width={"25%"}>
          <StockSummary symbol={symbol} />
        </Flex>
        <Box width={"40%"} >
          <SearchStocks setSymbol={setSymbol} />
          <StockDiagram symbol={symbol} stockLogo={stockLogo} />
        </Box>

        <Flex flexDir={"column"} justifyContent={"space-between"} width={"25%"} gap={5}>
          <MarketGainers
            setSymbol={setSymbol}
            gainersTableExpanded={gainersTableExpanded}
            setGainersTableExpanded={setGainersTableExpanded}
            losersTableExpanded={losersTableExpanded}
            setLosersTableExpanded={setLosersTableExpanded}
          />
          <MarketLosers
            setSymbol={setSymbol}
            gainersTableExpanded={gainersTableExpanded}
            setGainersTableExpanded={setGainersTableExpanded}
            losersTableExpanded={losersTableExpanded}
            setLosersTableExpanded={setLosersTableExpanded}
          />
        </Flex>
      </Flex>

      <div className="news-container">
        <StockNews symbol={symbol} />
      </div>
    </Box>
  );
};

export default Home;
