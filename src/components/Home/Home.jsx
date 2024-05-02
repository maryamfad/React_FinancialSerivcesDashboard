import { useState, useEffect } from "react";
import StockDiagram from "./StockDiagram/StockDigaram.jsx";
import "./Home.css";
import NavbarMenu from "./Navbar/Navbar.jsx";
// import getMostActiveStocks from "../../api/getMostActiveStocks";
import Scroller from "./Scroller/Scroller.jsx";
import SearchStocks from "./SearchStocks/SearchStocks.jsx";
import getStockLogo from "../../api/getStockLogo.js";
import StockSummary from "./StockSummary/StockSummary.jsx";
import MarketGainers from "./MarketGainers/MarketGainers.jsx";
import MarketLosers from "./MarketLosers/MarketLosers.jsx";
import StockNews from "./StockNews/StocksNew.jsx";
import { Box } from "@chakra-ui/react";

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

      <div className="middle-area">
        <div className="company-profile">
          <StockSummary symbol={symbol} />
        </div>
        <div className="stock-diagram">
          <SearchStocks setSymbol={setSymbol} />
          <StockDiagram symbol={symbol} stockLogo={stockLogo} />
        </div>

        <div className="most-shared-stocks">
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
        </div>
      </div>
     
      <div className="news-container">
        <StockNews symbol={symbol} />
      </div>
    </Box>
  );
};

export default Home;
