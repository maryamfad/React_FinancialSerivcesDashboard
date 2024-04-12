import { useState, useEffect } from "react";
import StockDiagram from "./StockDiagram/StockDigaram";
import "./Dashboard.css";
// import getMostActiveStocks from "../../api/getMostActiveStocks";
import Scroller from "./Scroller/Scroller";
import SearchStocks from "./SearchStocks/SearchStocks";
import getStockLogo from "../../api/getStockLogo";
import StockSummary from "./StockSummary/StockSummary";
import MarketBiggestGainers from "./MarketBiggestGainers/MarketBiggestGainers.jsx";
import MarketBiggestLosers from "./MarketBiggestLosers/MarketBiggestLosers.jsx";
import StockNews from "./StockNews/StocksNew.jsx";

const Dashboard = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [symbol, setSymbol] = useState("AAPL");

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
    loadStockLogo(symbol);
  }, [symbol]);

  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error}</div>;
  // if (!data) return <div>No data fetched</div>;

  return (
    <div className="dashboard">
      <div style={{ height: "100px" }}>
        {/* <Scroller setSymbol={setSymbol} stockLogo={stockLogo} /> */}
      </div>
      <div className="middle-container">
        <div className="middle-area">
          <div className="company-profile">
            {/* <StockSummary symbol={symbol} /> */}
          </div>
          <div className="stock-diagram">
            <SearchStocks setSymbol={setSymbol} />
            <StockDiagram symbol={symbol} stockLogo={stockLogo} />
          </div>

          <div className="most-shared-stocks">
            {/* <MarketBiggestGainers setSymbol={setSymbol} /> */}
            {/* <MarketBiggestLosers setSymbol={setSymbol} /> */}
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
