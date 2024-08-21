import React from "react";
import ServiceCard from "./ServiceCard";
import "./Services.css";
import { Box, Flex } from "@chakra-ui/react";
import NavbarMenu from "../Navbar/Navbar";
function Services() {
	const services = [
		{
			title: "Account Aggregation",
			description:
				"Link and view all your financial accounts in one place.",
		},
		{
			title: "Portfolio Management",
			description: "Manage your investments and monitor performance.",
		},
		{
			title: "Financial Planning",
			description:
				"Tools for long-term financial goals and scenario modeling.",
		},
		{
			title: "Risk Assessment",
			description:
				"Evaluate your investment strategy with your risk tolerance.",
		},
		{
			title: "Tax Optimization",
			description:
				"Strategies to minimize tax liabilities and optimize savings.",
		},
	];

	return (
		<Flex>
			<Box width="100vw" minHeight="100vh">
				<Box
					position="fixed"
					top={0}
					left={0}
					width="100%"
					zIndex={1000}
				>
					<NavbarMenu />
				</Box>
				<Flex wrap={"wrap"} mt={"10%"} ml={"20%"}  width={"70%"}>
					{services.map((service) => (
						<ServiceCard
							key={service.title}
							title={service.title}
							description={service.description}
						/>
					))}
				</Flex>
			</Box>
		</Flex>
	);
}

export default Services;
