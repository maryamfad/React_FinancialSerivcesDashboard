import { Box, Flex, Text, Button, Divider } from "@chakra-ui/react";

const Portfolio = () => {
  return (
    <Box
      m={5}
      mb={0}
      // height={"auto"}
      flexGrow={1}
      boxShadow={
        "rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px"
      }
      borderRadius={"5px"}
    >
      <Flex m={5} p={5} mb={0} pb={0} justifyContent={"space-between"}>
        <Box width={"50%"}>
          <Text fontWeight={500} fontSize={"18px"}>
            {" "}
            Your Protfolio
          </Text>
        </Box>
        <Flex width={"50%"} justifyContent={"space-evenly"}>
          <Button>1D</Button>
          <Button>1M</Button>
          <Button>1Y</Button>
          <Button>All</Button>
        </Flex>
      </Flex>
      <Divider />
      <Box>
        <Flex ml={5} mt={5}>
          <Text mb={0} fontSize={"18px"} fontWeight={"500"}>
            $ 100,002.88
          </Text>
          <Text mb={0} fontSize={"16px"} fontWeight={"400"} ml={5}>
            +0.00%
          </Text>
        </Flex>
        <Flex ml={10} fontSize={"14px"} fontWeight={"bold"} color={"gray"}>
          May 01, 03:21 PM EDT
        </Flex>
      </Box>
      <Box></Box>
    </Box>
  );
};
export default Portfolio;
