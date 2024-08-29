import { useContext, useEffect, useState } from "react";
import { Flex, Divider, Avatar, Heading, Text } from "@chakra-ui/react";
import { FiBriefcase, FiDollarSign, FiHome, FiSettings } from "react-icons/fi";
import SidebarItem from "./SidebarItem";
import { AuthContext } from "../../../context/AuthProvider";

function Sidebar() {
	const { getCurrentUserInfo } = useContext(AuthContext);
	const [userInfo, setUserInfo] = useState(null);
	useEffect(() => {
		getCurrentUserInfo().then((data) => {
			setUserInfo({ ...data });
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<Flex
			height="100vh"
			position="sticky"
			top="0"
			overflowY="auto"
			width={{ base: "auto", md: "10%" }}
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
				mb={4}
			>
				<Divider display={"flex"} />
				<Flex mt={"4"} justifyContent={"center"}>
					<Avatar size={"sm"} />
					<Flex
						display={{ base: "none", md: "flex" }}
						flexDir={"column"}
						ml={"4"}
					>
						<Heading
							as={"h3"}
							size={"sm"}
							display={{ base: "none", md: "flex" }}
						>
							{userInfo?.username}
						</Heading>
						{userInfo?.role && (
							<Text
								color={"grey"}
								display={{ base: "none", md: "flex" }}
							>
								{userInfo?.role}
							</Text>
						)}
					</Flex>
				</Flex>
			</Flex>
		</Flex>
	);
}

export default Sidebar;
