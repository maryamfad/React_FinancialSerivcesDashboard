import { useState, useEffect } from "react";
import "./Scroller.css";
// import getLatestQuoteForStock from "../../../api/getLatestQuoteForAStock";
// import getLatestBarForAStock from "../../../api/getLatestBarForAStock";
import getStockLogo from "../../../api/getStockLogo";
import { scrollerData } from "../../Home/scrollerData";
// import getMarketMostActiveStocks from "../../../api/getMarketMostActiveStocks";
import { AiOutlineRise, AiOutlineFall } from "react-icons/ai";
import { Box, Flex } from "@chakra-ui/react";
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
      const promises = scrollerData.map((stock) =>
        loadStockLogo(stock.symbol).then((logo) => ({
          ...stock,
          logo: logo, // Enrich each stock with its logo
        }))
      );

      // Wait for all promises to resolve
      const updatedData = await Promise.all(promises);
      return updatedData; // This is the enriched scroller data
    } catch (error) {
      console.error("Failed to enrich scroller data:", error);
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
    enrichScrollerDataWithLogo()
      .then((updatedData) => {
        setMostActiveStocks(updatedData);
      })
      .catch((error) => {
        // Handle or log error

        console.error("Error in processing:", error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box
      className="scroller"
      // mt={"5%"}
      
      width={"100%"}
      data-animated={
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "true"
          : "false"
      }
    >
      <Flex width={"2000%"} className="scroller_inner">
        {[...mostActiveStocks, ...mostActiveStocks].map((stock, index) => (
          <Box
          bg="#EED3D9"
            p={3}
            ml={3}
            // bg={"white"}
            boxShadow="rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset"
            key={index}
            borderRadius={"5px"}
          >
            <div className="d-flex justify-content-between">
              <div>
                <div className="d-flex justify-content-between">
                  <div
                    className="stock-symbol"
                    onClick={() => setSymbol(stock.symbol)}
                  >
                    {index}-{stock.symbol}
                  </div>
                  <img src={stock.logo} alt="logo" className="stock-logo" />
                </div>
                <div
                  style={
                    stock.change < 0
                      ? { color: "#FF6B6B", backgroundColor:"white",padding:"5", margin:"2", borderRadius:"5px"}
                      : { color: "#009975", backgroundColor:"white",padding:"5", margin:"2" ,borderRadius:"5px"}
                      
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
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

export default Scroller;
