import React, { useContext, useEffect, useState } from "react";
import { stockNames } from "../../Home/stockNames";
import {
	Box,
	Text,
	Flex,
	Input,
	Select,
	FormControl,
	FormLabel,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalCloseButton,
	useDisclosure,
	Icon,
	Button,
} from "@chakra-ui/react";
import { buyStock, sellStock } from "../../../services/TradeServices";
import getShortQuote from "../../../api/stockViewAPIs/getShortQuote";
import { WarningIcon } from "@chakra-ui/icons";
import { HoldingContext } from "../../../context/HoldingProvider";
import { OrderContext } from "../../../context/OrderProvider";

function BuySell() {
	const { getHoldings } = useContext(HoldingContext);
	const { getAllOrders } = useContext(OrderContext);
	const [isBuySelected, setBuySelected] = useState(true);
	const [orderType, setOrderType] = useState("market");
	// const [tradeOption, setTradeOption] = useState("");
	const [timeInForce, setTimeInForce] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [quantity, setQuantity] = useState(0);
	const [stockSymbol, setStockSymbol] = useState("AAPL");
	const [stockPrice, setStockPrice] = useState(0);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const {
		isOpen: isPreviewModalOpen,
		onOpen: onPreviewModalOpen,
		onClose: onPreviewModalClose,
	} = useDisclosure();

	const {
		isOpen: isConfirmationModalOpen,
		onOpen: onConfirmationModalOpen,
		onClose: onConfirmationModalClose,
	} = useDisclosure();

	let price;

	const handleStockChange = (event) => {
		setStockSymbol(event.target.value);
	};
	const handleOrderChange = (event) => {
		setOrderType(event.target.value);
	};

	// const handleTradeOptionChange = (value) => {
	// 	setTradeOption(value);
	// };

	const handleTimeInForceChange = (event) => {
		setTimeInForce(event.target.value);
	};

	const handleBuyStock = async () => {
		try {
			if (quantity === 0) {
				setErrorMessage(
					"The quantity is 0, please pick an amount for quantity"
				);
				onOpen();
			} else {
				price = await getShortQuote(stockSymbol);
				console.log("price", price);
				let data;
				if (typeof price === "number") {
					data = await buyStock(
						quantity,
						stockSymbol,
						price,
						orderType
					);
					if (data) {
						onConfirmationModalOpen();
					} else {
						setErrorMessage("the buy action failed.");
					}
				} else {
					setErrorMessage(
						"The third party api Subscription's limit has reached, please try again later."
					);
					onOpen();
					onConfirmationModalClose();
				}
				// onPreviewModalClose();
			}
		} catch (error) {
			console.error(error);
			setErrorMessage(error.message);
			onOpen();
		}
	};

	const handleSellStock = async () => {
		try {
			if (quantity === 0) {
				setErrorMessage(
					"The quantity is 0, please pick an amount for quantity"
				);
				onOpen();
			} else {
				price = await getShortQuote(stockSymbol);
				await sellStock(quantity, stockSymbol, price, orderType);
				// onPreviewModalClose();
			}
		} catch (error) {
			console.error(error);
			setErrorMessage(error.message);
			onOpen();
		}
	};
	useEffect(() => {
		getShortQuote(stockSymbol)
			.then((price) => {
				setStockPrice(price);
			})
			.catch((error) => {
				console.log(error);
			});
	}, [stockSymbol]);
	return (
		<Box
			mr={{ base: 0, lg: 5 }}
			width={{ base: "100%", lg: "25%" }}
			height={{ base: "auto", lg: "100%" }}
			borderColor={"dashboardPrimary"}
			borderWidth={"2px"}
			borderRadius={"10px"}
		>
			<Flex m={5}>
				<Flex
					as="button"
					justifyContent="center"
					alignItems="center"
					width="50%"
					backgroundColor={
						isBuySelected ? "dashboardPrimary" : "transparent"
					}
					cursor="pointer"
					borderRadius="5px"
					onClick={() => {
						setBuySelected(true);
					}}
					aria-pressed={isBuySelected}
					_focus={{ outline: "2px solid dashboardPrimary" }}
					_hover={{
						backgroundColor: isBuySelected
							? "dashboardPrimary"
							: "rgba(0, 0, 0, 0.05)",
					}}
				>
					<Text
						color={isBuySelected ? "white" : "black"}
						fontWeight="600"
						mb={0}
						p={2}
					>
						Buy
					</Text>
				</Flex>
				<Flex
					as="button"
					justifyContent="center"
					alignItems="center"
					width="50%"
					backgroundColor={
						!isBuySelected ? "dashboardPrimary" : "transparent"
					}
					cursor="pointer"
					borderRadius="5px"
					onClick={() => setBuySelected(false)}
					aria-pressed={!isBuySelected}
					_focus={{ outline: "2px solid dashboardPrimary" }}
					_hover={{
						backgroundColor: !isBuySelected
							? "dashboardPrimary"
							: "rgba(0, 0, 0, 0.05)",
					}}
				>
					<Text
						color={!isBuySelected ? "white" : "black"}
						fontWeight="600"
						mb={0}
						p={2}
					>
						Sell
					</Text>
				</Flex>
			</Flex>

			<Box m={5}>
				<Flex justifyContent="space-between" flexWrap="nowrap">
					<Box width={{ base: "100%", md: "48%" }}>
						<Text fontWeight="500" mb={0}>
							Symbol
						</Text>

						<Select
							width={"100%"}
							id="stockSymbol"
							value={stockSymbol}
							onChange={handleStockChange}
							border="2px solid #ccc"
							borderRadius="4px"
							_focus={{
								borderColor: "dashboardPrimary",
								boxShadow: "0 0 0 3px rgba(56, 178, 172, 0.6)",
								outline: "none",
							}}
							_hover={{
								borderColor: "dashboardPrimary",
							}}
						>
							{stockNames.map((stockName, index) => (
								<option key={index} value={stockName}>
									{stockName}
								</option>
							))}
						</Select>
					</Box>
					<Box width={{ base: "100%", md: "48%" }} ml={{ md: 10 }}>
						<Text fontWeight="500" mb={0}>
							Market Price
						</Text>
						<Text fontWeight="500" color="#343a40">
							{stockPrice} $
						</Text>
					</Box>
				</Flex>

				<FormControl mt={4}>
					<FormLabel htmlFor="order-type">Order Type</FormLabel>
					<Select
						width={"100%"}
						id="order-type"
						value={orderType}
						onChange={handleOrderChange}
						border="2px solid #ccc"
						borderRadius="4px"
						_focus={{
							borderColor: "dashboardPrimary",
							boxShadow: "0 0 0 3px rgba(56, 178, 172, 0.6)",
							outline: "none",
						}}
						_hover={{
							borderColor: "dashboardPrimary",
						}}
					>
						<option value="market">Market</option>
						<option value="limit" disabled>
							Limit
						</option>
						<option value="stop" disabled>
							Stop
						</option>
						<option value="stop-limit" disabled>
							Stop Limit
						</option>
						<option value="trailing-stop" disabled>
							Trailing Stop
						</option>
					</Select>
				</FormControl>

				<FormControl mt={4}>
					<FormLabel>
						Choose how to {isBuySelected ? "buy" : "sell"}
					</FormLabel>
				</FormControl>

				<Flex justifyContent="space-between" mt={4} flexWrap="nowrap">
					<Box width={{ base: "100%", md: "48%" }} mb={4}>
						<Text fontWeight="500" mb={0}>
							Quantity
						</Text>
						<Input
							type="number"
							aria-label="Quantity"
							name="quantity"
							value={quantity}
							onChange={(e) => setQuantity(e.target.value)}
							border="2px solid #ccc"
							borderRadius="4px"
							p="8px"
							_focus={{
								borderColor: "dashboardPrimary",
								boxShadow: "0 0 0 3px rgba(56, 178, 172, 0.6)",
								outline: "none",
							}}
							_hover={{
								borderColor: "dashboardPrimary",
							}}
						/>
					</Box>
					<Box
						width={{ base: "100%", md: "48%" }}
						ml={{ md: 10 }}
						mb={0}
					>
						<Text fontWeight="500" mb={0}>
							Estimated Cost
						</Text>
						<Text fontWeight="500" color="#343a40">
							{quantity * stockPrice}
						</Text>
					</Box>
				</Flex>

				<FormControl mt={0}>
					<FormLabel htmlFor="time-in-force">Time in Force</FormLabel>
					<Select
						id="time-in-force"
						value={timeInForce}
						onChange={handleTimeInForceChange}
						border="2px solid #ccc"
						borderRadius="4px"
						_focus={{
							borderColor: "dashboardPrimary",
							boxShadow: "0 0 0 3px rgba(56, 178, 172, 0.6)",
							outline: "none",
						}}
						_hover={{
							borderColor: "dashboardPrimary",
						}}
					>
						<option value="day">DAY</option>
						<option value="gtc" disabled>
							GTC - Good till Cancelled
						</option>
						<option value="fok" disabled>
							FOK - Fill or Kill
						</option>
						<option value="ioc" disabled>
							IOC - Immediate or Cancel
						</option>
						<option value="opg" disabled>
							At the Open
						</option>
						<option value="cls" disabled>
							At the Close
						</option>
					</Select>
				</FormControl>
				<Flex
					as="button"
					justifyContent="center"
					alignItems="center"
					width="100%"
					backgroundColor="dashboardPrimary"
					cursor="pointer"
					borderRadius="5px"
					mt={4}
					p={0}
					onClick={() => {
						onPreviewModalOpen();
					}}
					aria-pressed={isBuySelected}
					_focus={{ outline: "2px solid dashboardPrimary" }}
				>
					<Text color={"white"} fontWeight="600" mb={0} p={2}>
						Preview Order
					</Text>
				</Flex>
			</Box>
			<Modal isOpen={isOpen} onClose={onClose} isCentered>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader display="flex" alignItems="center">
						<Icon as={WarningIcon} color="red.500" mr={2} />
						Error
					</ModalHeader>
					<ModalCloseButton />
					<ModalBody
						display="flex"
						alignItems="center"
						justifyContent="center"
						flexDirection="column"
					>
						<Text fontSize="lg" mb={4}>
							{errorMessage}
						</Text>
						<Button colorScheme="red" onClick={onClose}>
							Close
						</Button>
					</ModalBody>
				</ModalContent>
			</Modal>

			<Modal
				isOpen={isPreviewModalOpen}
				onClose={onPreviewModalClose}
				isCentered
			>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader display="flex" alignItems="center">
						<Icon as={WarningIcon} color={"teal"} mr={2} />
						Preview Order
					</ModalHeader>
					<ModalCloseButton />
					<ModalBody
						display="flex"
						alignItems="center"
						justifyContent="center"
						flexDirection="column"
						width={"100%"}
					>
						<Text
							fontSize="lg"
							mb={4}
							width={"100%"}
							textAlign={"center"}
						>
							Are you sure you want to{" "}
							<b>{isBuySelected ? "Buy" : "Sell"}</b>{" "}
							<i>{quantity}</i> share/s of <b>{stockSymbol}</b>?
						</Text>
						<Flex
							width={"70%"}
							justifyContent={"space-between"}
							gap={5}
						>
							<Button
								width={"100%"}
								borderWidth={"1px"}
								borderColor={"gray"}
								colorScheme="gray"
								onClick={() => {
									onPreviewModalClose();
								}}
							>
								No
							</Button>
							<Button
								width={"100%"}
								colorScheme="teal"
								onClick={() => {
									if (isBuySelected) {
										handleBuyStock();
									} else {
										handleSellStock();
									}

									onPreviewModalClose();
								}}
							>
								Yes
							</Button>
						</Flex>
					</ModalBody>
				</ModalContent>
			</Modal>

			<Modal
				isOpen={isConfirmationModalOpen}
				onClose={onConfirmationModalClose}
				isCentered
			>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader display="flex" alignItems="center">
						<Icon as={WarningIcon} color={"teal"} mr={2} />
						Confirmation
					</ModalHeader>
					<ModalCloseButton />
					<ModalBody
						display="flex"
						alignItems="center"
						justifyContent="center"
						alignContent={"center"}
						flexDirection="column"
						width={"100%"}
					>
						<Flex justifyContent="center" alignContent={"center"}>
							<Text fontSize="lg" mb={4} width={"100%"}>
								Done
								<br />
								Trade Type: &nbsp;&nbsp;&nbsp;&nbsp;
								<b>{isBuySelected ? "Buy" : "Sell"}</b>
								<br /> Quantity: &nbsp;&nbsp;&nbsp;&nbsp;
								<b>{quantity}</b> <br />
								Symbol: &nbsp;&nbsp;&nbsp;&nbsp;
								<b>{stockSymbol}</b>
							</Text>
						</Flex>
						<Flex
							width={"70%"}
							justifyContent={"space-between"}
							gap={5}
						>
							<Button
								width={"100%"}
								colorScheme="teal"
								onClick={async () => {
									await getHoldings();
									await getAllOrders();
									onConfirmationModalClose();
								}}
							>
								Ok
							</Button>
						</Flex>
					</ModalBody>
				</ModalContent>
			</Modal>
		</Box>
	);
}

export default BuySell;
