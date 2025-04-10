import React from "react";
import { Text, Box, HStack, Flex, Divider } from "@chakra-ui/react";
import { useState, useEffect, useCallback, useMemo } from "react";
import { throttle } from "lodash";
import getHistoricalPriceData from "../../../../api/fundViewAPIs/getHistoricalPriceData";
import MultiIndexDiagram from "./MultiIndexDiagram";

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

	const [isDataReady, setIsDataReady] = useState({});

	function toYYYYMMDD(date) {
		const year = date.getFullYear();
		const month = date.getMonth() + 1;
		const day = date.getDate();

		const formattedMonth = month < 10 ? `0${month}` : month;
		const formattedDay = day < 10 ? `0${day}` : day;

		return `${year}-${formattedMonth}-${formattedDay}`;
	}

	const getCombinedChartData = (dataMap, normalize = false) => {
		const dateMap = new Map();

		Object.entries(dataMap).forEach(([symbol, data]) => {
			if (!data) return;

			const base = normalize ? data[0]?.close || 1 : 1;

			data.forEach((point) => {
				if (!dateMap.has(point.time)) {
					dateMap.set(point.time, { time: point.time });
				}
				const entry = dateMap.get(point.time);
				entry[symbol] = normalize
					? (point.close / base) * 100
					: point.close;
			});
		});

		return Array.from(dateMap.values()).sort((a, b) =>
			a.time.localeCompare(b.time)
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

		throttledFetchAllData();
	}, [selectedIndexes, timeFrame, throttledFetchAllData]);

	console.log("datamap", dataMap);
	console.log("selectedIndexes", selectedIndexes);

	const combinedData = getCombinedChartData(dataMap, true);
	return (
		<Flex>
			<Box
				borderWidth={"1px"}
				borderColor={"primary"}
				borderRadius={5}
				width={"48%"}
				m={5}
			>
				<HStack
					spacing={{ base: "1%", md: "2%" }}
					mt={"1%"}
					width={"100%"}
					// width={"fit-content"}
					justifyContent={"space-evenly"}
				>
					{indexSymbols.map((symbol) => (
						<Box
							key={symbol}
							cursor="pointer"
							onClick={() => {
								setSelectedIndexes((prev) =>
									prev.includes(symbol)
										? prev.filter((s) => s !== symbol)
										: [...prev, symbol]
								);
							}}
							fontWeight="semibold"
							position="relative"
						>
							<Text
								borderWidth={"1px"}
								borderRadius={"5"}
								borderColor={"primary"}
								bg={
									selectedIndexes.includes(symbol)
										? "blue.100"
										: "none"
								}
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
				<Flex
					justifyContent={"flex-end"}
					cursor={"pointer"}
					width={"50%"}
					h={"500px"}
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

				<Flex justifyContent={"center"}>
					{isDataReady && (
						<MultiIndexDiagram
							data={combinedData}
							symbols={selectedIndexes}
						/>
					)}
				</Flex>
			</Box>
			<Box
				borderWidth={"1px"}
				borderColor={"primary"}
				borderRadius={5}
				width={"48%"}
				m={5}
				ml={0}
			>
				<Text
					m={0}
					pl={3}
					pt={2}
					pb={1}
					fontWeight={"bold"}
					fontSize={"18px"}
				>
					Index Summary
				</Text>
				<Divider p={0} m={0} />
			</Box>
		</Flex>
	);
};
export default IndexView;
