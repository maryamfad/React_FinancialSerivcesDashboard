import { useState, useEffect } from "react";
import getStocksNews from "../../../../api/stockViewAPIs/getStocksNews";
import "./StockNews.css";
import { Box, Divider, Flex, Image, Text } from "@chakra-ui/react";
const StockNews = ({ symbol, stockLogo }) => {
	const [stocksNews, setStocksNews] = useState([]);

	const loadStocksList = async (stockSymbol) => {
		try {
			const result = await getStocksNews(stockSymbol);

			setStocksNews(result.feed);
		} catch (error) {
			console.error("Failed to fetch data: ", error);
		}
	};
	useEffect(() => {
		loadStocksList(symbol);
	}, [symbol]);
	return (
		<Box
			height="100%"
			borderRadius="10px"
			borderColor={"primary"}
			borderWidth={"2px"}
		>
			<Flex>
				<Text
					m={0}
					pl={3}
					pt={2}
					pb={1}
					fontWeight={"bold"}
					fontSize={"18px"}
				>
					Stock News
				</Text>
				<Text
					fontSize={"md"}
					fontWeight={"bold"}
					m={0}
					pl={"15%"}
					pt={2}
					pb={1}
				>
					{symbol}
				</Text>
				<Image
					backgroundColor={"accentColor"}
					ml={"15%"}
					pt={2}
					pb={1}
					src={stockLogo}
					alt="logo"
					width={"5%"}
					height={"auto"}
					objectFit={"cover"}
					borderRadius={"5px"}
					padding={1}
				/>
			</Flex>
			<Divider p={0} m={0} />

			<Flex
				flexDir={"column"}
				gap={"20px"}
				height={"300px"}
				overflow={"auto"}
				mb={4}
			>
				{stocksNews ? (
					stocksNews.map((feed, index) => (
						<Flex
							gap={"15px"}
							pr={3}
							pl={"3"}
							mb={3}
							pb={"3"}
							borderBottom={"1px solid #eee"}
							key={index}
						>
							<Image
								src={feed.banner_image}
								alt="News"
								width={"120px"}
								height={"80px"}
								objectFit={"cover"}
								borderRadius={"5px"}
							/>
							<div className="news-feed">
								<div className="news-title">
									<a
										href={feed.url}
										rel="noopener noreferrer"
										target="_blank"
									>
										{feed.title}
									</a>
								</div>
								<p className="news-summary">{feed.summary}</p>
								<a
									href={feed.url}
									rel="noopener noreferrer"
									target="_blank"
									className="news-link"
								>
									Read More
								</a>
								<span className="news-date">
									{feed.time_published}
								</span>
							</div>
						</Flex>
					))
				) : (
					<div className="stock-news-placeholder">
						<div className="placeholder-message">
							Sorry there is no feed for this stock right now.
						</div>
					</div>
				)}
			</Flex>
		</Box>
	);
};
export default StockNews;
