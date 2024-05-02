import { Button, Flex, Box, Heading, Text, Divider } from "@chakra-ui/react";
import Sidebar from "./Sidebar/Sidebar";
import Portfolio from "./Protfolio/Portfolio";

const Dashboard = () => {
  return (
    <Flex  className="dashboard-container" height="100vh" width="100vw" overflowX="hidden">
      <Sidebar />
      <Flex flexDir={"column"} w={"100%"} >
        <Flex>
          <Button
            borderColor={"teal"}
            borderWidth={"2px"}
            m={"10px"}
            onClick={() => window.history.back()}
          >
            Home
          </Button>
        </Flex>
        <Box w={"100%"} >
          {" "}
          <Box p={5}>
            <Heading as="h1" size="xl" textAlign="flex-start" color="#343a40">
              Dashboard
            </Heading>
          </Box>
          
        <Portfolio/>
          <Box
            m={5}
            width={"50%"}
            height={"30%"}
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
                  Recent Orders
                </Text>
              </Box>
             
            </Flex>
            <Divider/>
          </Box>
          <Box
            m={5}
            width={"50%"}
            height={"30%"}
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
            <Divider/>
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
};
export default Dashboard;
