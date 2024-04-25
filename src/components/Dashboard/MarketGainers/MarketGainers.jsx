import {  useEffect } from "react";
// import getMostSearchedStocks from "../../../api/getFullQuote";
import "./MarketGainers.css";
// import getMarketGainers from "../../../api/getMarketGainers";

import { marketGainersData } from "../marketGainersData";
// import { MdOutlineExpandMore, MdOutlineExpandLess } from "react-icons/md";
import { LuFoldVertical } from "react-icons/lu";
// import {GoFoldUp, GoFoldDown } from "react-icons/go";
const MarketGainers = ({
  setSymbol,
  gainersTableExpanded,
  setGainersTableExpanded,
  losersTableExpanded,
  setLosersTableExpanded,
}) => {
  // const [marketGainers, setMarketGainers] = useState([]);

  // const loadMarketGainers = async () => {
  //   try {
  //     const result = await getMarketGainers();
  //     console.log(result);
  //     setMarketGainers(result);
  //   } catch (error) {
  //     console.error("Failed to fetch data: ", error);
  //   }
  // };
  useEffect(() => {
    // loadMarketGainers();
  }, []);
  console.log("gainersTableExpanded", gainersTableExpanded);
  return (
    <div
      className={
        gainersTableExpanded === true
        ? "gainers-card-expanded"
        : losersTableExpanded
        ? "gainers-card"
        : "gainers-card-not-expanded"
      }
    >
      <div className="gainers-card-title">
        Market Biggest Gainers{" "}
        {/* {losersTableExpanded === true ? ( */}
          <div
            className="primary expand-icon"
            onClick={() => {
              setGainersTableExpanded(!gainersTableExpanded);
              setLosersTableExpanded(!losersTableExpanded);
            }}
          >
            <LuFoldVertical />
          </div>
        {/* ) : (
          <div
            className="primary expand-icon"
            onClick={() => {
              setGainersTableExpanded(false);
              setLosersTableExpanded(true);
            }}
          >
            <GoFoldUp />
          </div>
        )} */}
      </div>

      <div className="gianer-table-container">
        <table>
          <thead>
            <tr className="gianer-table-header">
              <th>Symbol</th>
              <th>Name</th>
              <th>Price</th>
              <th>Change</th>
            </tr>
          </thead>
          <tbody>
            {marketGainersData ? (
              marketGainersData?.map((row) => (
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
export default MarketGainers;
