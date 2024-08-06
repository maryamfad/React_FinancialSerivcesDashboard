import React, { useState } from "react";
import { stockNames } from "../../Home/stockNames";
import {
	Box,
	Text,
	Flex,
	Input,
	Select,
	FormControl,
	FormLabel,
	RadioGroup,
	Radio,
	Stack,
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
import getShortQuote from "../../../api/getShortQuote";
import { WarningIcon } from "@chakra-ui/icons";

function BuySell() {
	const [isBuySelected, setBuySelected] = useState(true);
	const [orderType, setOrderType] = useState("market");
	const [tradeOption, setTradeOption] = useState("");
	const [timeInForce, setTimeInForce] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [quantity, setQuantity] = useState(0);
	const [stockSymbol, setStockSymbol] = useState("AAPL");
	const { isOpen, onOpen, onClose } = useDisclosure();

	const handleStockChange = (event) => {
		setStockSymbol(event.target.value);
	};
	const handleOrderChange = (event) => {
		setOrderType(event.target.value);
	};

	const handleTradeOptionChange = (value) => {
		setTradeOption(value);
	};

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
				const price = await getShortQuote(stockSymbol);
				await buyStock(quantity, stockSymbol, price, orderType);
			}
		} catch (error) {
			console.error(error);
			setErrorMessage(error.message);
			onOpen();
		}
	};

	const handleSellStock = async () => {
		try {
			const price = await getShortQuote(stockSymbol);
			await sellStock(quantity, stockSymbol, price, orderType);
		} catch (error) {
			console.error(error);
			setErrorMessage(error.message);
			onOpen();
		}
	};

	return (
		<Box
			mr={{ base: 0, lg: 5 }}
			width={{ base: "100%", lg: "25%" }}
			height={{ base: "auto", lg: "100%" }}
			boxShadow="rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px"
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
							{stockNames.map((stockName) => (
								<option value={stockName}>{stockName}</option>
							))}
						</Select>
					</Box>
					<Box
						width={{ base: "100%", md: "48%" }}
						ml={{ md: 10 }}
						// mb={4}
					>
						<Text fontWeight="500" mb={0}>
							Market Price
						</Text>
						<Text fontWeight="500" color="#343a40">
							181.98 $
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
						<option value="limit">Limit</option>
						<option value="stop">Stop</option>
						<option value="stop-limit">Stop Limit</option>
						<option value="trailing-stop">Trailing Stop</option>
					</Select>
				</FormControl>

				<FormControl mt={4}>
					<FormLabel>
						Choose how to {isBuySelected ? "buy" : "sell"}
					</FormLabel>
					<RadioGroup
						onChange={handleTradeOptionChange}
						value={tradeOption}
					>
						<Stack
							direction="row"
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
						>
							<Radio
								borderColor={"gray"}
								borderWidth={"2px"}
								value="dollars"
								_focus={{
									outline: "2px solid dashboardPrimary",
								}}
								_hover={{
									backgroundColor: isBuySelected
										? "dashboardPrimary"
										: "rgba(0, 0, 0, 0.05)",
								}}
							>
								Dollars
							</Radio>
							<Radio
								borderColor={"gray"}
								borderWidth={"2px"}
								ml={"10%"}
								value="shares"
								_focus={{
									outline: "2px solid dashboardPrimary",
								}}
								_hover={{
									backgroundColor: isBuySelected
										? "dashboardPrimary"
										: "rgba(0, 0, 0, 0.05)",
								}}
							>
								Shares
							</Radio>
						</Stack>
					</RadioGroup>
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
							181.98 $
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
						<option value="gtc">GTC - Good till Cancelled</option>
						<option value="fok">FOK - Fill or Kill</option>
						<option value="ioc">IOC - Immediate or Cancel</option>
						<option value="opg">At the Open</option>
						<option value="cls">At the Close</option>
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
						if (isBuySelected) {
							handleBuyStock();
						} else {
							handleSellStock();
						}
					}}
					aria-pressed={isBuySelected}
					_focus={{ outline: "2px solid dashboardPrimary" }}
				>
					<Text color={"white"} fontWeight="600" mb={0} p={2}>
						Order
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
		</Box>
	);
}

export default BuySell;
