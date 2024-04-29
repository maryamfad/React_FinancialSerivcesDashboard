import { useEffect } from "react";
// import getMostSearchedStocks from "../../../api/getFullQuote";
import "./MarketLosers.css";
// import getMarketLosers from "../../../api/getMarketLosers";
import { marketLosersData } from "../../Home/marketLosersData";
// import { MdOutlineExpandMore, MdOutlineExpandLess } from "react-icons/md";
import { AiOutlineFall } from "react-icons/ai";
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
    <div className="losers-card">
      <div className="losers-card-title">Market Biggest Losers </div>
      <div className="losers-table-container">
        <table>
          <thead>
            <tr className="losers-table-header">
              <th style={{ width: "100px" }}>Symbol</th>
              <th style={{ width: "100px" }}>Name</th>
              <th style={{ width: "100px" }}>Price</th>
              {/* <th>Change</th> */}
            </tr>
          </thead>
          <tbody>
            {marketLosersData ? (
              marketLosersData?.map((row) => (
                <tr key={row.symbol}>
                  <td
                    style={{
                      color: "blue",
                      cursor: "pointer",
                      fontSize: "14px",
                      fontWeight: "500",
                    }}
                    onClick={() => setSymbol(row.symbol)}
                  >
                    {row.symbol}
                  </td>
                  <td style={{ fontSize: "14px", fontWeight: "500" }}>
                    {row.name}
                  </td>
                  <td>
                    <div>
                      <div style={{ fontWeight: "bold" }}>{row.price}</div>
                      <div
                        style={{
                          color: "red",
                          display: "flex",
                          justifyContent: "space-evenly",
                          alignItems: "center",
                        }}
                      >
                        {" "}
                        [<AiOutlineFall size={"18px"} />
                        {row.change}]
                      </div>
                      {/* <div style={{ color: "red" }}>
                        ({row.changesPercentage.toFixed(2)})
                      </div> */}
                    </div>
                  </td>
                  {/* <td>
                    
                  </td> */}
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
