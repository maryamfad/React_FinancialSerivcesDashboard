import { useEffect } from "react";
// import getMostSearchedStocks from "../../../api/getFullQuote";
import "./MarketGainers.css";
// import getMarketGainers from "../../../api/getMarketGainers";
import { marketGainersData } from "../marketGainersData";
import { AiOutlineRise } from "react-icons/ai";
// import { MdOutlineExpandMore, MdOutlineExpandLess } from "react-icons/md";
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

  return (
    <div className="gainers-card">
      <div className="gainers-card-title">Market Biggest Gainers</div>

      <div className="gianer-table-container">
        <table>
          <thead>
            <tr className="gianer-table-header">
              <th style={{ width: "100px" }}>Symbol</th>
              <th style={{ width: "100px" }}>Name</th>
              <th style={{ width: "100px" }}>Price</th>
            </tr>
          </thead>
          <tbody>
            {marketGainersData ? (
              marketGainersData?.map((row) => (
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
                    {" "}
                    <div>
                      <div style={{ fontWeight: "bold" }}>{row.price}</div>
                      <div
                        style={{
                          color: "green",
                          display: "flex",
                          justifyContent: "space-evenly",
                          alignItems: "center",
                        }}
                      >
                        {" "}
                        [<AiOutlineRise size={"18px"} /> {row.change}]
                      </div>
                      {/* <div style={{ color: "green" }}>
                        ({row.changesPercentage.toFixed(2)})
                      </div> */}
                    </div>
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
