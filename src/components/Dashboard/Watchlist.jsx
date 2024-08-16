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
	useDisclosure,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalCloseButton,
	Button,
	Icon,
} from "@chakra-ui/react";
import { WarningIcon } from "@chakra-ui/icons";
import React, { useEffect, useContext } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { WatchlistContext } from "../../Context/test";
const Watchlist = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const {
		watchlist,
		setWatchlist,
		removeFromWatchlist,
		errorMessage,
		setErrorMessage,
	} = useContext(WatchlistContext);
	// const [errorMessage, setErrorMessage] = useState("");


	const removeStock = (symbol) => {
		removeFromWatchlist(symbol)
			.then((data) => {
				setWatchlist(
					watchlist.filter((item) => item.stockSymbol !== symbol)
				);
				console.log(data.stocks);
			})
			.catch((error) => {
				if (error.status === 400) {
					setErrorMessage("Invalid Credentials");
					onOpen();
				} else {
					setErrorMessage(
						error.message || "An unexpected error occurred."
					);
					onOpen();
				}
			});
	};
	useEffect(() => {
		if(errorMessage){
			onOpen()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [errorMessage]);
	return (
		<Box
			mb={5}
			width={{
				base: "100%",
				lg: "52%",
			}}
			boxShadow="rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px"
			borderColor={"dashboardPrimary"}
			borderWidth={"2px"}
			borderRadius={"10px"}
		>
			{" "}
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
						Watchlist
					</Text>
				</Box>
			</Flex>
			<Divider p={0} m={0} />
			<Box
				pl={4}
				bg="white"
				w="100%"
				h="240px"
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
								name
							</Th>
							<Th p={0} textAlign={"center"} pb={2}>
								exchange
							</Th>

							<Th p={0} textAlign={"center"} pb={2}>
								price
							</Th>
							<Th p={0} textAlign={"center"} pb={2}>
								Change (%)
							</Th>
							<Th p={0} textAlign={"center"} pb={2}>
								Market Cap
							</Th>
						</Tr>
					</Thead>
					<Tbody>
						{watchlist?.map((o, index) => (
							<Tr key={index}>
								<Td p={1} textAlign={"center"} color={"blue"}>
									{o.stockSymbol}
								</Td>
								<Td p={1} textAlign={"center"}>
									{o.name}
								</Td>
								<Td p={1} textAlign={"center"}>
									{o.exchange}
								</Td>

								<Td p={1} textAlign={"center"}>
									$ {o.price}
								</Td>
								<Td
									p={1}
									textAlign={"center"}
									color={o.change >= 0 ? "green" : "red"}
								>
									{o.change} ({o.changesPercentage} %)
								</Td>
								<Td p={1} textAlign={"center"}>
									{o.marketCap}
								</Td>
								<Td p={1} textAlign={"center"}>
									<IoIosCloseCircleOutline
										onClick={() => {
											removeStock(o.stockSymbol);
										}}
									/>
								</Td>
							</Tr>
						))}
					</Tbody>
				</Table>
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
						<Button colorScheme="red" onClick={()=>{onClose(); setErrorMessage("")}}>
							Close
						</Button>
					</ModalBody>
				</ModalContent>
			</Modal>
		</Box>
	);
};
export default Watchlist;
