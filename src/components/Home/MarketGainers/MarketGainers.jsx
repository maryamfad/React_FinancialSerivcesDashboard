import { useEffect } from "react";
// import getMostSearchedStocks from "../../../api/getFullQuote";
import "./MarketGainers.css";
// import getMarketGainers from "../../../api/getMarketGainers";
import { marketGainersData } from "../../Home/marketGainersData";
import { AiOutlineRise } from "react-icons/ai";
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
const MarketGainers = ({ setSymbol }) => {
  // const [marketGainers, setMarketGainers] = useState([]);

  // const loadMarketGainers = async () => {
  //   try {
  //     const result = await getMarketGainers();
  //     console.log(result);
  //     setMarketGainers(result);
  //   } catch (error) {
  //     console.error("Failed to fetch data: ", error);
  //   }
  // };
  useEffect(() => {
    // loadMarketGainers();
  }, []);

  return (
    <Table sx={{ "tbody tr:nth-of-type(odd)": { bg: "#F5DBDB" } }}>
      <Thead position="sticky" top={0} zIndex={1}>
        <Tr>
          <Th p={3} pb={1}>
            Symbol
          </Th>
          <Th p={3} pb={1}>
            Name
          </Th>
          <Th p={3} pb={1}>
            Price
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        {marketGainersData ? (
          marketGainersData.map((row) => (
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
                <Flex fontSize="sm" justifyContent="space-evenly">
                  <Box>{row.price}</Box>
                  <Flex
                    justifyContent="space-evenly"
                    alignItems="center"
                    color="#009975"
                  >
                    <Icon as={AiOutlineRise} boxSize={4} />
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
export default MarketGainers;
