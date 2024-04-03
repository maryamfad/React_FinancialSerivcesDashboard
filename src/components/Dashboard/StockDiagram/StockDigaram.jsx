import React from "react";
import { useState, useEffect } from "react";
import "./StockDiagram.css";
import LinearChart from "./LinearChart";
import getLatestBarForAStock from "../../../api/getLatestBarForAStock";
import getStockLogo from "../../../api/getStockLogo";
function StockDiagram({ symbol, stockLogo }) {
  // const [symbol, setSymbol] = useState("AMZN");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isDataReady, setIsDataReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [timeFrame, setTimeFrame] = useState("1D");
  const [stockLatestBar, setStockLatestBar] = useState(null);
  
  // const [barTimeFrame, setBarTimeFrame] = useState("1Min");
  let barTimeFrame = "1Min";

  function toYYYYMMDD(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedDay = day < 10 ? `0${day}` : day;

    return `${year}-${formattedMonth}-${formattedDay}`;
  }
  const loadLatestBarForAStock = async (symbol) => {
    try {
      const result = await getLatestBarForAStock(symbol);
      // console.log(result);
      setStockLatestBar(result.bar);
    } catch (error) {
      console.error("Failed to fetch data: ", error);
    }
  };

  // const loadStockLogo = async (symbol) => {
  //   try {
  //     const result = await getStockLogo(symbol);
  //     console.log('logo',result);
  //     setStockLogo(result);
  //   } catch (error) {
  //     console.error("Failed to fetch data: ", error);
  //   }
  // };
  const fetchData = async () => {
    setLoading(true);
    let end;
    let start;

    switch (timeFrame) {
      case "1D":
        end = new Date();
        start = new Date();
        start.setDate(end.getDate() - 1);
        barTimeFrame = "1Min";
        break;
      case "5D":
        end = new Date();
        start = new Date();
        start.setDate(end.getDate() - 5);
        barTimeFrame = "10Min";
        break;
      case "1M":
        end = new Date();
        start = new Date();
        start.setDate(end.getDate() - 30);
        barTimeFrame = "1Day";
        break;
      case "3M":
        end = new Date();
        start = new Date();
        start.setDate(end.getDate() - 90);
        barTimeFrame = "1Week";
        break;
      case "6M":
        end = new Date();
        start = new Date();
        start.setDate(end.getDate() - 180);
        barTimeFrame = "1Month";
        break;
      case "1Y":
        end = new Date();
        start = new Date();
        start.setDate(end.getDate() - 365);
        barTimeFrame = "1Month";
        break;
      default:
        end = new Date();
        start = new Date();
        start.setDate(end.getDate() - 1);
        barTimeFrame = "1Min";
    }

    try {
      const response = await fetch(
        `https://data.alpaca.markets/v2/stocks/${symbol}/bars?timeframe=${barTimeFrame}&start=${toYYYYMMDD(
          start
        )}&end=${toYYYYMMDD(end)}&limit=1000&adjustment=raw&feed=iex&sort=asc`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            "APCA-API-KEY-ID": process.env.REACT_APP_ALPACA_API_KEY,
            "APCA-API-SECRET-KEY": process.env.REACT_APP_ALPACA_API_SECRET,
          },
        }
      );

      const data = await response.json();
      // console.log("barTimeFrame", barTimeFrame);
      // console.log('data',data);
      setData(
        data.bars.map((stock) => ({
          time: stock.t,
          close: stock.c,
          low: stock.l,
          high: stock.h,
          open: stock.o,
          volume: stock.v,
        }))
      );
      setIsDataReady(true);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
    loadLatestBarForAStock(symbol);
    // loadStockLogo(symbol);
  }, [timeFrame, symbol]);

  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>Errorrrr: {error}</div>;

  return (
    <div className="diagram-card">
      {isDataReady ? (
        <div >
          {" "}
          <div className="stock-name-container">
          <div className="title">{symbol}</div>
          <img src={stockLogo} alt="logo" class="stock-logo" />
          </div>
         
          {/* <div className="stock-details-container">
            
            <div className="stock-info">
              <div>
                <div class="info-item">
                  <span>Last Close Price:</span> {stockLatestBar.c}
                </div>
                <div class="info-item">
                  <span>Open Price:</span> {stockLatestBar.o}
                </div>
              </div>
              <div>
                <div class="info-item">
                  <span>High Price:</span> {stockLatestBar.h}
                </div>
                <div class="info-item">
                  <span>Low Price:</span> {stockLatestBar.l}
                </div>
              </div>
              <div>
                <div class="info-item">
                  <span>Average Volume:</span> {stockLatestBar.vw}
                </div>
                <div class="info-item">
                  <span>Volume:</span> {stockLatestBar.v}
                </div>
              </div>
              <div>
                <div class="info-item">
                  <span>Number of Transactions:</span> {stockLatestBar.n}
                </div>
                <div class="info-item">
                  <span>As of:</span> {stockLatestBar.t}
                </div>
              </div>
           
            </div>

           
          </div> */}
       
          <div className="timeframe-container">
            <div className="timeframe-buttons ">
              <div onClick={() => setTimeFrame("1D")}>1D</div>
              <div onClick={() => setTimeFrame("5D")}>5D</div>
              <div onClick={() => setTimeFrame("1M")}>1M</div>
              <div onClick={() => setTimeFrame("3M")}>3M</div>
              <div onClick={() => setTimeFrame("6M")}>6M</div>
              <div onClick={() => setTimeFrame("1Y")}>1Y</div>
            </div>
          </div>
          <div className="chart-container">
            <LinearChart data={data} timeFrame={timeFrame} />
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default StockDiagram;
