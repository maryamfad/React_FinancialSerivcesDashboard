import { Flex, Text, Box } from "@chakra-ui/react";
import LinearChart from "./LinearChart";
const IndexDiagram = ({
	symbol,
	timeFrame,
	setTimeFrame,
	isDataReady,
	data,
}) => {
	return (
		<Flex
			flexDir={"column"}
			bg={"white"}
			borderRadius={"10px"}
			width={"70%"}
			height={"95%"}
		>
			<Flex
				justifyContent={"space-evenly"}
				alignItems={"center"}
				// mt={4}
				mb={4}
				borderRadius={"5px"}
				width={"60%"}
				alignSelf={"center"}
				bg="accentColor"
			>
				<Text fontSize={"md"} fontWeight={"bold"} mb={0}>
					{symbol}
				</Text>
			</Flex>
			{/* <Divider m={0} /> */}
			<Flex justifyContent={"flex-end"} pr={5} mt={5}>
				<Flex
					justifyContent={"space-between"}
					cursor={"pointer"}
					width={"50%"}
				>
					<Text
						m={0}
						color={timeFrame === "5D" && "#007BFF"}
						fontWeight={timeFrame === "5D" && "bold"}
						onClick={() => setTimeFrame("5D")}
					>
						5D
					</Text>
					<Text
						m={0}
						color={timeFrame === "1M" && "#007BFF"}
						fontWeight={timeFrame === "1M" && "bold"}
						onClick={() => setTimeFrame("1M")}
					>
						1M
					</Text>
					<Text
						m={0}
						color={timeFrame === "3M" && "#007BFF"}
						fontWeight={timeFrame === "3M" && "bold"}
						onClick={() => setTimeFrame("3M")}
					>
						3M
					</Text>
					<Text
						m={0}
						color={timeFrame === "6M" && "#007BFF"}
						fontWeight={timeFrame === "6M" && "bold"}
						onClick={() => setTimeFrame("6M")}
					>
						6M
					</Text>
					<Text
						m={0}
						color={timeFrame === "1Y" && "#007BFF"}
						fontWeight={timeFrame === "1Y" && "bold"}
						onClick={() => setTimeFrame("1Y")}
					>
						1Y
					</Text>
					<Text
						m={0}
						color={timeFrame === "5Y" && "#007BFF"}
						fontWeight={timeFrame === "5Y" && "bold"}
						onClick={() => setTimeFrame("5Y")}
					>
						5Y
					</Text>
				</Flex>
			</Flex>
			{/* {isDataReady ? ( */}
			<Box>
				<Box>
					<LinearChart data={data} timeFrame={timeFrame} />
				</Box>
			</Box>
			{/* // ) : (
			// 	<Text>Loading...</Text>
			// )} */}
		</Flex>
	);
};

export default IndexDiagram;
