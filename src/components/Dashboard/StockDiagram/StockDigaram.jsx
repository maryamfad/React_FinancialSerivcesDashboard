import React from "react";
import { useState, useEffect } from "react";
import "./StockDiagram.css";
import LinearChart from "./LinearChart";
// import getLatestBarForAStock from "../../../api/getLatestBarForAStock";
// import getStockLogo from "../../../api/getStockLogo";
import getTodayHistoricalChart from "../../../api/getTodayHistoricalChart";
import getEndOfDayHistorical from "../../../api/getEndOfDayHistorical";
function StockDiagram({ symbol, stockLogo }) {
  // const [symbol, setSymbol] = useState("AMZN");
  const [data, setData] = useState(null);
  // const [error, setError] = useState(null);
  const [isDataReady, setIsDataReady] = useState(false);
  // const [loading, setLoading] = useState(false);
  const [timeFrame, setTimeFrame] = useState("1D");

  function toYYYYMMDD(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedDay = day < 10 ? `0${day}` : day;

    return `${year}-${formattedMonth}-${formattedDay}`;
  }

  const loadTodayHistoricalChart = async (symbol, today) => {
    try {
      const result = await getTodayHistoricalChart(symbol, today);
      setData(
        result.map((stock) => ({
          time: new Date(stock.date).toISOString().split(" ")[0],
          close: stock.close,
          low: stock.low,
          high: stock.high,
          open: stock.open,
          volume: stock.volume,
        }))
      );
      console.log("dataaaa", data);
      setIsDataReady(true);
    } catch (error) {
      // setError(error.message);
    } finally {
      // setLoading(false);
    }
  };

  const loadEndOfDayHistorical = async (symbol, end, start) => {
    try {
      const result = await getEndOfDayHistorical(symbol, end, start);
      setData(
        result.historical.map((stock) => ({
          time: stock.date,
          close: stock.close,
          low: stock.low,
          high: stock.high,
          open: stock.open,
          volume: stock.volume,
        }))
      );
      console.log("data22222", data);
      setIsDataReady(true);
    // } catch (error) {
      // setError(error.message);
    } finally {
      // setLoading(false);
    }
  };

  const fetchData = () => {
    // setLoading(true);
    let end;
    let start;

    switch (timeFrame) {
      case "1D":
        let today = new Date();
        // start = new Date();
        // start.setDate(end.getDate() - 1);

        loadTodayHistoricalChart(symbol, toYYYYMMDD(today));
        break;
      case "5D":
        end = new Date();
        start = new Date();
        start.setDate(end.getDate() - 5);
        loadEndOfDayHistorical(symbol, toYYYYMMDD(start), toYYYYMMDD(end));
        break;
      case "1M":
        end = new Date();
        start = new Date();
        start.setDate(end.getDate() - 30);
        loadEndOfDayHistorical(symbol, toYYYYMMDD(start), toYYYYMMDD(end));
        break;
      case "3M":
        end = new Date();
        start = new Date();
        start.setDate(end.getDate() - 90);
        loadEndOfDayHistorical(symbol, toYYYYMMDD(start), toYYYYMMDD(end));
        break;
      case "6M":
        end = new Date();
        start = new Date();
        start.setDate(end.getDate() - 180);
        loadEndOfDayHistorical(symbol, toYYYYMMDD(start), toYYYYMMDD(end));
        break;
      case "1Y":
        end = new Date();
        start = new Date();
        start.setDate(end.getDate() - 365);
        loadEndOfDayHistorical(symbol, toYYYYMMDD(start), toYYYYMMDD(end));
        break;
      default:
        end = new Date();
        start = new Date();
        start.setDate(end.getDate() - 1);
        loadEndOfDayHistorical(symbol, toYYYYMMDD(start), toYYYYMMDD(end));
    }
  };
  useEffect(() => {
    fetchData();
  }, [timeFrame, symbol]);

  return (
    <div className="diagram-card">
      {/* <div> */}{" "}
      <div className="stock-name-container">
        <div className="title">{symbol}</div>
        <img src={stockLogo} alt="logo" class="stock-logo" />
      </div>
      <div className="timeframe-container">
        <div className="timeframe-buttons ">
          <div className={timeFrame === "1D" ? "selected" : ""} onClick={() => setTimeFrame("1D")}>1D</div>
          <div className={timeFrame === "5D" ? "selected" : ""} onClick={() => setTimeFrame("5D")}>5D</div>
          <div className={timeFrame === "1M" ? "selected" : ""} onClick={() => setTimeFrame("1M")}>1M</div>
          <div className={timeFrame === "3M" ? "selected" : ""} onClick={() => setTimeFrame("3M")}>3M</div>
          <div className={timeFrame === "6M" ? "selected" : ""} onClick={() => setTimeFrame("6M")}>6M</div>
          <div className={timeFrame === "1Y" ? "selected" : ""} onClick={() => setTimeFrame("1Y")}>1Y</div>
        </div>
      </div>
      {isDataReady ? (
        <div>
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
