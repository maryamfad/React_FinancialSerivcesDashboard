import { useState, useEffect } from "react";
import StockDiagram from "./StockDiagram/StockDigaram";
import "./Dashboard.css";
import { stockNames } from "./stockNames";
import getMostActiveStocks from "../../api/getMostActiveStocks";
import Scroller from "./Scroller";
import getLatestQuoteForAStock from "../../api/getLatestQuoteForAStock";
import getLatestBarForAStock from "../../api/getLatestBarForAStock";
import MostSharedStocks from "./MostSharedStocks/MostSharedStocks";
import SearchStocks from "./SearchStocks";

const Dashboard = ({ show }) => {
  const [gainerStocks, setGainerStocks] = useState([]);
  const [loserStocks, setLoserStocks] = useState([]);
  // const [stockNames, setStockNames] = useState([]);

  

  // console.log("stocksAndDuplicates", stocksAndDuplicates);
  // stocksAndDuplicates.sort(() => Math.random() - 0.5);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [volume, setVolume] = useState(0);
  const [change, setChange] = useState(0);
  const [symbol, setSymbol] = useState("AAPL");
  const [mostActiveStocks, setMostActiveStocks] = useState([]);
  let stocksAndDuplicates = [...mostActiveStocks, ...mostActiveStocks];



  const loadMostActiveStocksData = async () => {
    try {
      const result = await getMostActiveStocks();

      setMostActiveStocks(result.most_actives);
    } catch (error) {
      console.error("Failed to fetch data: ", error);
    }
  };

  useEffect(() => {
    loadMostActiveStocksData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  // if (!data) return <div>No data fetched</div>;

  return (
    <div className="dashboard">
      <Scroller
        stocksAndDuplicates={stocksAndDuplicates}
        setSymbol={setSymbol}
      />

    <SearchStocks setSymbol={setSymbol}/>
      <div className="middle-area">
        <div className="stock-diagram">
          <StockDiagram symbol={symbol} />
        </div>
        <div className="most-shared-stocks"><MostSharedStocks setSymbol={setSymbol}/></div>
      </div>
      {/* <div className="h-25 d-flex flex-row justify-content-evenly">
        <div className="col-3 p-1 mb-2 my-3 bg-danger text-white">7</div>
        <div className="col-3 p-1 mb-2 my-3 bg-danger text-white">8</div>
        <div className="col-3 p-1 mb-2 my-3 bg-danger text-white">9</div>
      </div> */}
    </div>
    // </div>
  );
};

export default Dashboard;
