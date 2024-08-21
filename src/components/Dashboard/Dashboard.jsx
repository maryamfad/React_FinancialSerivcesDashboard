import { Flex, Box, Heading } from "@chakra-ui/react";
import { WatchlistProvider } from "../../context/WatchlistProvider";
import Sidebar from "./Sidebar/Sidebar";
import Portfolio from "./Protfolio/Portfolio";
import Orders from "./Orders/Orders";
import Holdings from "./Holdings/Holdings";
import BuySell from "./BuySell/BuySell";
import AccountOverview from "./AccountOverview/AccountOverview";
import Watchlist from "./Watchlist";
import { HoldingProvider } from "../../context/HoldingProvider";
import { OrderProvider } from "../../context/OrderProvider";

const Dashboard = () => {
	return (
		<OrderProvider>
			<HoldingProvider>
				<WatchlistProvider>
					<Flex
						className="dashboard-container"
						height="100vh"
						width="100%"
						overflowX="hidden"
					>
						<Sidebar />
						<Flex
							flexDir={"column"}
							w={{
								base: "85%",
								sm: "85%",
								md: "85%",
								lg: "100%",
								xl: "100%",
							}}
							p={5}
						>
							{/* <Flex>
								<Button
									borderColor={"dashboardPrimary"}
									borderWidth={"2px"}
									onClick={() => navigate("/home")}
								>
									Home
								</Button>
							</Flex> */}
							<Box w={"100%"}>
								<Box p={5}>
									<Heading
										as="h1"
										size="xl"
										textAlign="flex-start"
										color="#343a40"
									>
										Dashboard
									</Heading>
								</Box>
								<Flex
									gap={"15px"}
									flexDirection={{
										base: "column",
										sm: "column",
										md: "column",
										lg: "row",
										xl: "row",
									}}
									fl
									mb={5}
									overflowX="auto"
								>
									<Flex
										flexDir={"column"}
										height={{
											base: "35%",
											sm: "35%",
											md: "35%",
											lg: "100%",
											xl: "100%",
										}}
										width={{
											base: "100%",
											sm: "100%",
											md: "100%",
											lg: "45%",
											xl: "45%",
										}}
									>
										<AccountOverview />
										<Portfolio />
									</Flex>
									<Orders />
									<BuySell />
								</Flex>
								<Flex
									gap={"15px"}
									flexDir={{
										base: "column",
										sm: "column",
										md: "column",
										lg: "row",
										xl: "row",
									}}
								>
									<Holdings />
									<Watchlist />
								</Flex>
							</Box>
						</Flex>
					</Flex>
				</WatchlistProvider>
			</HoldingProvider>
		</OrderProvider>
	);
};
export default Dashboard;
