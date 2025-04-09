import { useState, useEffect } from "react";
import getStockLogo from "../../../../api/stockViewAPIs/getStockLogo";
import { scrollerData } from "../../scrollerData";
import { AiOutlineRise, AiOutlineFall } from "react-icons/ai";
import { Box, Flex, Text, Image, keyframes } from "@chakra-ui/react";

const slide = keyframes`
  0% { transform: translateX(0%); }
  100% { transform: translateX(-50%); }
`;
const Scroller = ({ setSymbol }) => {
	const [mostActiveStocks, setMostActiveStocks] = useState([]);

	async function enrichScrollerDataWithLogo() {
		try {
			const promises = scrollerData.map((stock) =>
				loadStockLogo(stock.symbol).then((logo) => ({
					...stock,
					logo: logo,
				}))
			);

			const updatedData = await Promise.all(promises);
			return updatedData;
		} catch (error) {
			console.error("Failed to enrich scroller data:", error);
			throw error;
		}
	}

	const loadStockLogo = async (symbol) => {
		try {
			const result = await getStockLogo(symbol);
			return result;
		} catch (error) {
			console.error("Failed to fetch data: ", error);
		}
	};

	useEffect(() => {
		enrichScrollerDataWithLogo()
			.then((updatedData) => {
				setMostActiveStocks(updatedData);
			})
			.catch((error) => {
				console.error("Error in processing:", error);
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Box width="100%" overflow="hidden">
			<Text pl={3} pb={1} fontWeight="bold" fontSize="18px">
				Most Active
			</Text>
			<Flex
				as="div"
				width="fit-content"
				animation={
					!window.matchMedia("(prefers-reduced-motion: reduce)")
						.matches
						? `${slide} 500s linear infinite`
						: "none"
				}
			>
				{[...mostActiveStocks, ...mostActiveStocks].map(
					(stock, index) => (
						<Box
							key={index}
							minW={{ base: "120px", md: "130px" }}
							h={{ base: "55px", md: "50px" }}
							border="1px solid"
							borderColor={"primary"}
							p={1}
							ml={3}
							borderRadius="7px"
							cursor="pointer"
						>
							<Flex direction="column" w="100%">
								<Flex
									justify="space-between"
									align="center"
									mb={1}
								>
									<Box h={"50px"}>
										<Text
											fontSize="14px"
											fontWeight="bold"
											mb={0}
											onClick={() =>
												setSymbol(stock.symbol)
											}
										>
											{stock.symbol}
										</Text>
										<Flex
											// align="center"
											fontSize="11px"
											color={
												stock.change < 0
													? "#FF6B6B"
													: "#009975"
											}
										>
											{stock.change < 0 ? (
												<AiOutlineFall size="18px" />
											) : (
												<AiOutlineRise size="18px" />
											)}
											<Text ml={1} mb={0} width={"100%"}>
												{Number(stock.change).toFixed(
													2
												)}{" "}
												(
												{Number(
													stock.changesPercentage
												).toFixed(2)}
												%)
											</Text>
										</Flex>
									</Box>
									<Image
										src={stock.logo || "/fallback-logo.png"}
										alt={`${stock.symbol} logo`}
										boxSize="30px"
										objectFit="contain"
										onError={(e) => {
											e.target.src = "/fallback-logo.png";
										}}
									/>
								</Flex>
							</Flex>
						</Box>
					)
				)}
			</Flex>
		</Box>
	);
};

export default Scroller;
