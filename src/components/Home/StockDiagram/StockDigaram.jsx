import React from "react";
import { useState, useEffect } from "react";
import LinearChart from "./LinearChart";
// import getLatestBarForAStock from "../../../api/getLatestBarForAStock";
// import getStockLogo from "../../../api/getStockLogo";
import getTodayHistoricalChart from "../../../api/getTodayHistoricalChart";
import getEndOfDayHistorical from "../../../api/getEndOfDayHistorical";
import { Flex, Text, Box, Image } from "@chakra-ui/react";
function StockDiagram({ symbol, stockLogo }) {
  // const [symbol, setSymbol] = useState("AMZN");
  const [data, setData] = useState(null);
  // const [error, setError] = useState(null);
  const [isDataReady, setIsDataReady] = useState(false);
  // const [loading, setLoading] = useState(false);
  const [timeFrame, setTimeFrame] = useState("1D");

  function toYYYYMMDD(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedDay = day < 10 ? `0${day}` : day;

    return `${year}-${formattedMonth}-${formattedDay}`;
  }

  const loadTodayHistoricalChart = async (symbol, today) => {
    try {
      const result = await getTodayHistoricalChart(symbol, today);
      if (!Array.isArray(result) || result.length === 0 || !result) {
        throw new Error("Invalid or empty result received from the API");
      }
      setData(
        result
          .map((stock) => ({
            time: new Date(stock.date).toISOString().split(" ")[0],
            close: stock.close,
            low: stock.low,
            high: stock.high,
            open: stock.open,
            volume: stock.volume,
          }))
          
      );

      // console.log("data",data);

      setIsDataReady(true);
    } catch (error) {
      // setError(error.message);
      if (error.name === 'FetchError') {
        console.error('Network error or timeout occurred:', error.message);
    } else {
        console.error('An error occurred:', error.message);
    }
    } 
    finally {
      // setLoading(false);
    }
  };

  const loadEndOfDayHistorical = async (symbol, end, start) => {
    try {
      const result = await getEndOfDayHistorical(symbol, end, start);
      if (!Array.isArray(result) || result.length === 0 || !result) {
        throw new Error("Invalid or empty result received from the API");
      }
      setData(
        result.historical.map((stock) => ({
          time: stock.date,
          close: stock.close,
          low: stock.low,
          high: stock.high,
          open: stock.open,
          volume: stock.volume,
        }))
      );

      setIsDataReady(true);
      // } catch (error) {
      // setError(error.message);
    } catch(error) {
      if (error.name === 'FetchError') {
        console.error('Network error or timeout occurred:', error.message);
    } else {
        console.error('An error occurred:', error.message);
    }
      // throw error
      // setLoading(false);
    }
  };

  const fetchData = () => {
    // setLoading(true);
    let end;
    let start;

    switch (timeFrame) {
      case "1D":
        let today = new Date();
        // start = new Date();
        // start.setDate(end.getDate() - 1);

        loadTodayHistoricalChart(symbol, toYYYYMMDD(today));
        break;
      case "5D":
        end = new Date();
        start = new Date();
        start.setDate(end.getDate() - 5);
        loadEndOfDayHistorical(symbol, toYYYYMMDD(start), toYYYYMMDD(end));
        break;
      case "1M":
        end = new Date();
        start = new Date();
        start.setDate(end.getDate() - 30);
        loadEndOfDayHistorical(symbol, toYYYYMMDD(start), toYYYYMMDD(end));
        break;
      case "3M":
        end = new Date();
        start = new Date();
        start.setDate(end.getDate() - 90);
        loadEndOfDayHistorical(symbol, toYYYYMMDD(start), toYYYYMMDD(end));
        break;
      case "6M":
        end = new Date();
        start = new Date();
        start.setDate(end.getDate() - 180);
        loadEndOfDayHistorical(symbol, toYYYYMMDD(start), toYYYYMMDD(end));
        break;
      case "1Y":
        end = new Date();
        start = new Date();
        start.setDate(end.getDate() - 365);
        loadEndOfDayHistorical(symbol, toYYYYMMDD(start), toYYYYMMDD(end));
        break;
      default:
        end = new Date();
        start = new Date();
        start.setDate(end.getDate() - 1);
        loadEndOfDayHistorical(symbol, toYYYYMMDD(start), toYYYYMMDD(end));
    }
  };
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeFrame, symbol]);

  return (
    <Flex
      flexDir={"column"}
      // justifyContent={"space-between"}
      bg={"white"}
      borderRadius={"10px"}
      boxShadow={
        "rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px"
      }
      mt={5}
      height={"95%"}
    >
      <Flex
        justifyContent={"space-evenly"}
        alignItems={"center"}
        mt={4}
        mb={4}
        borderRadius={"5px"}
        width={"60%"}
        alignSelf={"center"}
        bg="accentColor"
      >
        <Text fontSize={"md"} fontWeight={"bold"} mb={0}>
          {symbol}
        </Text>

        <Image
          src={stockLogo}
          alt="logo"
          width={"10%"}
          height={"auto"}
          objectFit={"cover"}
          borderRadius={"5px"}
          padding={1}
        />
      </Flex>
      {/* <Divider m={0} /> */}
      <Flex justifyContent={"flex-end"} pr={5} mt={5}>
        <Flex justifyContent={"space-between"} cursor={"pointer"} width={"50%"}>
          <Text
            m={0}
            color={timeFrame === "1D" && "#007BFF"}
            fontWeight={timeFrame === "1D" && "bold"}
            onClick={() => setTimeFrame("1D")}
          >
            1D
          </Text>
          <Text
            m={0}
            color={timeFrame === "5D" && "#007BFF"}
            fontWeight={timeFrame === "5D" && "bold"}
            onClick={() => setTimeFrame("5D")}
          >
            5D
          </Text>
          <Text
            m={0}
            color={timeFrame === "1M" && "#007BFF"}
            fontWeight={timeFrame === "1M" && "bold"}
            onClick={() => setTimeFrame("1M")}
          >
            1M
          </Text>
          <Text
            m={0}
            color={timeFrame === "3M" && "#007BFF"}
            fontWeight={timeFrame === "3M" && "bold"}
            onClick={() => setTimeFrame("3M")}
          >
            3M
          </Text>
          <Text
            m={0}
            color={timeFrame === "6M" && "#007BFF"}
            fontWeight={timeFrame === "6M" && "bold"}
            onClick={() => setTimeFrame("6M")}
          >
            6M
          </Text>
          <Text
            m={0}
            color={timeFrame === "1Y" && "#007BFF"}
            fontWeight={timeFrame === "1Y" && "bold"}
            onClick={() => setTimeFrame("1Y")}
          >
            1Y
          </Text>
        </Flex>
      </Flex>
      {isDataReady ? (
        <Box>
          <Box>
            <LinearChart data={data} timeFrame={timeFrame} />
          </Box>
        </Box>
      ) : (
        <Text>Loading...</Text>
      )}
    </Flex>
  );
}

export default StockDiagram;
