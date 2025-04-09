import React from "react";
import { Flex, Text, Box, Divider } from "@chakra-ui/react";
import StockDiagram from "./StockDiagram/StockDigaram.jsx";
import Scroller from "./Scroller/Scroller.jsx";
import SearchStocks from "./SearchStocks/SearchStocks.jsx";
import StockInsiderTransactions from "./StockInsiderTransactions/StockInsiderTransactions.jsx";
import StockSummary from "./StockSummary/StockSummary.jsx";
import MarketGainers from "./MarketGainers/MarketGainers.jsx";
import MarketLosers from "./MarketLosers/MarketLosers.jsx";
import StockNews from "./StockNews/StocksNew.jsx";

const StockView = ({ symbol, setSymbol, stockLogo }) => {
	return (
		<Box>
			<Box width="100%" >
				<Scroller setSymbol={setSymbol} stockLogo={stockLogo} />
			</Box>

			<Box width="100%" height="calc(100% - 128px)" mt={"0.5%"}>
				<Flex
					direction={{ base: "column", md: "row" }}
					width="100%"
					height={{ base: "auto", md: "50%" }}
					mb={0}
					wrap="wrap"
				>
					<Box width={{ base: "100%", md: "24%" }} p={1}>
						<StockSummary
							symbol={symbol}
							stockLogo={stockLogo}
							height={"100%"}
						/>
					</Box>
					<Box width={{ base: "100%", md: "51%" }} p={1}>
						<Flex
							borderColor={"primary"}
							bg={"accentColor"}
							borderWidth={"2px"}
							borderRadius={"10px"}
							justifyContent={"center"}
							width="100%"
							height={{ base: "auto", md: "9%" }}
							mb={{ base: 4, md: 1 }}
						>
							<SearchStocks setSymbol={setSymbol} />
						</Flex>
						<Box
							borderColor={"primary"}
							borderWidth={"2px"}
							width="100%"
							borderRadius={"10px"}
							height={{ base: "auto", md: "90%" }}
							p={4}
						>
							<StockDiagram
								symbol={symbol}
								stockLogo={stockLogo}
							/>
						</Box>
					</Box>
					<Box
						width={{ base: "100%", md: "24%" }}
						p={1}
						display="flex"
						flexDirection="column"
					>
						<Box
							borderColor={"primary"}
							borderWidth={"2px"}
							borderRadius={"10px"}
							width="100%"
							height={{ base: "auto", md: "50%" }}
							mb={4}
						>
							<Text
								m={0}
								pl={3}
								pt={2}
								pb={1}
								fontWeight={"bold"}
								fontSize={"18px"}
							>
								Market Biggest Gainers
							</Text>
							<Divider p={0} m={0} />
							<Box
								w="100%"
								h="100%"
								overflow="hidden"
								borderRadius="10px"
							>
								<Box
									bg="white"
									w="100%"
									h="240px"
									overflowY="auto"
									borderRadius={"10px"}
									border={"2x"}
									borderColor={"#F1D7D7"}
								>
									<MarketGainers setSymbol={setSymbol} />
								</Box>
							</Box>
						</Box>
						<Box
							borderColor={"primary"}
							borderWidth={"2px"}
							width="100%"
							height={{ base: "auto", md: "50%" }}
							borderRadius={"10px"}
						>
							<Text
								m={0}
								pl={3}
								pt={2}
								pb={1}
								fontWeight={"bold"}
								fontSize={"18px"}
							>
								Market Biggest Losers
							</Text>
							<Divider p={0} m={0} />
							<Box
								w="100%"
								h="100%"
								overflow="hidden"
								borderRadius="md"
							>
								<Box
									bg="white"
									w="100%"
									h="225px"
									overflowY="auto"
									borderRadius={"10px"}
									boxShadow={
										"rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px"
									}
									border={"2x"}
									borderColor={"#F1D7D7"}
								>
									<MarketLosers setSymbol={setSymbol} />
								</Box>
							</Box>
						</Box>
					</Box>
				</Flex>
				<Flex
					direction={{ base: "column", md: "row" }}
					width="100%"
					height={{ base: "auto", md: "50%" }}
				>
					<Box
						width={{ base: "100%", md: "50%" }}
						height={"50vh"}
						m={1}
					>
						{/* <StockNews symbol={symbol} stockLogo={stockLogo} /> */}
					</Box>
					<Box
						width={{ base: "100%", md: "50%" }}
						m={1}
						borderRadius={"10px"}
					>
						{/* <StockInsiderTransactions
							symbol={symbol}
							stockLogo={stockLogo}
						/> */}
					</Box>
				</Flex>
			</Box>
		</Box>
	);
};

export default StockView;
