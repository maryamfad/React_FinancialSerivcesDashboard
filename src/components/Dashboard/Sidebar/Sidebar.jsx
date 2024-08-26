import { useContext } from "react";
import { Flex, Divider, Avatar, Heading, Text } from "@chakra-ui/react";
import { FiBriefcase, FiDollarSign, FiHome, FiSettings } from "react-icons/fi";
import SidebarItem from "./SidebarItem";
import { AuthContext } from "../../../context/AuthProvider";

function Sidebar() {
	const { userInfo } = useContext(AuthContext);
	return (
		<Flex
			height="100vh"
			position="sticky"
			top="0"
			overflowY="auto"
			width={"10%"}
			transition="all 0.3s ease-in-out"
			borderTopRightRadius="10px"
			borderBottomRightRadius="10px"
			flexDir={"column"}
			justifyContent={"space-between"}
			backgroundColor={"dashboardPrimary"}
		>
			<Flex flexDir={"column"} as={"nav"} mt={"50%"} p={2}>
				<SidebarItem title={"Home"} icon={FiHome} />
				<SidebarItem title={"Stocks"} icon={FiDollarSign} />
				<SidebarItem title={"Reports"} icon={FiBriefcase} />
				<SidebarItem title={"Setting"} icon={FiSettings} />
			</Flex>
			<Flex
				p="5%"
				flexDir={"column"}
				w={"100%"}
				alignItems={"flex-start"}
				mb={4}
			>
				<Divider display={"flex"} />
				<Flex mt={"4"} align={"center"}>
					<Avatar size={"sm"} />
					<Flex flexDir={"column"} ml={"4"} display={"flex"}>
						<Heading as={"h3"} size={"sm"}>
							{userInfo.username}
						</Heading>
						{userInfo.role && (
							<Text color={"grey"}>{userInfo.role}</Text>
						)}
					</Flex>
				</Flex>
			</Flex>
		</Flex>
	);
}

export default Sidebar;
