import React from "react";
import { Text, Box, HStack } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import getHistoricalPriceData from "../../../api/fundViewAPIs/getHistoricalPriceData";

const IndexView = () => {
	const indexSymbols = [
		"^GSPC",
		"^DJI",
		"^IXIC",
		"^RUT",
		"^FTSE",
		"^N225",
		"^HSI",
		"^STOXX50E",
		"^VIX",
	];
	const [selectedIndex, setSelectedIndex] = useState("^GSPC");
	const [timeFrame, setTimeFrame] = useState("5D");
	const [data, setData] = useState(null);
	const [isDataReady, setIsDataReady] = useState(false);

	function toYYYYMMDD(date) {
		const year = date.getFullYear();
		const month = date.getMonth() + 1;
		const day = date.getDate();

		const formattedMonth = month < 10 ? `0${month}` : month;
		const formattedDay = day < 10 ? `0${day}` : day;

		return `${year}-${formattedMonth}-${formattedDay}`;
	}

	const loadIndexPriceHistoricalData = async (symbol, end, start) => {
		try {
			const result = await getHistoricalPriceData(symbol, end, start);
			console.log(result);

			setData(
				result.historical.map((stock) => ({
					time: stock.date,
					close: stock.close,
					low: stock.low,
					high: stock.high,
					open: stock.open,
					volume: stock.volume,
				}))
			);

			setIsDataReady(true);
		} catch (error) {
			if (error.name === "FetchError") {
				console.error(
					"Network error or timeout occurred:",
					error.message
				);
			} else {
				console.error("An error occurred:", error.message);
			}
		}
	};
	const fetchData = () => {
		// setLoading(true);
		let end;
		let start;

		switch (timeFrame) {
			case "1D":
				end = new Date();
				start = new Date();
				start.setDate(end.getDate() - 1);

				loadIndexPriceHistoricalData(
					selectedIndex,
					toYYYYMMDD(start),
					toYYYYMMDD(end)
				);
				break;
			case "5D":
				end = new Date();
				start = new Date();
				start.setDate(end.getDate() - 5);
				loadIndexPriceHistoricalData(
					selectedIndex,
					toYYYYMMDD(start),
					toYYYYMMDD(end)
				);
				break;
			case "1M":
				end = new Date();
				start = new Date();
				start.setDate(end.getDate() - 30);
				loadIndexPriceHistoricalData(
					selectedIndex,
					toYYYYMMDD(start),
					toYYYYMMDD(end)
				);
				break;
			case "3M":
				end = new Date();
				start = new Date();
				start.setDate(end.getDate() - 90);
				loadIndexPriceHistoricalData(
					selectedIndex,
					toYYYYMMDD(start),
					toYYYYMMDD(end)
				);
				break;
			case "6M":
				end = new Date();
				start = new Date();
				start.setDate(end.getDate() - 180);
				loadIndexPriceHistoricalData(
					selectedIndex,
					toYYYYMMDD(start),
					toYYYYMMDD(end)
				);
				break;
			case "1Y":
				end = new Date();
				start = new Date();
				start.setDate(end.getDate() - 365);
				loadIndexPriceHistoricalData(
					selectedIndex,
					toYYYYMMDD(start),
					toYYYYMMDD(end)
				);
				break;
			default:
				end = new Date();
				start = new Date();
				start.setDate(end.getDate() - 1);
				loadIndexPriceHistoricalData(
					selectedIndex,
					toYYYYMMDD(start),
					toYYYYMMDD(end)
				);
		}
	};
	useEffect(() => {
		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [timeFrame, selectedIndex]);
	return (
		<HStack
			spacing={6}
			p={4}
			mt={"1%"}
			width={"100%"}
			justifyContent={"space-evenly"}
		>
			{indexSymbols.map((symbol) => (
				<Box
					key={symbol}
					cursor="pointer"
					onClick={() => setSelectedIndex(symbol)}
					fontWeight="semibold"
					position="relative"
				>
					<Text
						borderWidth={"2px"}
						borderRadius={"5"}
						borderColor={"primary"}
						bg={selectedIndex === symbol ? "accentColor" : "none"}
						p={1}
						_hover={{
							bg: "accentColor",
							borderRadius: "5px",
						}}
					>
						{symbol}
					</Text>
				</Box>
			))}
		</HStack>
	);
};
export default IndexView;
