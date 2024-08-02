import { Box, Flex, Text, Divider } from "@chakra-ui/react";
const Positions = () => {
  return (
    <Box
      mb={5}
      width={{ base: "100%", sm: "100%", md: "100%", lg: "45%", xl: "45%" }}
      minHeight={{
        base: "100px",
        sm: "100px",
        md: "100px",
        lg: "300px",
        xl: "300px",
      }}
      overflow={"auto"}
      boxShadow="rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px"
			borderColor={"dashboardPrimary"}
			borderWidth={"2px"}
			borderRadius={"10px"}
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
