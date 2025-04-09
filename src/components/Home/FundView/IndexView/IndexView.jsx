import React from "react";
import { Text, Box, HStack } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import getHistoricalPriceData from "../../../../api/fundViewAPIs/getHistoricalPriceData";
import IndexDiagram from "./IndexDiagram";
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

		// Return sorted array by date
		return Array.from(dateMap.values()).sort((a, b) =>
			a.time.localeCompare(b.time)
		);
	};

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
		const fetchAllData = async () => {
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
		};
		fetchAllData();
	}, [selectedIndexes, timeFrame]);
	console.log("datamap", dataMap);
	console.log("selectedIndexes", selectedIndexes);
	const combinedData = getCombinedChartData(dataMap, true);
	return (
		<Box>
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
						onClick={() => {
							setSelectedIndexes(
								(prev) =>
									prev.includes(symbol)
										? prev.filter((s) => s !== symbol) // remove if already selected
										: [...prev, symbol] // add if not selected
							);
						}}
						fontWeight="semibold"
						position="relative"
					>
						<Text
							borderWidth={"2px"}
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

			{/* {selectedIndexes.map((symbol) => (
				<Box key={symbol} mb={8}>
					<IndexDiagram
						symbol={symbol}
						timeFrame={timeFrame}
						setTimeFrame={setTimeFrame}
						isDataReady={isDataReady[symbol]}
						data={dataMap[symbol]}
					/>
				</Box>
			))} */}

			<Box>
				<MultiIndexDiagram
					data={combinedData}
					symbols={selectedIndexes}
				/>
			</Box>
		</Box>
	);
};
export default IndexView;
