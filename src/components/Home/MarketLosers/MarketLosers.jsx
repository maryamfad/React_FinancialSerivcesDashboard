import { useEffect } from "react";
// import getMostSearchedStocks from "../../../api/getFullQuote";
import "./MarketLosers.css";
// import getMarketLosers from "../../../api/getMarketLosers";
import { marketLosersData } from "../../Home/marketLosersData";
// import { MdOutlineExpandMore, MdOutlineExpandLess } from "react-icons/md";
import { AiOutlineFall } from "react-icons/ai";
// import {GoFoldUp, GoFoldDown } from "react-icons/go";
import {
  Box,
  Flex,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Icon,
} from "@chakra-ui/react";
const MarketLosers = ({ setSymbol }) => {
  // const [marketLosers, setMarketLosers] = useState([]);
  // const loadMarketLosers = async () => {
  //   try {
  //     const result = await getMarketLosers();
  //     console.log(result);
  //     setMarketLosers(result);
  //   } catch (error) {
  //     console.error("Failed to fetch data: ", error);
  //   }
  // };
  useEffect(() => {
    // loadMarketLosers();
  }, []);

  return (
    <Box
      boxShadow={
        "rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px"
      }
      height={{
        base: "300px",
        sm: "300px",
        md: "300px",
        lg: "200px",
        xl: "200px",
      }}
    >
      <Text fontWeight={500} fontSize={"18px"} ml={2} mt={2} mb={1}>
        Market Biggest Losers
      </Text>

      <Box
        height={{ base: "78%", sm: "78%",md:"78%", lg: "80%", xl: "80%" }}
        overflowY={"auto"}
        overflowX={{ base: "hidden", md: "auto" }}
      >
        <Table variant="simple">
          <Thead position={"sticky"}>
            <Tr>
              <Th>Symbol</Th>
              <Th>Name</Th>
              <Th>Price</Th>
            </Tr>
          </Thead>
          <Tbody>
            {marketLosersData ? (
              marketLosersData.map((row) => (
                <Tr key={row.symbol}>
                  <Td
                    cursor="pointer"
                    color="blue"
                    fontSize="sm"
                    p={2}
                    pl={4}
                    onClick={() => setSymbol(row.symbol)}
                  >
                    {row.symbol}
                  </Td>
                  <Td fontSize="sm" p={2}>
                    {row.name}
                  </Td>
                  <Td p={2}>
                    <Flex fontSize="sm" justifyContent={"space-evenly"}>
                      <Box>{row.price}</Box>
                      <Flex
                        justifyContent="space-evenly"
                        alignItems="center"
                        color="green"
                      >
                        <Icon as={AiOutlineFall} boxSize={4} />
                        <Text>{row.change}</Text>
                      </Flex>
                    </Flex>
                  </Td>
                </Tr>
              ))
            ) : (
              <Tr>
                <Td colSpan="3">
                  <Text textAlign="center">
                    There is no data to show for now!
                  </Text>
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};
export default MarketLosers;
