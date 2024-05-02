import { Box, Flex, Text, Divider } from "@chakra-ui/react";
const Positions = () => {
  return (
    <Box
      m={5}
      mb={10}
      width={"50%"}
      minHeight={"300px"}
      overflow={"auto"}
      boxShadow={
        "rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px"
      }
      borderRadius={"5px"}
    >
      {" "}
      <Flex m={5} p={5} mb={0} pb={0} justifyContent={"space-between"}>
        <Box width={"50%"}>
          <Text fontWeight={500} fontSize={"18px"}>
            {" "}
            Top Positions
          </Text>
        </Box>
      </Flex>
      <Divider />
    </Box>
  );
};
export default Positions;
