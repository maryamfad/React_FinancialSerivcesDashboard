import { useState, useEffect } from "react";

import { Box, Text, HStack } from "@chakra-ui/react";
import NavbarMenu from "../Navbar/Navbar.jsx";
import getStockLogo from "../../api/stockViewAPIs/getStockLogo.js";
import StockView from "./StockView/StockView.jsx";
import FundView from "./FundView/FundView.jsx";

const Home = () => {
	const [symbol, setSymbol] = useState("AAPL");
	const [stockLogo, setStockLogo] = useState(null);
	const [selectedAsset, setSelectedAsset] = useState("Stocks");
	const assetTypes = ["Stocks", "Funds", "Crypto"];
	const loadStockLogo = async (symbol) => {
		try {
			const result = await getStockLogo(symbol);
			setStockLogo(result);
		} catch (error) {
			console.error("Failed to fetch data: ", error);
		}
	};

	useEffect(() => {
		loadStockLogo(symbol);
	}, [symbol]);

	return (
		<Box width="100vw" minHeight="100vh">
			<Box position="fixed" top={0} left={0} width="100%" zIndex={1000}>
				<NavbarMenu />
			</Box>
			<HStack pt={4} mt={{ base: "5%", md: "4%" }} ml={"2%"}>
				{assetTypes.map((type) => (
					<Box
						key={type}
						cursor="pointer"
						onClick={() => setSelectedAsset(type)}
						color="blue.600"
						fontWeight="semibold"
						position="relative"
					>
						<Text
							borderBottom={
								selectedAsset === type ? "2px solid" : "none"
							}
							borderColor="blue.600"
							p={1}
							_hover={{
								bg: "blue.100",
								borderRadius: "5px",
							}}
						>
							{type}
						</Text>
					</Box>
				))}
			</HStack>
			{selectedAsset === "Stocks" && (
				<StockView
					symbol={symbol}
					setSymbol={setSymbol}
					stockLogo={stockLogo}
				/>
			)}
			{selectedAsset === "Funds" && <FundView />}
			{/* {selectedAsset === "crypto" && <cryptoView />} */}
		</Box>
	);
};

export default Home;
