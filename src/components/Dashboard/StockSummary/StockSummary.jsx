import { useState, useEffect } from "react";
import getFullQuote from "../../../api/getFullQuote";
import "./StockSummary.css";
const StockSummary = ({ symbol }) => {
  const [stockSummary, setStockSummary] = useState([]);

  const loadStockSummaryData = async (stockSymbol) => {
    try {
      const result = await getFullQuote(stockSymbol);
      console.log(result);
      setStockSummary(result[0]);
    } catch (error) {
      console.error("Failed to fetch data: ", error);
    }
  };
  useEffect(() => {
    loadStockSummaryData(symbol);
  }, [symbol]);
  return (
    <div className="stock-summary-card">
      <div className="stock-summary-title">Summary</div>
      <div className="stock-summary-table-container">
      <div className="summary-row">
          <div className="first-col"><span>Name:</span> {stockSummary.name}</div>
          <div className="second-col"><span>Exchange:</span> {stockSummary.exchange}</div>
        </div>
        <div className="summary-row">
          <div className="first-col"> <span>Price:</span> {stockSummary.price}</div>
          <div className="second-col"><span>Change:</span> {stockSummary.change}</div>
        </div>
        <div className="summary-row">
          <div className="first-col"><span>High:</span> {stockSummary.dayHigh}</div>
          <div className="second-col"><span>Low:</span> {stockSummary.dayLow}</div>
        </div>
        <div className="summary-row">
          <div className="first-col"><span>Market Cap:</span> {stockSummary.marketCap}</div>
          <div className="second-col"><span>open:</span> {stockSummary.open}</div>
        </div>
        <div className="summary-row">
          <div className="first-col"><span>Prevouse Close:</span> {stockSummary.previousClose}</div>
          <div className="second-col"><span>Price:</span> {stockSummary.price}</div>
        </div>
        <div className="summary-row">
          <div className="first-col"><span>Volume:</span> {stockSummary.volume}</div>
          <div className="second-col"><span>Average Volume:</span> {stockSummary.avgVolume}</div>
        </div>
        
      </div>
    </div>
  );
};
export default StockSummary;
