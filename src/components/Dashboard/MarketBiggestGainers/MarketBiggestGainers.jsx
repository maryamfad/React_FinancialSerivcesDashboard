import { useState, useEffect } from "react";
// import getMostSearchedStocks from "../../../api/getFullQuote";
import "./MarketBiggestGainers.css";
import getMarketBiggestGainers from "../../../api/getMarketBiggestGainers";
import { marketBiggestGainersData } from "../marketBiggestGainersData";
import { MdOutlineExpandMore } from "react-icons/md";
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
    // loadMarketBiggestGainers();
  }, []);
  return (
    <div className="biggest-gainers-card">
      <div className="biggest-gainers-card-title">
        Market Biggest Gainers{" "}
        {/* <div className="primary expand-icon">
          <MdOutlineExpandMore />
        </div> */}
      </div>

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
            {marketBiggestGainersData ? (
              marketBiggestGainersData?.map((row) => (
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
                    {/* {row.change}({row.changesPercentage.toFixed(2)}) */}
                  </td>
                </tr>
              ))
            ) : (
              <div>There is no data to show for now!!</div>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default MarketBiggestGainers;
