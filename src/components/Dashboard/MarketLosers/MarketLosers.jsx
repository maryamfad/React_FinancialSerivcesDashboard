import { useEffect } from "react";
// import getMostSearchedStocks from "../../../api/getFullQuote";
import "./MarketLosers.css";
// import getMarketLosers from "../../../api/getMarketLosers";
import { marketLosersData } from "../marketLosersData";
// import { MdOutlineExpandMore, MdOutlineExpandLess } from "react-icons/md";
import { LuFoldVertical } from "react-icons/lu";
// import {GoFoldUp, GoFoldDown } from "react-icons/go";
const MarketLosers = ({
  setSymbol,
  gainersTableExpanded,
  setGainersTableExpanded,
  losersTableExpanded,
  setLosersTableExpanded,
}) => {
  // const [marketLosers, setMarketLosers] = useState([]);
  // const loadMarketLosers = async () => {
  //   try {
  //     const result = await getMarketLosers();
  //     console.log(result);
  //     setMarketLosers(result);
  //   } catch (error) {
  //     console.error("Failed to fetch data: ", error);
  //   }
  // };
  useEffect(() => {
    // loadMarketLosers();
  }, []);
  
  return (
    <div
      className={
        losersTableExpanded === true
          ? "losers-card-expanded"
          : gainersTableExpanded
          ? "losers-card"
          : "losers-card-not-expanded"
      }
    >
      <div className="losers-card-title">
        Market Biggest Losers{" "}
        {/* {gainersTableExpanded === true ? ( */}
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
              setGainersTableExpanded(true);
              setLosersTableExpanded(false);
            }}
          >
            <GoFoldDown />
          </div>
        )} */}
      </div>
      <div className="losers-table-container">
        <table>
          <thead>
            <tr className="losers-table-header">
              <th>Symbol</th>
              <th>Name</th>
              <th>Price</th>
              <th>Change</th>
            </tr>
          </thead>
          <tbody>
            {marketLosersData ? (
              marketLosersData?.map((row) => (
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
export default MarketLosers;
