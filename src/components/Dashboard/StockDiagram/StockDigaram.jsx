import React from "react";
import { useState, useEffect } from "react";
import "../Dashboard.css";
import LinearChart from "./LinearChart";
function StockDiagram({symbol}) {
  // const [symbol, setSymbol] = useState("AMZN");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isDataReady, setIsDataReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [timeFrame, setTimeFrame] = useState("1D");
  const [barTimeFrame, setBarTimeFrame] = useState("1Min");

  function toYYYYMMDD(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedDay = day < 10 ? `0${day}` : day;

    return `${year}-${formattedMonth}-${formattedDay}`;
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      let end;
      let start;

      switch (timeFrame) {
        case "1D":
          end = new Date();
          start = new Date();
          start.setDate(end.getDate() - 1);
          setBarTimeFrame("1Min");
          break;
        case "5D":
          end = new Date();
          start = new Date();
          start.setDate(end.getDate() - 5);
          setBarTimeFrame("10Min");
          break;
        case "1M":
          end = new Date();
          start = new Date();
          start.setDate(end.getDate() - 30);
          setBarTimeFrame("1Day");
          break;
        case "3M":
          end = new Date();
          start = new Date();
          start.setDate(end.getDate() - 90);
          setBarTimeFrame("1Week");
          break;
        case "6M":
          end = new Date();
          start = new Date();
          start.setDate(end.getDate() - 180);
          setBarTimeFrame("1Month");
          break;
        case "1Y":
          end = new Date();
          start = new Date();
          start.setDate(end.getDate() - 365);
          setBarTimeFrame("1Month");
          break;
        default:
          end = new Date();
          start = new Date();
          start.setDate(end.getDate() - 1);
          setBarTimeFrame("1Min");
      }
      
      try {
        const response = await fetch(
          `https://data.alpaca.markets/v2/stocks/${symbol}/bars?timeframe=${barTimeFrame}&start=${toYYYYMMDD(
            start
          )}&end=${toYYYYMMDD(
            end
          )}&limit=1000&adjustment=raw&feed=iex&sort=asc`,
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
console.log(data);
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

    fetchData();
  }, [timeFrame, symbol]);

  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>Errorrrr: {error}</div>;

 
  return (
    <div>
      {isDataReady ? (
        <div className="diagram-card">
          {" "}
          <h2 className="title">{symbol}</h2>
          <div className="d-flex justify-content-end">
            <div className="time-frame-buttons d-flex justify-content-between col-4">
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
