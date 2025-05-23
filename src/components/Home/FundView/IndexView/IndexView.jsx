import React from "react";
import { Text, Box, Flex, Divider, Wrap, WrapItem } from "@chakra-ui/react";
import { useState, useEffect, useMemo } from "react";
import { throttle } from "lodash";
import getHistoricalPriceData from "../../../../api/fundViewAPIs/getHistoricalPriceData";
import MultiIndexDiagram from "./MultiIndexDiagram";
import IndexClosePriceDiagram from "./IndexClosePriceDigram";
import { Select } from "@chakra-ui/react";
import * as d3 from "d3";
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
	const [selectedIndexes, setSelectedIndexes] = useState(["^GSPC"]);
	const [timeFrame, setTimeFrame] = useState("5D");
	const [dataMap, setDataMap] = useState({});
	const [selectedIndex, setSelectedIndex] = useState("^GSPC");
	const [isDataReady, setIsDataReady] = useState({});
	const [dataForOneIndex, setDataForOneIndex] = useState({});
	const [isDataForOneIndexReady, setDataForOneIndexReady] = useState({});
	const colorScale = d3.scaleOrdinal(d3.schemeTableau10).domain(indexSymbols);

	function toYYYYMMDD(date) {
		const year = date.getFullYear();
		const month = date.getMonth() + 1;
		const day = date.getDate();

		const formattedMonth = month < 10 ? `0${month}` : month;
		const formattedDay = day < 10 ? `0${day}` : day;

		return `${year}-${formattedMonth}-${formattedDay}`;
	}

	const getCombinedChartData = (dataMap, indexSymbols) => {
		const dateMap = new Map();

		Object.entries(dataMap).forEach(([symbol, data]) => {
			if (!data) return;

			data.forEach((point) => {
				if (!dateMap.has(point.time)) {
					dateMap.set(point.time, { date: point.time });
				}
				const entry = dateMap.get(point.time);

				// Create a sub-object for the symbol if it doesn't exist yet
				if (!entry[symbol]) entry[symbol] = {};

				entry[symbol] = {
					open: point.open,
					high: point.high,
					low: point.low,
					close: point.close,
					volume: point.volume,
					changePercent: point.changePercent,
				};
			});
		});

		return Array.from(dateMap.values()).sort((a, b) =>
			a.date.localeCompare(b.time)
		);
	};

	const throttledFetchAllData = useMemo(() => {
		return throttle(async (selectedIndexes, timeFrame) => {
			const end = new Date();
			const start = new Date();
			const days =
				{
					"5D": 5,
					"1M": 30,
					"3M": 90,
					"6M": 180,
					"1Y": 365,
					"5Y": 365 * 5,
				}[timeFrame] || 5;
			start.setDate(end.getDate() - days);

			const promises = selectedIndexes.map(async (symbol) => {
				try {
					const result = await getHistoricalPriceData(
						symbol,
						toYYYYMMDD(start),
						toYYYYMMDD(end)
					);
					const formatted = result.map((stock) => ({
						time: stock.date,
						close: stock.close,
						low: stock.low,
						high: stock.high,
						open: stock.open,
						volume: stock.volume,
						changePercent: stock.changePercent,
					}));
					return { symbol, formatted };
				} catch (error) {
					console.error("Error loading data for", symbol, error);
					return { symbol, formatted: [] };
				}
			});
			const results = await Promise.all(promises);
			setDataMap((prev) => {
				const updated = { ...prev };
				results.forEach(({ symbol, formatted }) => {
					updated[symbol] = formatted;
				});
				return updated;
			});

			setIsDataReady((prev) => {
				const updated = { ...prev };
				results.forEach(({ symbol }) => {
					updated[symbol] = true;
				});
				return updated;
			});
		}, 1000); // only one call every 1000ms
	}, []);

	const throttledFetchDataForOneSignal = useMemo(() => {
		return throttle(async (selectedIndex, timeFrame) => {
			const end = new Date();
			const start = new Date();
			const days =
				{
					"5D": 5,
					"1M": 30,
					"3M": 90,
					"6M": 180,
					"1Y": 365,
					"5Y": 365 * 5,
				}[timeFrame] || 5;
			start.setDate(end.getDate() - days);

			try {
				const result = await getHistoricalPriceData(
					selectedIndex,
					toYYYYMMDD(start),
					toYYYYMMDD(end)
				);
				const formatted = result.map((stock) => ({
					time: stock.date,
					close: stock.close,
					low: stock.low,
					high: stock.high,
					open: stock.open,
					volume: stock.volume,
					changePercent: stock.changePercent,
				}));
				setDataForOneIndex(formatted);
				setDataForOneIndexReady(true);
				return { selectedIndex, formatted };
			} catch (error) {
				console.error("Error loading data for", selectedIndex, error);
				return { selectedIndex, formatted: [] };
			}
		}, 1000);
	}, []);
	useEffect(() => {
		throttledFetchDataForOneSignal("^GSPC", timeFrame);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	useEffect(() => {
		return () => {
			throttledFetchAllData.cancel(); // from lodash
		};
	}, [throttledFetchAllData]);

	useEffect(() => {
		// Clean old data for unselected symbols
		setDataMap((prev) => {
			const filtered = {};
			for (const symbol of selectedIndexes) {
				if (prev[symbol]) {
					filtered[symbol] = prev[symbol];
				}
			}
			return filtered;
		});

		setIsDataReady((prev) => {
			const filtered = {};
			for (const symbol of selectedIndexes) {
				if (prev[symbol]) {
					filtered[symbol] = prev[symbol];
				}
			}
			return filtered;
		});

		throttledFetchAllData(selectedIndexes, timeFrame);
	}, [selectedIndexes, timeFrame, throttledFetchAllData]);

	const combinedData = getCombinedChartData(dataMap);

	const handleSymbolChange = (event) => {
		const symbol = event.target.value;
		setSelectedIndex(symbol);
		throttledFetchDataForOneSignal(symbol, timeFrame);
	};
	return (
		<Flex direction={{ base: "column", md: "row" }}>
			<Box
				borderWidth={"1px"}
				borderColor={"primary"}
				borderRadius={5}
				width={{ base: "90%", md: "48%" }}
				m={5}
			>
				<Text
					m={0}
					pl={3}
					pt={2}
					pb={1}
					fontWeight={"bold"}
					fontSize={"18px"}
				>
					Index Change Percentage Comparison
				</Text>
				<Divider p={0} m={0} />
				<Wrap spacing={{ base: "1", md: "4" }} mt="1%" justify="center">
					{indexSymbols.map((symbol) => (
						<WrapItem key={symbol}>
							<Box
								cursor="pointer"
								onClick={() =>
									setSelectedIndexes((prev) =>
										prev.includes(symbol)
											? prev.filter((s) => s !== symbol)
											: [...prev, symbol]
									)
								}
								position="relative"
							>
								<Text
									borderColor="primary"
									bg={
										selectedIndexes.includes(symbol)
											? colorScale(symbol)
											: "none"
									}
									fontWeight={"semibold"}
									_hover={{
										bg: colorScale(symbol),
										borderRadius: "5px",
									}}
									px={2}
									py={1}
									borderRadius="md"
									textAlign="center"
								>
									{symbol}
								</Text>
							</Box>
						</WrapItem>
					))}
				</Wrap>
				<Flex
					justifyContent={"flex-end"}
					cursor={"pointer"}
					width={"50%"}
				>
					<Text
						m={0}
						pl={"5%"}
						color={timeFrame === "5D" && "#007BFF"}
						fontWeight={timeFrame === "5D" && "bold"}
						onClick={() => setTimeFrame("5D")}
					>
						5D
					</Text>
					<Text
						m={0}
						pl={"5%"}
						color={timeFrame === "1M" && "#007BFF"}
						fontWeight={timeFrame === "1M" && "bold"}
						onClick={() => setTimeFrame("1M")}
					>
						1M
					</Text>
					<Text
						m={0}
						pl={"5%"}
						color={timeFrame === "3M" && "#007BFF"}
						fontWeight={timeFrame === "3M" && "bold"}
						onClick={() => setTimeFrame("3M")}
					>
						3M
					</Text>
					<Text
						m={0}
						pl={"5%"}
						color={timeFrame === "6M" && "#007BFF"}
						fontWeight={timeFrame === "6M" && "bold"}
						onClick={() => setTimeFrame("6M")}
					>
						6M
					</Text>
					<Text
						m={0}
						pl={"5%"}
						color={timeFrame === "1Y" && "#007BFF"}
						fontWeight={timeFrame === "1Y" && "bold"}
						onClick={() => setTimeFrame("1Y")}
					>
						1Y
					</Text>
					<Text
						m={0}
						pl={"5%"}
						color={timeFrame === "5Y" && "#007BFF"}
						fontWeight={timeFrame === "5Y" && "bold"}
						onClick={() => setTimeFrame("5Y")}
					>
						5Y
					</Text>
				</Flex>

				<Box justifyContent={"center"} p={"1%"} m={"1%"}>
					{isDataReady && (
						<MultiIndexDiagram
							data={combinedData}
							symbols={selectedIndexes}
						/>
					)}
				</Box>
			</Box>
			<Box
				borderWidth={"1px"}
				borderColor={"primary"}
				borderRadius={5}
				width={{ base: "90%", md: "48%" }}
				m={5}
				ml={{ base: "5", md: 0 }}
			>
				<Text
					m={0}
					pl={3}
					pt={2}
					pb={1}
					fontWeight={"bold"}
					fontSize={"18px"}
				>
					Index Price
				</Text>
				<Divider p={0} m={0} />
				<Flex
					direction={"column"}
					justifyContent={"space-between"}
					p={"1%"}
					m={"1%"}
					height={"90%"}
				>
					<Select
						placeholder="Select Index"
						value={selectedIndex}
						onChange={handleSymbolChange}
					>
						<option value="^GSPC">S&P 500 (^GSPC)</option>
						<option value="^DJI">Dow Jones (^DJI)</option>
						<option value="^IXIC">Nasdaq (^IXIC)</option>
						<option value="^RUT">Russell 2000 (^RUT)</option>
						<option value="^FTSE">FTSE 100 (^FTSE)</option>
						<option value="^N225">Nikkei 225 (^N225)</option>
						<option value="^HSI">Hang Seng (^HSI)</option>
						<option value="^STOXX50E">
							Euro Stoxx 50 (^STOXX50E)
						</option>
						<option value="^VIX">VIX (^VIX)</option>
					</Select>
					{isDataForOneIndexReady && (
						<IndexClosePriceDiagram
							data={dataForOneIndex}
							symbol={selectedIndex}
						/>
					)}
				</Flex>
			</Box>
		</Flex>
	);
};
export default IndexView;
