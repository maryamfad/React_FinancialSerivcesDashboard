import { useState, useEffect } from "react";
// import getMostSearchedStocks from "../../../api/getFullQuote";
import "./MarketBiggestLosers.css";
import getMarketBiggestLosers from "../../../api/getMarketBiggestLosers";
const MarketBiggestLosers = ({ setSymbol }) => {
  const [marketBiggestLosers, setMarketBiggestLosers] = useState([]);
  const loadMarketBiggestLosers = async () => {
    try {
      const result = await getMarketBiggestLosers();
      console.log(result);
      setMarketBiggestLosers(result);
    } catch (error) {
      console.error("Failed to fetch data: ", error);
    }
  };
  useEffect(() => {
    // loadMarketBiggestLosers();
  }, []);
  return (
    <div className="biggest-losers-card">
      <div className="biggest-losers-card-title">Market Biggest Losers</div>
      <div className="biggest-losers-table-container">
        <table>
          <thead>
            <tr className="biggest-losers-table-header">
              <th>Symbol</th>
              <th>Name</th>
              <th>Price</th>
              <th>Change</th>
            </tr>
          </thead>
          <tbody>
            {marketBiggestLosers? marketBiggestLosers?.map((row) => (
              <tr key={row.symbol}>
                <td
                  style={{ color: "blue", cursor: "pointer" }}
                  onClick={() => setSymbol(row.symbol)}
                >
                  {row.symbol}
                </td>
                <td>{row.name}</td>
                <td>{row.price}</td>
                <td>
                  {row.change}({row.changesPercentage.toFixed(2)})
                </td>
              </tr>
            )):<div>There is no data to show for now!!</div>}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default MarketBiggestLosers;
