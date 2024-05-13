import { Box, Flex, Text, Divider } from "@chakra-ui/react";

const Watchlist = () => {
  return (
    <Box
      mb={5}
      ml={6}
      width={{ base: "100%", sm: "100%", md: "100%", lg: "52%", xl: "52%" }}
      minHeight={{
        base: "100px",
        sm: "100px",
        md: "100px",
        lg: "300px",
        xl: "300px",
      }}
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
            Watchlist
          </Text>
        </Box>
      </Flex>
      <Divider />
    </Box>
  );
};
export default Watchlist;
