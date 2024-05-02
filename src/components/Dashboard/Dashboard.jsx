import { Button, Flex, Box, Heading } from "@chakra-ui/react";
import Sidebar from "./Sidebar/Sidebar";
import Portfolio from "./Protfolio/Portfolio";
import Orders from "./Orders/Orders";
import Positions from "./Positions/Positions";
import BuySell from "./BuySell/BuySell";
import BuyingPower from "./BuyingPower/BuyingPower";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    let navigate = useNavigate();
  return (
    <Flex
      className="dashboard-container"
      height="100vh"
      width="100vw"
      overflowX="hidden"
      
    >
      <Sidebar />
      <Flex flexDir={"column"} w={"100%"}  >
        <Flex>
          <Button
            borderColor={"teal"}
            borderWidth={"2px"}
            m={"10px"}
            onClick={() => navigate("/home")}
          >
            Home
          </Button>
        </Flex>
        <Box w={"100%"}  >
          <Box p={5}>
            <Heading as="h1" size="xl" textAlign="flex-start" color="#343a40">
              Dashboard
            </Heading>
          </Box>
          <Flex>
            <Flex flexDir={"column"} width={"50%"}>
              <BuyingPower />
              <Portfolio />
            </Flex>
            <Orders />
            <BuySell />
          </Flex>
          
          <Positions />
        </Box>
      </Flex>
    </Flex>
  );
};
export default Dashboard;
