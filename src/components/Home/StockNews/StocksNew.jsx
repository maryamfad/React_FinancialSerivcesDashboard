import { useState, useEffect } from "react";
import getStocksNews from "../../../api/getStocksNews";
import "./StockNews.css";
import { Box, Divider, Flex, Image, Text } from "@chakra-ui/react";
const StockNews = ({ symbol }) => {
  const [stocksNews, setStocksNews] = useState([]);

  const loadStocksList = async (stockSymbol) => {
    try {
      const result = await getStocksNews(stockSymbol);

      setStocksNews(result.feed);
    } catch (error) {
      console.error("Failed to fetch data: ", error);
    }
  };
  useEffect(() => {
    loadStocksList(symbol);
  }, [symbol]);
  return (
    <Box
      // m={5}
      // mt={5}
      // width={{ sm:"100%", base: "50%", md: "100%", lg: "50%" }}
      // width={{
      //   base: "90%",
      //   sm: "90%",
      //   md: "95%",
      //   lg: "50%",
      //   xl: "50%",
      // }}
      // pr={{base: 5, sm:5, md:5}}
      bg={"white"}
      height={"50vh"}
      overflow={"auto"}
      boxShadow={
        "rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px"
      }
    >
      <Flex pt={5} pl={5}>
        <Text fontWeight={500} fontSize={"18px"}>
          Latest Stock News
        </Text>
      </Flex>
      <Divider mt={0} pt={"0"} />
      <Flex flexDir={"column"} gap={"20px"} height={"100%"}>
        {stocksNews ? (
          stocksNews.map((feed, index) => (
            <Flex
              gap={"15px"}
              pr={3}
              pl={"3"}
              mb={3}
              pb={"3"}
              borderBottom={"1px solid #eee"}
              key={index}
            >
              <Image
                src={feed.banner_image}
                alt="News"
                width={"120px"}
                height={"80px"}
                objectFit={"cover"}
                borderRadius={"5px"}
              />
              <div className="news-feed">
                <div className="news-title">
                  <a href={feed.url} rel="noopener noreferrer" target="_blank">
                    {feed.title}
                  </a>
                </div>
                <p className="news-summary">{feed.summary}</p>
                <a
                  href={feed.url}
                  rel="noopener noreferrer"
                  target="_blank"
                  className="news-link"
                >
                  Read More
                </a>
                <span className="news-date">{feed.time_published}</span>
              </div>
            </Flex>
          ))
        ) : (
          <div className="stock-news-placeholder">
            <div className="placeholder-message">
              Sorry there is no feed for this stock right now.
            </div>
          </div>
        )}
      </Flex>
    </Box>
  );
};
export default StockNews;
