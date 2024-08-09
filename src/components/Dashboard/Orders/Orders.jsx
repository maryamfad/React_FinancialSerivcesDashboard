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
	TableCaption,
	TableContainer,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { getAllOrders } from "../../../services/TradeServices";
const Orders = () => {
	const [orders, setOrders] = useState([]);
	const [errorMessage, setErrorMessage] = useState("");
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
							</Tr>
						))}
					</Tbody>
				</Table>
			</Box>
			{/* <Box p={4} height={"400px"} overflowY={"auto"}>
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
				<Box>
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
			</Box> */}
		</Box>
	);
};
export default Orders;
