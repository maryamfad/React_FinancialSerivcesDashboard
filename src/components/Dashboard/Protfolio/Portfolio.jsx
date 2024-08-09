import React, { useState, useEffect } from "react";
import LineChart from "./LinearChart";
import { getPortfolio } from "../../../services/TradeServices";
import { Box, Flex, Text, Button, Divider } from "@chakra-ui/react";

const Portfolio = () => {
	const [portfolioData, setPortfolioData] = useState([]);
	const [errorMessage, setErrorMessage] = useState("");
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
	}, []);
	return (
		<Box
			flexGrow={1}
			boxShadow="rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px"
			borderColor={"dashboardPrimary"}
			borderWidth={"2px"}
			borderRadius={"10px"}
		>
			<Flex
				m={{ base: 2, sm: 2, md: 2, lg: 5, xl: 5 }}
				p={{ base: 2, sm: 2, md: 2, lg: 5, xl: 5 }}
				mb={0}
				pb={0}
				justifyContent={"space-between"}
			>
				<Box width={"50%"}>
					<Text fontWeight={500} fontSize={"18px"}>
						{" "}
						Your Protfolio
					</Text>
				</Box>
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
					<Button>1D</Button>
					<Button>1M</Button>
					<Button>1Y</Button>
					<Button>All</Button>
				</Flex>
			</Flex>
			<Divider />
			<Box>
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
			</Box>
			<Box>
				<LineChart data={portfolioData} />
			</Box>
		</Box>
	);
};
export default Portfolio;
