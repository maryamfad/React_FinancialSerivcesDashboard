import { useState, useEffect } from "react";
import StockDiagram from "./StockDiagram/StockDigaram";
import "./Dashboard.css";
import { stockNames } from "./stockNames";
import getMostActiveStocks from "../../api/getMostActiveStocks";
import Scroller from "./Scroller";
import getLatestQuoteForAStock from "../../api/getLatestQuoteForAStock";
import getLatestBarForAStock from "../../api/getLatestBarForAStock";

const Dashboard = ({ show }) => {
  const [gainerStocks, setGainerStocks] = useState([]);
  const [loserStocks, setLoserStocks] = useState([]);
  // const [stockNames, setStockNames] = useState([]);

  const [isFocused, setIsFocused] = useState(false);
  const [query, setQuery] = useState("");

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
  const handleSearchChange = (event) => {
    event.stopPropagation();
    setIsFocused(true);
    setQuery(event.target.value);
  };
  const handleItemClick = (event) => {
    const item = event.target.getAttribute("data-item");

    setQuery(item);
    setSymbol(item);
    setTimeout(() => setIsFocused(false), 100);
  };
  const handleBlur = (event) => {
    event.stopPropagation();
    event.preventDefault();
  };

  const filteredItems = query
    ? stockNames.filter((item) =>
        item.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const loadMostActiveStocksData = async () => {
    try {
      const result = await getMostActiveStocks();

      setMostActiveStocks(result.most_actives);
    } catch (error) {
      console.error("Failed to fetch data: ", error);
    }
  };

  const loadLatestQuoteData = async (symbol) => {
    try {
      const result = await getLatestQuoteForAStock(symbol);
      // console.log("result", result);
      return result;
    } catch (error) {
      console.error("Failed to fetch data: ", error);
    }
  };

  const loadLatestBarData = async (symbol) => {
    try {
      const result = await getLatestBarForAStock(symbol);
      // console.log("result", result);
      return result;
    } catch (error) {
      console.error("Failed to fetch data: ", error);
    }
  };

  // console.log("////", mostActiveStocks);
  const mergeStocksData = async () => {
    let array = mostActiveStocks.map((item) => ({
      ...item,
      symbol: item.symbol,
      quote: loadLatestQuoteData(item.symbol),
      bar: loadLatestBarData(item.symbol),
    }));
    setMostActiveStocks(array);
    // console.log("////", mostActiveStocks);
  };

  useEffect(() => {
    // loadLatestQuoteData("AAPL");
    loadMostActiveStocksData();
    // mergeStocksData();

    // Promise.all([loadMostActiveStocksData, mergeStocksData])
    // .then(() => {
    //   console.log("mostActiveStocks",mostActiveStocks);
    // })
    // .catch(error => {
    //   console.error('An error occurred:', error);
    // });
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

      <div className="search-container" onBlur={handleBlur} tabIndex="0">
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={handleSearchChange}
          onClick={() => setIsFocused(true)}
          onFocus={() => setIsFocused(true)}
        />
        {isFocused && query && (
          <div className="search-results">
            {filteredItems.length > 0 ? (
              filteredItems.map((item, index) => (
                <div key={index} data-item={item} onClick={handleItemClick}>
                  {item}
                </div>
              ))
            ) : (
              <div>No results found</div>
            )}
          </div>
        )}
      </div>
      <div className="h-50 d-flex flex-row justify-content-evenly">
        <div className="stock-diagram">
          <StockDiagram symbol={symbol} />
        </div>
        <div className="col-3 p-1 mb-2 my-3 bg-secondary text-white">5</div>
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
