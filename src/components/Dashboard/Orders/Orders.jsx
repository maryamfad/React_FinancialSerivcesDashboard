import {
	Box,
	Flex,
	Text,
	Divider,
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
} from "@chakra-ui/react";
import { useState, useEffect, useContext } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { getAllOrders } from "../../../services/TradeServices";
import { WatchlistContext } from "../../../context/WatchlistProvider";

const Orders = () => {
	const [orders, setOrders] = useState([]);
	const [errorMessage, setErrorMessage] = useState("");
	const { setWatchlist, addToWatchlist } =
		useContext(WatchlistContext);
	const getOrders = () => {
		getAllOrders()
			.then((data) => {
				data.sort(
					(a, b) => new Date(b.executedAt) - new Date(a.executedAt)
				);
				setOrders(data);
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
	function formatDate(isoString) {
		const date = new Date(isoString);
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, "0");
		const day = String(date.getDate()).padStart(2, "0");

		return `${year}-${month}-${day}`;
	}
	const addStock = (symbol) => {
		addToWatchlist(symbol)
			.then((data) => {
				console.log("add to watchlist:", data.stocks);
				setWatchlist(data.stocks);
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
		getOrders();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<Box
			width={{
				base: "100%",
				sm: "100%",
				md: "100%",
				lg: "25%",
				xl: "25%",
			}}
			boxShadow="rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px"
			borderColor={"dashboardPrimary"}
			borderWidth={"2px"}
			borderRadius={"10px"}
		>
			<Flex>
				<Box width={"50%"}>
					<Text
						m={0}
						width={"100%"}
						height={"100%"}
						pl={"3"}
						pt={2}
						pb={1}
						fontWeight={"bold"}
						fontSize={"18px"}
					>
						{" "}
						Recent Orders
					</Text>
				</Box>
			</Flex>
			<Divider p={0} m={0} />
			<Box
				pl={4}
				bg="white"
				w="100%"
				h="480px"
				overflowY="auto"
				borderRadius={"10px"}
				boxShadow={
					"rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px"
				}
				border={"2x"}
				borderColor={"#F1D7D7"}
			>
				<Table
					mt={5}
					sx={{ "tbody tr:nth-of-type(odd)": { bg: "accentColor" } }}
				>
					<Thead position="sticky" top={0} zIndex={1}>
						<Tr>
							<Th p={0} textAlign={"center"} pb={2}>
								Symbol
							</Th>
							<Th p={0} textAlign={"center"} pb={2}>
								Type
							</Th>
							<Th p={0} textAlign={"center"} pb={2}>
								Quantity
							</Th>
							<Th p={0} textAlign={"center"} pb={2}>
								Price
							</Th>
							<Th p={0} textAlign={"center"} pb={2}>
								Status
							</Th>
							<Th p={0} textAlign={"center"} pb={2}>
								Date
							</Th>
						</Tr>
					</Thead>
					<Tbody>
						{orders.map((o, index) => (
							<Tr key={index}>
								<Td p={1} textAlign={"center"} color={"blue"}>
									{o.stockSymbol}
								</Td>
								<Td p={1} textAlign={"center"}>
									{o.orderType}/{o.tradeType}
								</Td>
								<Td p={1} textAlign={"center"}>
									{o.quantity}
								</Td>
								<Td p={1} textAlign={"center"}>
									${o.price.toFixed(2)}
								</Td>
								<Td p={1} textAlign={"center"}>
									{o.status}
								</Td>
								<Td p={1} textAlign={"center"}>
									{formatDate(o.createdAt)}
								</Td>
								<Td p={1} textAlign={"center"}>
									<IoIosAddCircleOutline
										onClick={() => {
											addStock(o.stockSymbol);
										}}
									/>
								</Td>
							</Tr>
						))}
					</Tbody>
				</Table>
			</Box>
		</Box>
	);
};
export default Orders;
