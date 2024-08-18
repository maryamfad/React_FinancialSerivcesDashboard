import React, { useState, useEffect } from "react";
import LineChart from "./LinearChart";
import { getPortfolio } from "../../../services/TradeServices";
import { Box, Flex, Text, Divider } from "@chakra-ui/react";

const Portfolio = () => {
	const [portfolioData, setPortfolioData] = useState([]);
	const [errorMessage, setErrorMessage] = useState("");
	const [timeFrame, setTimeFrame] = useState("1D");
	const getUserPortfolio = () => {
		getPortfolio()
			.then((data) => {
				data.sort(
					(a, b) => new Date(b.executedAt) - new Date(a.executedAt)
				);
				setPortfolioData(data[0].performance);
			})
			.catch((error) => {
				if (error.status === 400) {
					setErrorMessage("Invalid Credentials");
				} else {
					setErrorMessage(
						error.message || "An unexpected error occurred."
					);
					console.log(errorMessage);
				}
			});
	};
	useEffect(() => {
		getUserPortfolio();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<Box
			borderColor={"dashboardPrimary"}
			borderWidth={"2px"}
			borderRadius={"10px"}
			height={"100%"}
		>
			<Flex
				bg={"dashboardSecondary"}
				borderTopRadius={"10px"}
				justifyContent={"space-between"}
			>
				<Flex width={"50%"} height={"100%"}>
					<Text
						m={0}
						width={"100%"}
						height={"100%"}
						pl={"3"}
						pt={2}
						fontWeight={"bold"}
						fontSize={"18px"}
					>
						Your Protfolio
					</Text>
				</Flex>
				<Flex
					width={{
						base: "60%",
						sm: "60%",
						md: "60%",
						lg: "50%",
						xl: "50%",
					}}
					justifyContent={"space-evenly"}
				>
					<Flex
						justifyContent={"flex-end"}
						pr={5}
						mt={5}
						width={"100%"}
					>
						<Flex
							justifyContent={"space-between"}
							cursor={"pointer"}
							width={"100%"}
						>
							<Text
								m={0}
								color={timeFrame === "1D" && "#007BFF"}
								fontWeight={timeFrame === "1D" && "bold"}
								onClick={() => setTimeFrame("1D")}
							>
								1D
							</Text>
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
						</Flex>
					</Flex>
				</Flex>
			</Flex>
			<Divider p={0} m={0} />
			<Flex>
				<Flex ml={5} mt={5}>
					<Text mb={0} fontSize={"18px"} fontWeight={"500"}>
						$ 100,002.88
					</Text>
					<Text mb={0} fontSize={"16px"} fontWeight={"400"} ml={5}>
						+0.00%
					</Text>
				</Flex>
				<Flex
					ml={10}
					fontSize={"14px"}
					fontWeight={"bold"}
					color={"gray"}
				>
					May 01, 03:21 PM EDT
				</Flex>
			</Flex>
			<Box>
				<LineChart data={portfolioData} />
			</Box>
		</Box>
	);
};
export default Portfolio;
