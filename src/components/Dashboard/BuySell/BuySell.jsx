import React, { useState } from "react";
import {
  Box,
  Text,
  Flex,
  Input,
  Select,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  Stack,
} from "@chakra-ui/react";

function BuySell() {
  const [isBuySelected, setBuySelected] = useState(false);
  const [orderType, setOrderType] = useState("");
  const [tradeOption, setTradeOption] = useState("");
  const [timeInForce, setTimeInForce] = useState("");

  const handleOrderChange = (event) => {
    setOrderType(event.target.value);
  };

  const handleTradeOptionChange = (value) => {
    setTradeOption(value);
  };

  const handleTimeInForceChange = (event) => {
    setTimeInForce(event.target.value);
  };
  return (
    <Box
      width={"25%"}
      height={"100%"}
      boxShadow={
        "rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px"
      }
    >
      <Flex m={5}>
        <Flex
          justifyContent={"center"}
          alignItems={"center"}
          width={"50%"}
          backgroundColor={isBuySelected ? "teal" : "none"}
          cursor={"pointer"}
          borderRadius={"5px"}
          onClick={() => {
            setBuySelected(true);
          }}
        >
          <Text color={"white"} fontWeight={"600"} mb={0} p={2}>
            Buy
          </Text>
        </Flex>
        <Flex
          justifyContent={"center"}
          alignItems="center"
          width={"50%"}
          backgroundColor={!isBuySelected ? "teal" : "none"}
          cursor={"pointer"}
          borderRadius={"5px"}
          onClick={() => {
            setBuySelected(false);
          }}
        >
          <Text color={"white"} fontWeight={"600"} mb={0} p={2}>
            Sell
          </Text>
        </Flex>
      </Flex>
      <Box m={10}>
        <Flex justifyContent={"space-between"}>
          <Box width={"50%"}>
            <Text fontWeight={"500"}>Symbol</Text>
            <Input />
          </Box>
          <Box width={"50%"} ml={10}>
            <Text fontWeight={"500"}>Market Price</Text>
            <Text>181.98 $</Text>
          </Box>
        </Flex>
        <Box mt={4}>
          <FormControl>
            <FormLabel htmlFor="order-type">Order Type</FormLabel>
            <Select
              id="order-type"
              value={orderType}
              onChange={handleOrderChange}
            >
              <option value="market">Market</option>
              <option value="limit">Limit</option>
              <option value="stop">Stop</option>
              <option value="stop-limit">Stop Limit</option>
              <option value="trailing-stop">Trailing Stop</option>
            </Select>
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>
              Choose how to {isBuySelected ? "buy" : "sell"}
            </FormLabel>
            <RadioGroup onChange={handleTradeOptionChange} value={tradeOption}>
              <Stack direction="row">
                <Radio value="dollars">Dollars</Radio>
                <Radio value="shares">Shares</Radio>
              </Stack>
            </RadioGroup>
          </FormControl>
        </Box>
        <Flex justifyContent={"space-between"} mt={4}>
          <Box width={"50%"}>
            <Text fontWeight={"500"}>Quantity</Text>
            <Input type="number" />
          </Box>
          <Box width={"50%"} ml={10}>
            <Text fontWeight={"500"}>Estimated Cost</Text>
            <Text>181.98 $</Text>
          </Box>
        </Flex>
        <FormControl mt={4}>
          <FormLabel htmlFor="time-in-force">Time in Force</FormLabel>
          <Select
            id="time-in-force"
            value={timeInForce}
            onChange={handleTimeInForceChange}
          >
            <option value="day">DAY</option>
            <option value="gtc">GTC - Good till Cancelled</option>
            <option value="fok">FOK - Fill or Kill</option>
            <option value="ioc">IOC - Immediate or Cancel</option>
            <option value="opg">At the Open</option>
            <option value="cls">At the Close</option>
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
}

export default BuySell;
