import { useState, useEffect } from "react";
import StockDiagram from "./StockDiagram/StockDigaram";
import "./Dashboard.css";
import { GoTriangleUp, GoTriangleDown } from "react-icons/go";

const Dashboard = ({ show }) => {
  const [gainerStocks, setGainerStocks] = useState([]);
  const [loserStocks, setLoserStocks] = useState([]);
  const [stockNames, setStockNames] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [query, setQuery] = useState("");
  let stocksAndDuplicates = [
    ...gainerStocks,
    ...loserStocks,
    ...gainerStocks,
    ...loserStocks,
  ];
  stocksAndDuplicates.sort(() => Math.random() - 0.5);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [symbol, setSymbol] = useState('AAPL');

  const handleSearchChange = (event) => {
    event.stopPropagation();
    setIsFocused(true);
    setQuery(event.target.value);
  };
  const handleItemClick = (event) => {
    const item = event.target.getAttribute("data-item");
    console.log("Item clicked:", item);
    setQuery(item);
    setSymbol(item);
    setTimeout(() => setIsFocused(false), 100);
  };
  const handleBlur = (event) => {
    event.stopPropagation();
    event.preventDefault();
    // setTimeout(() => setIsFocused(false), 100);
  };
  console.log("query", query);
  const filteredItems = query
    ? stockNames.filter((item) =>
        item.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const url =
    "https://data.alpaca.markets/v1beta1/screener/stocks/most-actives?by=volume&top=100";
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            accept: "application/json",
            "APCA-API-KEY-ID": process.env.REACT_APP_ALPACA_API_KEY,
            "APCA-API-SECRET-KEY": process.env.REACT_APP_ALPACA_API_SECRET,
          },
        });

        const data = await response.json();
        // console.log(data);
        setData(data);
        setGainerStocks(data.most_actives);
        setStockNames(data.most_actives.map((d) => d.symbol));
        // setLoserStocks(data.losers);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>No data fetched</div>;
  console.log("isFocused", isFocused);
  return (
    <div className={show ? "col-11" : "col-12"}>
      <div
        className="scroller d-flex justify-content-end"
        data-animated={
          !window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "true"
            : "false"
        }
      >
        <div className="scroller_inner">
          {stocksAndDuplicates.map((stock, index) => (
            <div className="box" key={index}>
              <div className="d-flex justify-content-between">
                <div>
                  <div class="stock-name">{stock.symbol}</div>
                  <div class="stock-price">{stock.price} $</div>

                  {stock.change < 0 ? (
                    <div class="stock-change" style={{ color: "red" }}>
                      <GoTriangleDown color={"red"} /> {stock.change} (
                      {stock.percent_change} %)
                    </div>
                  ) : (
                    <div class="stock-change" style={{ color: "green" }}>
                      <GoTriangleUp color={"green"} /> {stock.change} (
                      {stock.percent_change} %)
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

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
                <div
                  key={index}
                  data-item={item}
                  onClick={handleItemClick}
                >
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
        <div className="col-7 p-1 mb-2 my-3">
          <StockDiagram symbol={symbol}/>
        </div>
        {/* <div className="col-3 p-1 mb-2 my-3 bg-secondary text-white">5</div> */}
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
