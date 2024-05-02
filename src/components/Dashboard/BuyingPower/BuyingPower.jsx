import { Box, Flex, Text } from "@chakra-ui/react";

const BuyingPower = () => {
  return (
    <Box
      ml={5}
      mr={5}
      height={"20%"}
      boxShadow={
        "rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px"
      }
    >
      <Flex justifyContent={"space-around"} pt={5}>
        <Box>
          <Text fontWeight={"600"} fontSize={"large"}>
            Buying Power
          </Text>
          <Text fontWeight={"500"} color={"#343a40"}>
            199.432.06 $
          </Text>
        </Box>
        <Box>
          <Text fontWeight={"600"}>Cash</Text>
          <Text fontWeight={"500"} color={"#343a40"}>
            99.743.16 $
          </Text>
        </Box>
        <Box>
          <Text fontWeight={"600"}>Daily Change</Text>
          <Text fontWeight={"500"} color={"#343a40"}>
            +0.02 $
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};
export default BuyingPower;
