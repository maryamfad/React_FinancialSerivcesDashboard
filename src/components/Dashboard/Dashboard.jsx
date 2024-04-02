import { useState, useEffect } from "react";
import StockDiagram from "./StockDiagram/StockDigaram";
import "./Dashboard.css";
import { stockNames } from "./stockNames";
import getMostActiveStocks from "../../api/getMostActiveStocks";
import Scroller from "./Scroller/Scroller";
import getLatestQuoteForAStock from "../../api/getLatestQuoteForAStock";
import getLatestBarForAStock from "../../api/getLatestBarForAStock";
import MostSharedStocks from "./MostSharedStocks/MostSharedStocks";
import SearchStocks from "./SearchStocks/SearchStocks";
import StockNews from "./StockNews/StocksNew";
import getStockLogo from "../../api/getStockLogo";

const Dashboard = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [symbol, setSymbol] = useState("AAPL");
  const [mostActiveStocks, setMostActiveStocks] = useState([]);
  const [stockLogo, setStockLogo] = useState(null);
  let stocksAndDuplicates = [...mostActiveStocks, ...mostActiveStocks];

  const loadMostActiveStocksData = async () => {
    try {
      const result = await getMostActiveStocks();

      setMostActiveStocks(result.most_actives);
    } catch (error) {
      console.error("Failed to fetch data: ", error);
    }
  };
  const loadStockLogo = async (symbol) => {
    try {
      const result = await getStockLogo(symbol);
      console.log("logo", result);
      setStockLogo(result);
    } catch (error) {
      console.error("Failed to fetch data: ", error);
    }
  };

  useEffect(() => {
    // loadMostActiveStocksData();
    loadStockLogo(symbol);
  }, [symbol]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  // if (!data) return <div>No data fetched</div>;

  return (
    <div className="dashboard">
      <Scroller
        stocksAndDuplicates={stocksAndDuplicates}
        setSymbol={setSymbol}
        stockLogo={stockLogo}
      />

      {/* <div className="middle-container"> */}
      <div className="middle-area">
        <div className="stock-diagram">
          <SearchStocks setSymbol={setSymbol} />
          <StockDiagram symbol={symbol} stockLogo={stockLogo} />
        </div>
        {/* <div className="most-shared-stocks">
          <MostSharedStocks setSymbol={setSymbol} />
        </div>
        <div className="most-shared-stocks">
          <MostSharedStocks setSymbol={setSymbol} />
        </div> */}
      </div>
      <div className="news-container">
        <StockNews symbol={symbol} />
      </div>
      {/* </div> */}
    </div>
    // </div>
  );
};

export default Dashboard;
