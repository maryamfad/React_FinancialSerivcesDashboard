import { useState, useEffect } from "react";
import getFullQuote from "../../../api/getFullQuote";
import { Box, Divider, Flex, Text } from "@chakra-ui/react";
const StockSummary = ({ symbol }) => {
  const [stockSummary, setStockSummary] = useState([]);

  const loadStockSummaryData = async (stockSymbol) => {
    try {
      const result = await getFullQuote(stockSymbol);
      setStockSummary(result[0]);
    } catch (error) {
      console.error("Failed to fetch data: ", error);
    }
  };
  useEffect(() => {
    loadStockSummaryData(symbol);
  }, [symbol]);
  return (
    <Box
      height={"100%"}
      boxShadow={
        "rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px"
      }
    >
      <Text pl={5} pt={1} fontWeight={500} fontSize={"18px"}>
        Summary
      </Text>
      <Flex
        p={5}
        flexDir={"column"}
        height={"90%"}
        justifyContent={"space-between"}
        backgroundColor={"#f9f9f9"}
        border={"1px solid #dee2e6"}
      >
        <Flex
          justifyContent={"space-between"}
          alignItems={"center"}
          width={"100%"}
          height={"100%"}
          borderBottom={"1px solid #dee2e6"}
        >
          <Flex width={"50%"} justifyContent={"space-between"} pl={3} pr={3}>
            <Text fontWeight={"500"}>Name:</Text> {stockSummary?.name}
          </Flex>
          <Flex width={"50%"} justifyContent={"space-between"} pl={3} pr={3}>
            <Text fontWeight={"500"}>Exchange:</Text> {stockSummary?.exchange}
          </Flex>
        </Flex>
        <Flex
          justifyContent={"space-between"}
          alignItems={"center"}
          width={"100%"}
          height={"100%"}
          borderBottom={"1px solid #dee2e6;"}
        >
          <Flex width={"50%"} justifyContent={"space-between"} pl={3} pr={3}>
            {" "}
            <Text fontWeight={"500"}>Price:</Text>{" "}
            <Text>{stockSummary?.price}</Text>
          </Flex>
          <Flex width={"50%"} justifyContent={"space-between"} pl={3} pr={3}>
            <Text fontWeight={"500"}>Change:</Text> {stockSummary?.change}
          </Flex>
        </Flex>
        <Flex
          justifyContent={"space-between"}
          alignItems={"center"}
          width={"100%"}
          height={"100%"}
          borderBottom={"1px solid #dee2e6"}
        >
          <Flex width={"50%"} justifyContent={"space-between"} pl={3} pr={3}>
            <Text fontWeight={"500"}>High:</Text>{" "}
            <Text>{stockSummary?.dayHigh}</Text>
          </Flex>
          <Flex width={"50%"} justifyContent={"space-between"} pl={3} pr={3}>
            <Text fontWeight={"500"}>Low:</Text>{" "}
            <Text>{stockSummary?.dayLow}</Text>
          </Flex>
        </Flex>
        <Flex
          justifyContent={"space-between"}
          alignItems={"center"}
          width={"100%"}
          height={"100%"}
          borderBottom={"1px solid #dee2e6;"}
        >
          <Flex width={"50%"} justifyContent={"space-between"} pl={3} pr={3}>
            <Text fontWeight={"500"}>Market Cap:</Text>{" "}
            <Text>{stockSummary?.marketCap}</Text>
          </Flex>
          <Flex width={"50%"} justifyContent={"space-between"} pl={3} pr={3}>
            <Text fontWeight={"500"}>open:</Text>
            <Text>{stockSummary?.open}</Text>
          </Flex>
        </Flex>
        <Flex
          justifyContent={"space-between"}
          alignItems={"center"}
          width={"100%"}
          height={"100%"}
          borderBottom={"1px solid #dee2e6;"}
        >
          <Flex width={"50%"} justifyContent={"space-between"} pl={3} pr={3}>
            <Text fontWeight={"500"}>Prevouse Close:</Text>{" "}
            <Text>{stockSummary?.previousClose}</Text>
          </Flex>
          <Flex width={"50%"} justifyContent={"space-between"} pl={3} pr={3}>
            <Text fontWeight={"500"}>Price:</Text>{" "}
            <Text>{stockSummary?.price}</Text>
          </Flex>
        </Flex>
        <Flex
          justifyContent={"space-between"}
          alignItems={"center"}
          width={"100%"}
          height={"100%"}
        >
          <Flex width={"50%"} justifyContent={"space-between"} pl={3} pr={3}>
            <Text fontWeight={"500"}>Volume:</Text>
            <Text>{stockSummary?.volume}</Text>
          </Flex>
          <Flex width={"50%"} justifyContent={"space-between"} pl={3} pr={3}>
            <Text fontWeight={"500"}>Average Volume:</Text>
            <Text> {stockSummary?.avgVolume}</Text>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};
export default StockSummary;
