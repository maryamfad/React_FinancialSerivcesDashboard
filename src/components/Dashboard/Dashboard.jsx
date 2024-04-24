import { useState, useEffect } from "react";
import StockDiagram from "./StockDiagram/StockDigaram";
import "./Dashboard.css";
// import getMostActiveStocks from "../../api/getMostActiveStocks";
import Scroller from "./Scroller/Scroller";
import SearchStocks from "./SearchStocks/SearchStocks";
import getStockLogo from "../../api/getStockLogo";
import StockSummary from "./StockSummary/StockSummary";
import MarketGainers from "./MarketGainers/MarketGainers.jsx";
import MarketLosers from "./MarketLosers/MarketLosers.jsx";
import StockNews from "./StockNews/StocksNew.jsx";

const Dashboard = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [symbol, setSymbol] = useState("AAPL");
  const [gainersTableExpanded, setGainersTableExpanded] = useState(false);
  const [losersTableExpanded, setLosersTableExpanded] = useState(false);
  const [stockLogo, setStockLogo] = useState(null);
  // let stocksAndDuplicates = [...mostActiveStocks, ...mostActiveStocks];

  const loadStockLogo = async (symbol) => {
    try {
      const result = await getStockLogo(symbol);
      // console.log("logo", result);
      setStockLogo(result);
    } catch (error) {
      console.error("Failed to fetch data: ", error);
    }
  };

  useEffect(() => {
    // loadMostActiveStocksData();
    // loadStockLogo(symbol);
  }, [symbol]);

  return (
    <div className="dashboard">
      <div style={{ height: "170px" }}>
        {/* <Scroller setSymbol={setSymbol} stockLogo={stockLogo} /> */}
      </div>
      <div className="middle-container">
        <div className="middle-area">
          <div className="company-profile">
            {/* <StockSummary symbol={symbol} /> */}
          </div>
          <div className="stock-diagram">
            {/* <SearchStocks setSymbol={setSymbol} />
            <StockDiagram symbol={symbol} stockLogo={stockLogo} /> */}
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
          {/* <StockNews symbol={symbol} /> */}
        </div>
      </div>
    </div>
    //  </div>
  );
};

export default Dashboard;
