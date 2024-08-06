import { Box, Flex, Text, Divider } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { getAllOrders } from "../../../services/TradeServices";
const Orders = () => {
	const [orders, setOrders] = useState([]);
	const [errorMessage, setErrorMessage] = useState("");
	const getOrders = () => {
		getAllOrders()
			// .then((d) => d.json())
			.then((data) => {
				data.sort((a, b) =>new Date(b.executedAt) - new Date(a.executedAt));
				setOrders(data);
				console.log("orders", data);
			})
			.catch((error) => {
				if (error.status === 400) {
					setErrorMessage("Invalid Credentials");
				} else {
					setErrorMessage(
						error.message || "An unexpected error occurred."
					);
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
			<Flex m={5} p={5} mb={0} pb={0} justifyContent={"space-between"}>
				<Box width={"50%"}>
					<Text fontWeight={500} fontSize={"18px"}>
						{" "}
						Recent Orders
					</Text>
				</Box>
			</Flex>
			<Divider />

			<Box p={4} height={"400px"} overflowY={"auto"}>
				<Flex
					mb={4}
					fontWeight="bold"
					fontSize={"xs"}
					justifyContent={"space-evenly"}
				>
					<Box>Symbol</Box>
					<Box>Type</Box>
					<Box>Quantity</Box>
					<Box>Price</Box>
					<Box>Status</Box>
					<Box>Date</Box>
				</Flex>
				<Box >
				{orders.map((order) => (
					<Flex
					
						key={order.id}
						py={2}
						borderBottom="1px"
						borderColor="gray.200"
						_hover={{ bg: "gray.100" }}
						fontSize={"xs"}
						justifyContent={"space-evenly"}
						alignItems={"center"}
					>
						<Box flex={1} textAlign={"center"}>
							{order.stockSymbol}
						</Box>
						<Box flex={1} textAlign={"center"}>
							{order.orderType}-{order.tradeType}
						</Box>
						<Box flex={1} textAlign={"center"}>
							{order.quantity}
						</Box>
						<Box flex={1} textAlign={"center"}>
							{order.price}
						</Box>
						<Box flex={1} textAlign={"center"}>
							{order.status}
						</Box>
						<Box flex={1} textAlign={"center"}>
							{formatDate(order.executedAt)}
						</Box>
					</Flex>
					
				))}
				</Box>
			</Box>
		</Box>
	);
};
export default Orders;
