import { useState, useEffect } from "react";
import StockDiagram from "./StockDiagram/StockDigaram";
import "./Dashboard.css";
import { GoTriangleUp, GoTriangleDown } from "react-icons/go";

const Dashboard = ({ show }) => {
  const [gainerStocks, setGainerStocks] = useState([]);
  const [loserStocks, setLoserStocks] = useState([]);
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

  const url =
    "https://data.alpaca.markets/v1beta1/screener/stocks/movers?top=10";
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
        setData(data);
        setGainerStocks(data.gainers);
        setLoserStocks(data.losers);
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
            <div className="box">
              <div className="d-flex justify-content-between">
                <div>
                  <div class="stock-name">{stock.symbol}</div>
                  <div class="stock-price">{stock.price} $</div>

                  {stock.change < 0 ? <div class="stock-change" style={{ color:  "red"}} >
                    
                    <GoTriangleDown  color={"red"}
                     />{" "}
                    {stock.change} ({stock.percent_change} %)
                  </div>:
                  <div class="stock-change" style={{ color:   "green"}} >
                    
                    <GoTriangleUp color={"green"} />{" "}
                    {stock.change} ({stock.percent_change} %)
                  </div>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="h-50 d-flex flex-row justify-content-evenly">
        <div className="col-7 p-1 mb-2 my-3">
          <StockDiagram />
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
