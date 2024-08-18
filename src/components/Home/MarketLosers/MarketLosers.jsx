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
    <Table
      sx={{ "tbody tr:nth-of-type(odd)": { bg: "accentColor" } }}
    >
      <Thead position={"sticky"} mt={0} pt={0}>
      <Tr>
          <Th p={1} pb={2} pl={2}>
            Symbol
          </Th>
          <Th p={1} pb={2}>
            Name
          </Th>
          <Th p={1} pb={2}>
            Price
          </Th>
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
                p={0}
                pl={4}
                onClick={() => setSymbol(row.symbol)}
              >
                {row.symbol}
              </Td>
              <Td fontSize="sm" p={0}>
                {row.name}
              </Td>
              <Td p={0}>
                <Flex fontSize="sm" justifyContent={"space-evenly"}>
                  <Box>{row.price}</Box>
                  <Flex
                    justifyContent="space-evenly"
                    alignItems="center"
                    color="#FF6B6B"
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
              <Text textAlign="center">There is no data to show for now!</Text>
            </Td>
          </Tr>
        )}
      </Tbody>
    </Table>
  );
};
export default MarketLosers;
