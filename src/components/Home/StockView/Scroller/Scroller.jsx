import { useState, useEffect, useRef } from "react";
import getStockLogo from "../../../../api/stockViewAPIs/getStockLogo";
import { scrollerData } from "../../scrollerData";
import { AiOutlineRise, AiOutlineFall } from "react-icons/ai";
import { Box, Flex, Text, Image } from "@chakra-ui/react";

const Scroller = ({ setSymbol }) => {
	const [mostActiveStocks, setMostActiveStocks] = useState([]);
	const [isPaused, setIsPaused] = useState(false);

	const scrollerRef = useRef(null);
	const speed = 0.5;
	const scrollPositionRef = useRef(0);
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
		const el = scrollerRef.current;
		let frameId;

		const animateScroll = () => {
			if (!isPaused && el) {
				scrollPositionRef.current += speed;

				if (
					scrollPositionRef.current >
					el.scrollWidth - el.clientWidth
				) {
					scrollPositionRef.current = 0;
				}

				el.style.transform = `translateX(-${scrollPositionRef.current}px)`;
			}

			frameId = requestAnimationFrame(animateScroll);
		};

		const pause = () => setIsPaused(true);
		const resume = () => setIsPaused(false);

		if (el) {
			
			el.addEventListener("touchstart", pause);
			el.addEventListener("touchend", resume);
			el.addEventListener("touchcancel", resume);
			el.addEventListener("mouseenter", pause);
			el.addEventListener("mouseleave", resume);
		}

		frameId = requestAnimationFrame(animateScroll);

		return () => {
			cancelAnimationFrame(frameId);
			if (el) {
				
				el.removeEventListener("touchstart", pause);
				el.removeEventListener("touchend", resume);
				el.removeEventListener("touchcancel", resume);
				el.removeEventListener("mouseenter", pause);
				el.removeEventListener("mouseleave", resume);
			}
		};
	}, [isPaused]);

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

	const handleTouchStart = () => setIsPaused(true);
	const handleTouchEnd = () => setIsPaused(false);

	return (
		<Box width="100%" overflow="hidden">
			<Text pl={3} mb={0} fontWeight="bold" fontSize="18px">
				Most Active
			</Text>
			<Flex
				as="div"
				width={"2000px"}
				ref={scrollerRef}
				onTouchStart={handleTouchStart}
				onTouchEnd={handleTouchEnd}
				style={{ display: "flex", transition: "transform 0.1s ease" }}
			>
				{[...mostActiveStocks, ...mostActiveStocks].map(
					(stock, index) => (
						<Box
							key={index}
							minW={{ base: "100px", md: "130px" }}
							h={{ base: "50px", md: "50px" }}
							border="1px solid"
							borderColor={"primary"}
							p={1}
							ml={3}
							borderRadius="7px"
							cursor="pointer"
							flexShrink={0}
							display="inline-block" // Ensure the child items are displayed inline
						>
							<Flex direction="column" w="100%">
								<Flex
									justify="space-between"
									align="center"
									mb={1}
								>
									<Box h={"50px"}>
										<Text
											fontSize={{
												base: "12px",
												md: "14px",
											}}
											fontWeight="bold"
											isTruncated
											mb={0}
											onClick={() =>
												setSymbol(stock.symbol)
											}
										>
											{stock.symbol}
										</Text>
										<Flex
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
										bg={"accentColor"}
										borderRadius={5}
										p={1}
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
