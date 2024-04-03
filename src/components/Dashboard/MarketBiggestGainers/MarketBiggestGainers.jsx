import { useState, useEffect } from "react";
// import getMostSearchedStocks from "../../../api/getFullQuote";
import "./MarketBiggestGainers.css";
import getMarketBiggestGainers from "../../../api/getMarketBiggestGainers";
const MarketBiggestGainers = ({ setSymbol }) => {
  const [marketBiggestGainers, setMarketBiggestGainers] = useState([]);
  const loadMarketBiggestGainers = async () => {
    try {
      const result = await getMarketBiggestGainers();
      console.log(result);
      setMarketBiggestGainers(result);
    } catch (error) {
      console.error("Failed to fetch data: ", error);
    }
  };
  useEffect(() => {
    loadMarketBiggestGainers();
  }, []);
  return (
    <div className="biggest-gainers-card">
      <div className="biggest-gainers-card-title">Market Biggest Gainers</div>
      <div className="biggest-gianer-table-container">
        <table>
          <thead>
            <tr className="biggest-gianer-table-header">
              <th>Symbol</th>
              <th>Name</th>
              <th>Price</th>
              <th>Change</th>
            </tr>
          </thead>
          <tbody>
            {marketBiggestGainers.map((row) => (
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default MarketBiggestGainers;
