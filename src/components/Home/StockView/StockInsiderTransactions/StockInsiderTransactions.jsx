import { useState, useEffect } from "react";
import getStockInsiderTransactions from "../../../../api/stockViewAPIs/getStockInsiderTransactions";
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
	Divider,
	Image,
} from "@chakra-ui/react";

const StockInsiderTransactions = ({ symbol, stockLogo }) => {
	const [stocksInsiderTransactions, setStocksInsiderTransactions] = useState(
		[]
	);

	const loadStocksInsiderTransactions = async (stockSymbol) => {
		try {
			const result = await getStockInsiderTransactions(stockSymbol);
			const first100Result = result.data.slice(0, 100)
			console.log("result", first100Result);

			setStocksInsiderTransactions(first100Result);
		} catch (error) {
			console.error("Failed to fetch data: ", error);
		}
	};
	useEffect(() => {
		loadStocksInsiderTransactions(symbol);
	}, [symbol]);
	return (
		<Box
			height="100%"
			borderRadius="10px"
			borderColor={"primary"}
			borderWidth={"1px"}
		>
			<Flex>
				<Text
					m={0}
					pl={3}
					pt={2}
					pb={1}
					fontWeight={"bold"}
					fontSize={"18px"}
				>
					Stock Insider Transactions
				</Text>
				<Text
					fontSize={"md"}
					fontWeight={"bold"}
					m={0}
					pl={"15%"}
					pt={2}
					pb={1}
				>
					{symbol}
				</Text>
				<Image
					backgroundColor={"accentColor"}
					ml={"15%"}
					pt={2}
					pb={1}
					src={stockLogo}
					alt="logo"
					width={"5%"}
					height={"auto"}
					objectFit={"cover"}
					borderRadius={"5px"}
					padding={1}
				/>
			</Flex>
			<Divider p={0} m={0} />
			<Flex height={"300px"} overflow={"auto"} mb={4}>
				<Table sx={{ "tbody tr:nth-of-type(odd)": { bg: "accentColor" } }}>
					<Thead position="sticky" top={0} zIndex={1}>
						<Tr>
							<Th p={1} pb={2} pl={2}>
								Transaction Date
							</Th>
							<Th p={1} pb={2}>
								Executive
							</Th>
							<Th p={1} pb={2}>
								Executive Title
							</Th>
							<Th p={1} pb={2}>
								Security Type
							</Th>
							<Th p={1} pb={2}>
								Share Price
							</Th>
							<Th p={1} pb={2}>
								Shares
							</Th>
							<Th p={1} pb={2}>
								Acquisition or Disposal
							</Th>
						</Tr>
					</Thead>
					<Tbody>
						{stocksInsiderTransactions ? (
							stocksInsiderTransactions.map((row, index) => (
								<Tr key={index}>
									<Td>{row.transaction_date}</Td>
									<Td fontSize="sm" p={0}>
										{row.executive}
									</Td>
									<Td p={0}>{row.executive_title}</Td>
									<Td fontSize="sm" p={0}>
										{row.security_type}
									</Td>
									<Td p={0}>{row.share_price}</Td>
									<Td fontSize="sm" p={0}>
										{row.shares}
									</Td>
									<Td p={0}>{row.acquisition_or_disposal}</Td>
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
			</Flex>
		</Box>
	);
};
export default StockInsiderTransactions;
