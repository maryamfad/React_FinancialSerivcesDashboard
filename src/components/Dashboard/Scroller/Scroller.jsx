import { useState, useEffect } from "react";
import "./Scroller.css";
// import getLatestQuoteForStock from "../../../api/getLatestQuoteForAStock";
// import getLatestBarForAStock from "../../../api/getLatestBarForAStock";
import getStockLogo from "../../../api/getStockLogo";
import { scrollerData } from "../scrollerData";
// import getMarketMostActiveStocks from "../../../api/getMarketMostActiveStocks";
import { AiOutlineRise, AiOutlineFall } from "react-icons/ai";
// import { color } from "d3";

const Scroller = ({ setSymbol }) => {
  const [mostActiveStocks, setMostActiveStocks] = useState([]);
  // console.log(scrollerData);
  // const loadMostActiveStocksData = async () => {
  //   try {
  //     const result = await getMarketMostActiveStocks();
  //     // console.log(result);
  //     // setMostActiveStocks(result);
  //     return result;
  //   } catch (error) {
  //     console.error("Failed to fetch data: ", error);
  //   }
  // };

  async function enrichScrollerDataWithLogo() {
    try {
      // const scrollerData = await loadMostActiveStocksData(); // Fetch initial scroller data
  
      // Map over scrollerData to fetch logos
      const promises = scrollerData.map(stock =>
        loadStockLogo(stock.symbol)
          .then(logo => ({
            ...stock,
            logo: logo // Enrich each stock with its logo
          }))
      );
  
      // Wait for all promises to resolve
      const updatedData = await Promise.all(promises);
      return updatedData; // This is the enriched scroller data
    } catch (error) {
      console.error('Failed to enrich scroller data:', error);
      throw error; // Rethrow or handle as needed
    }
  }

    const loadStockLogo = async (symbol) => {
    try {
      const result = await getStockLogo(symbol);
      // console.log('logo',result);
      // setStockLogo(result);
      return result;
    } catch (error) {
      console.error("Failed to fetch data: ", error);
    }
  };

  useEffect(() => {
    // loadMostActiveStocksData();
    enrichScrollerDataWithLogo().then(updatedData => {
      setMostActiveStocks(updatedData)
      console.log("updatedData",updatedData); // Logs the enriched data
    }).catch(error => {
      // Handle or log error
      console.error('Error in processing:', error);
    });
  }, []);

  return (
    <div
      className="scroller"
      data-animated={
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "true"
          : "false"
      }
    >
      <div className="scroller_inner">
        {[...mostActiveStocks,...mostActiveStocks].map((stock, index) => (
          <div className="box" key={index}>
            <div className="d-flex justify-content-between">
              <div>
                <div className="d-flex justify-content-between">
                <div
                  class="stock-symbol"
                  onClick={() => setSymbol(stock.symbol)}
                >
                  {index}-
                  {stock.symbol}
                </div>
                <img src={stock.logo} alt="logo" class="stock-logo" />
                </div>
                <div
                  className="stock-change-value"
                  style={
                    stock.change < 0
                      ? { color: "#FF6B6B" }
                      : { color: "#009975" }
                  }
                >
                  {stock.change < 0 ? (
                    <AiOutlineFall size={"25px"} />
                  ) : (
                    <AiOutlineRise size={"25px"} />
                  )}
                  {stock.change} ({stock.changesPercentage} %)
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Scroller;
