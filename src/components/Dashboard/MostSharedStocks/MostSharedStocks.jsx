import { useState, useEffect } from "react";
import getMostSearchedStocks from "../../../api/getMostSearchedStock";
import "../Dashboard.css";
const MostSharedStocks = ({ setSymbol }) => {
  const [mostSearchedStocks, setMostSearchedStocks] = useState([]);
  const loadMostSearchedStocks = async () => {
    try {
      const result = await getMostSearchedStocks();
      setMostSearchedStocks(result);
    } catch (error) {
      console.error("Failed to fetch data: ", error);
    }
  };
  useEffect(() => {
    loadMostSearchedStocks();
  }, []);
  return (
    <div className="most-shared-card">
      <div className="most-shared-card-title">Most Searched Stocks</div>
      <div className="table-container">
        <table>
          <thead>
            <tr className="table-header">
              <th>Symbol</th>
              <th>Name</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {mostSearchedStocks.map((row) => (
              <tr key={row.symbol} onClick={() => setSymbol(row.symbol)}>
                <td>{row.symbol}</td>
                <td>{row.name}</td>
                <td>{row.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default MostSharedStocks;
