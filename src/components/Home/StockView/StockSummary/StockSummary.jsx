import { useState, useEffect } from "react";
import getFullQuote from "../../../../api/stockViewAPIs/getFullQuote";
import { Box, Flex, Text, Icon, Divider, Image } from "@chakra-ui/react";
import {
	FaDollarSign,
	FaChartLine,
	FaBuilding,
	FaCaretUp,
	FaCaretDown,
	FaChartBar,
} from "react-icons/fa";

const StockSummary = ({ symbol, stockLogo }) => {
	const [stockSummary, setStockSummary] = useState([]);

	const loadStockSummaryData = async (stockSymbol) => {
		try {
			const result = await getFullQuote(stockSymbol);
			setStockSummary(result[0]);
		} catch (error) {
			console.error("Failed to fetch data: ", error);
		}
	};
	useEffect(() => {
		loadStockSummaryData(symbol);
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
					Stock News
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
					ml={"5%"}
					pt={2}
					pb={1}
					src={stockLogo}
					alt="logo"
					width={"10%"}
					height={"auto"}
					objectFit={"cover"}
					borderRadius={"5px"}
					padding={1}
				/>
			</Flex>
			<Divider p={0} m={0} />
			<Flex
				flexDir="column"
				bg="white"
				borderRadius="10px"
				boxShadow={
					"rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px"
				}
				borderColor={"#F1D7D7"}
			>
				{[
					{
						label: "Name",
						value: stockSummary?.name,
						icon: FaBuilding,
					},
					{
						label: "Exchange",
						value: stockSummary?.exchange,
						icon: FaChartBar,
					},
					{
						label: "Price",
						value: stockSummary?.price,
						icon: FaDollarSign,
					},
					{
						label: "Change",
						value: stockSummary?.change,
						icon:
							stockSummary?.change > 0 ? FaCaretUp : FaCaretDown,
						color:
							stockSummary?.change > 0 ? "green.500" : "red.500",
					},
					{
						label: "High",
						value: stockSummary?.dayHigh,
						icon: FaChartLine,
					},
					{
						label: "Low",
						value: stockSummary?.dayLow,
						icon: FaChartLine,
					},
					{
						label: "Market Cap",
						value: stockSummary?.marketCap,
						icon: FaBuilding,
					},
					{
						label: "Open",
						value: stockSummary?.open,
						icon: FaDollarSign,
					},
					{
						label: "Previous Close",
						value: stockSummary?.previousClose,
						icon: FaDollarSign,
					},
					{
						label: "Volume",
						value: stockSummary?.volume,
						icon: FaChartBar,
					},
					{
						label: "Average Volume",
						value: stockSummary?.avgVolume,
						icon: FaChartBar,
					},
				].map((item, index) => (
					<Flex
						key={index}
						justifyContent="space-between"
						alignItems="center"
						borderBottom="1px solid #dee2e6"
						pr={3}
						pl={3}
						_last={{ borderBottom: "none" }}
						bg={index % 2 === 0 ? "accentColor" : "white"}
					>
						<Flex alignItems="center">
							<Icon
								as={item.icon}
								mr={2}
								mb={2}
								mt={1}
								color={item.color || "gray.600"}
							/>
							<Text fontWeight={600} mt={1}>
								{item.label}:
							</Text>
						</Flex>
						<Text
							mt={1}
							color={item.color || "#475344"}
							fontWeight={"500"}
						>
							{item.value}
						</Text>
					</Flex>
				))}
			</Flex>
		</Box>
	);
};
export default StockSummary;
