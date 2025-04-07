import { useState, useEffect } from "react";
import "./Scroller.css";
// import getLatestQuoteForStock from "../../../api/getLatestQuoteForAStock";
// import getLatestBarForAStock from "../../../api/getLatestBarForAStock";
import getStockLogo from "../../../../api/getStockLogo";
import { scrollerData } from "../../scrollerData";
// import getMarketMostActiveStocks from "../../../api/getMarketMostActiveStocks";
import { AiOutlineRise, AiOutlineFall } from "react-icons/ai";
import { Box, Flex } from "@chakra-ui/react";
// import { color } from "d3";

const Scroller = ({ setSymbol }) => {
	const [mostActiveStocks, setMostActiveStocks] = useState([]);
	// console.log(scrollerData);
	// const loadMostActiveStocksData = async () => {
	//   try {
	//     const result = await getMarketMostActiveStocks();
	//     // console.log(result);
	//     // setMostActiveStocks(result);
	//     return result;
	//   } catch (error) {
	//     console.error("Failed to fetch data: ", error);
	//   }
	// };

	async function enrichScrollerDataWithLogo() {
		try {
			// const scrollerData = await loadMostActiveStocksData(); // Fetch initial scroller data

			// Map over scrollerData to fetch logos
			const promises = scrollerData.map((stock) =>
				loadStockLogo(stock.symbol).then((logo) => ({
					...stock,
					logo: logo, // Enrich each stock with its logo
				}))
			);

			// Wait for all promises to resolve
			const updatedData = await Promise.all(promises);
			return updatedData; // This is the enriched scroller data
		} catch (error) {
			console.error("Failed to enrich scroller data:", error);
			throw error; // Rethrow or handle as needed
		}
	}

	const loadStockLogo = async (symbol) => {
		try {
			const result = await getStockLogo(symbol);
			// console.log('logo',result);
			// setStockLogo(result);
			return result;
		} catch (error) {
			console.error("Failed to fetch data: ", error);
		}
	};

	useEffect(() => {
		// loadMostActiveStocksData();
		enrichScrollerDataWithLogo()
			.then((updatedData) => {
				setMostActiveStocks(updatedData);
			})
			.catch((error) => {
				// Handle or log error

				console.error("Error in processing:", error);
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Box
			className="scroller"
			width={"100%"}
			data-animated={
				!window.matchMedia("(prefers-reduced-motion: reduce)").matches
					? "true"
					: "false"
			}
		>
			<Flex
				width={{ base: "4000%", md: "2000%" }}
				className="scroller_inner"
			>
				{[...mostActiveStocks, ...mostActiveStocks].map(
					(stock, index) => (
						<Box
							width={{ base: "140px", md: "150px" }}
							height={{ base: "85px", md: "90px" }}
							borderColor={"primary"}
							borderWidth={"2px"}
							p={3}
							pt={1}
							ml={3}
							key={index}
							borderRadius={"10px"}
							cursor="pointer"
						>
							<div
								className="d-flex justify-content-between"
								style={{ width: "100%" }}
							>
								<div style={{ width: "100%" }}>
									<div
										className="d-flex justify-content-between"
										style={{ width: "100%" }}
									>
										<div
											className="stock-symbol"
											onClick={() =>
												setSymbol(stock.symbol)
											}
										>
											{stock.symbol}
										</div>
										<img
											src={stock.logo}
											alt="logo"
											className="stock-logo"
										/>
									</div>
									<div
										boxShadow={
											"rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px"
										}
										style={
											stock.change < 0
												? {
														color: "#FF6B6B",
														backgroundColor:
															"white",
														paddingLeft: "5px",
														paddingRight: "5px",
														borderRadius: "5px",
														fontSize: "14px",
														// borderWidth: "2px",
														// borderColor: "#F1D7D7",
														width: "100%",
												  }
												: {
														color: "#009975",
														backgroundColor:
															"white",
														paddingLeft: "5px",
														paddingRight: "5px",
														borderRadius: "5px",
														fontSize: "14px",
														// borderWidth: "2px",
														// borderColor: "#F1D7D7",
														width: "100%",
												  }
										}
									>
										{stock.change < 0 ? (
											<AiOutlineFall size={"20px"} />
										) : (
											<AiOutlineRise size={"20px"} />
										)}
										{Number(stock.change).toFixed(2)} (
										{Number(
											stock.changesPercentage
										).toFixed(2)}{" "}
										%)
									</div>
								</div>
							</div>
						</Box>
					)
				)}
			</Flex>
		</Box>
	);
};

export default Scroller;
