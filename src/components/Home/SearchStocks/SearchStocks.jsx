import { useState, useEffect } from "react";
// import getStocksList from "../../../api/getStocksList";
import { stockNames } from "../../Home/stockNames";

import { Box, Flex, Input, Text } from "@chakra-ui/react";
const SearchStocks = ({ setSymbol }) => {
	const [isFocused, setIsFocused] = useState(false);
	const [query, setQuery] = useState("");
	// const [stocksList, setStocksList] = useState([]);

	// const loadStocksList = async () => {
	//   try {
	//     const result = await getStocksList();
	//     // setStocksList(result.map((element) => element.symbol));
	//   } catch (error) {
	//     console.error("Failed to fetch data: ", error);
	//   }
	// };

	const handleSearchChange = (event) => {
		event.stopPropagation();
		setIsFocused(true);
		setQuery(event.target.value);
	};

	const handleItemClick = (event) => {
		const item = event.target.getAttribute("data-item");

		setQuery(item);
		setSymbol(item);
		setTimeout(() => setIsFocused(false), 100);
	};
	const handleBlur = (event) => {
		event.stopPropagation();
		event.preventDefault();
	};

	const filteredItems = query
		? stockNames.filter((item) =>
				item.toLowerCase().includes(query.toLowerCase())
		  )
		: [];

	useEffect(() => {
		// loadStocksList();
	}, []);
	return (
		<Flex
			position={"relative"}
			flexDir={"column"}
			alignSelf={"center"}
			bg={"white"}
			borderRadius={"15px"}
			width={"80%"}
			onBlur={handleBlur}
			tabIndex="0"
		>
			<Input
				// boxShadow={
				// 	"rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px"
				// }
				type="text"
				borderColor={"accentColor"}
				borderWidth={"2px"}
				placeholder="Search..."
				value={query}
				onChange={handleSearchChange}
				onClick={() => setIsFocused(true)}
				onFocus={() => setIsFocused(true)}
			/>

			{isFocused && query && (
				<Flex
					flexDir={"column"}
					position={"absolute"}
					top={"100%"}
					borderColor={"accentColor"}
					borderWidth={"2px"}
					left={0}
					right={0}
					zIndex={10}
					mr={6}
					alignSelf={"center"}
					p={3}
					boxShadow={
						"rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px"
					}
					backgroundColor={"#fff"}
					css={{
						"& > div:nth-child(even)": {
							backgroundColor: "#f8f9fa",
						},
					}}
				>
					{filteredItems.length > 0 ? (
						filteredItems.map((item, index) => (
							<Box
								_hover={{ backgroundColor: "#f0f0f0" }}
								key={index}
								data-item={item}
								onClick={handleItemClick}
							>
								{item}
							</Box>
						))
					) : (
						<Text>No results found</Text>
					)}
				</Flex>
			)}
		</Flex>
	);
};
export default SearchStocks;
