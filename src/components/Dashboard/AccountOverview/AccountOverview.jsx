import { Box, Flex, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getAccountOverview } from "../../../services/UserServices";
import getUserIdFromToken from "../../../util/getUserIdFromToken";

const AccountOverview = () => {
  // const [errorMessage, setErrorMessage] = useState("");
  // const [loading, setLoading] = useState(true);
  const [accountOverview, setAccountOverview] = useState({});
  const userId = getUserIdFromToken();

  useEffect(() => {
    getAccountOverviewInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getAccountOverviewInfo = () => {
    getAccountOverview(userId)
      .then((data) => {
        setAccountOverview(data);
        // setLoading(false);
      })
      .catch((error) => {
        // setLoading(false);
        if (error.status === 400) {
          // setErrorMessage("Username or password is incorrect");
        } else {
          // setErrorMessage(error.message || "An unexpected error occurred.");
        }
      });
  };
  return (
    <Box
      mb={5}
      height={{ base: "auto", sm: "auto", md: "20%", lg: "20%", xl: "20%" }}
      boxShadow="rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px"
			borderColor={"dashboardPrimary"}
			borderWidth={"2px"}
			borderRadius={"10px"}
      p={5}
      role="region"
      aria-label="Financial Overview"
    >
      <Flex
        justifyContent={{
          base: "space-between",
          sm: "space-between",
          md: "space-around",
        }}
        direction={{ base: "column", sm: "column", md: "row" }}
        alignItems="center"
      >
        <Box
          textAlign="center"
          mb={{ base: 3, sm: 3, md: 0 }}
          aria-label="Account Balance"
        >
          <Text
            fontWeight="600"
            fontSize="large"
            // bg="#FFD700"
            p={1}
            borderRadius="5px"
            // boxShadow="0px 1px 3px rgba(0, 0, 0, 0.2)"
            // borderColor={"dashboardSecondary"}
            // borderWidth={"2px"}
            bg={"dashboardSecondary"}
          >
            Balance
          </Text>
          <Text fontWeight="500" color="#343a40">
            {Number(accountOverview.balance).toFixed(2)} $
          </Text>
        </Box>
        {/* <Box
          textAlign="center"
          mb={{ base: 3, sm: 3, md: 0 }}
          aria-label="Buying Power"
        >
          <Text
            fontWeight="600"
            fontSize="large"
            borderColor={"dashboardSecondary"}
            borderWidth={"2px"}
            p={1}
            borderRadius="5px"
            boxShadow="0px 1px 3px rgba(0, 0, 0, 0.2)"
            bg={"dashboardSecondary"}
          >
            Buying Power
          </Text>
          <Text fontWeight="500" color="#343a40">
            {accountOverview.buyingPower} $
          </Text>
        </Box> */}
        <Box
          textAlign="center"
          mb={{ base: 3, sm: 3, md: 0 }}
          aria-label="Cash"
        >
          <Text
            fontWeight="600"
            fontSize="large"
            // borderColor={"dashboardSecondary"}
            // borderWidth={"2px"}
            p={1}
            borderRadius="5px"
            // boxShadow="0px 1px 3px rgba(0, 0, 0, 0.2)"
            bg={"dashboardSecondary"}
          >
            Cash
          </Text>
          <Text fontWeight="500" color="#343a40">
            {accountOverview.cash} $
          </Text>
        </Box>
        <Box textAlign="center" aria-label="Daily Change">
          <Text
            fontWeight="600"
            fontSize="large"
            // borderColor={"dashboardSecondary"}
            // borderWidth={"2px"}
            p={1}
            borderRadius="5px"
            // boxShadow="0px 1px 3px rgba(0, 0, 0, 0.2)"
            bg={"dashboardSecondary"}
          >
            Daily Change
          </Text>
          <Text fontWeight="500" color="#343a40">
            {accountOverview.dailyChange}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};
export default AccountOverview;
