import { Box, Flex, Text } from "@chakra-ui/react";
import { useContext } from "react";
// import { getAccountOverview } from "../../../services/UserServices";
import { AuthContext } from "../../../context/AuthProvider";

const AccountOverview = () => {
	const { userInfo } = useContext(AuthContext);

	return (
		<Box
			mb={5}
			height={{
				base: "auto",
				sm: "auto",
				md: "20%",
				lg: "20%",
				xl: "20%",
			}}
			borderColor={"dashboardPrimary"}
			borderWidth={"2px"}
			borderRadius={"10px"}
			p={2}
			role="region"
			aria-label="Account Overview"
		>
			<Flex
				justifyContent={{
					base: "space-between",
					sm: "space-between",
					md: "space-around",
				}}
				alignItems="center"
			>
				<Box textAlign="center" aria-label="Account Balance">
					<Text
						fontWeight="600"
						fontSize="large"
						p={1}
						borderRadius="5px"
						bg={"dashboardSecondary"}
					>
						Balance
					</Text>
					<Text fontWeight="500" color="#343a40">
						{Number(userInfo.balance).toFixed(2)} $
					</Text>
				</Box>

				<Box
					textAlign="center"
					// mb={{ base: 3, sm: 3, md: 0 }}
					aria-label="Cash"
				>
					<Text
						fontWeight="600"
						fontSize="large"
						p={1}
						borderRadius="5px"
						bg={"dashboardSecondary"}
					>
						Cash
					</Text>
					<Text fontWeight="500" color="#343a40">
						{userInfo.cash} $
					</Text>
				</Box>
				<Box textAlign="center" aria-label="Daily Change">
					<Text
						fontWeight="600"
						fontSize="large"
						p={1}
						borderRadius="5px"
						bg={"dashboardSecondary"}
					>
						Daily Change
					</Text>
					<Text fontWeight="500" color="#343a40">
						{userInfo.dailyChange}
					</Text>
				</Box>
			</Flex>
		</Box>
	);
};
export default AccountOverview;
