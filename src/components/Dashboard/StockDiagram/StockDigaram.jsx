import React from "react";
import { useState, useEffect } from "react";
import "../Dashboard.css";
import LinearChart from "./LinearChart";
function StockDiagram() {
  const [symbol, setSymbol] = useState("AAPL");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isDataReady, setIsDataReady] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://data.alpaca.markets/v2/stocks/${symbol}/bars?timeframe=1Min&start=2022-01-03T00%3A00%3A00Z&end=2022-01-04T00%3A00%3A00Z&limit=1000&adjustment=raw&feed=sip&sort=asc`,
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

        setData(
          data.bars.map((stock) => ({
            time:
              new Date(stock.t).getHours().toString().padStart(2, "0") +
              ":" +
              new Date(stock.t).getMinutes().toString().padStart(2, "0"),
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

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  //   if (!data) return <div>No data fetched</div>;
  const datatemp = [
    { time: "08:00", close: 10 },
    { time: "09:00", close: 15 },
    { time: "10:00", close: 30 },
    { time: "11:00", close: 50 },
    { time: "12:00", close: 40 },
  ];
  return (
    <div>
      {isDataReady ? (
        <div className="diagram-card">
          {" "}
          <h2 className="title">{symbol}</h2>
          <div className="chart-container">
            <LinearChart data={data} />
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default StockDiagram;
