import { Flex, Icon, Menu, MenuButton } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
const SidebarItem = ({ title, icon, active }) => {
	const location = useLocation();
	const isActive = (path) => location.pathname === path;
	return (
		<Flex
			mt={"10%"}
			flexDir={"column"}
			bg={
				isActive(`dashboard/${title.toLowerCase()}`)
					? "rgba(255, 255, 255, 0.1)"
					: ""
			}
			_hover={{
				backgroundColor: "rgba(255, 255, 255, 0.1)",
			}}
			borderWidth={
				title === "Home" ? { base: "0px", md: "1px", lg: "2px" } : "0px"
			}
			borderRadius={{ base: 0, md: "3px", lg: "10px" }}
		>
			<Menu placement="right">
				<Link
					to={
						title === "Home"
							? "/home"
							: `/dashboard/${title.toLowerCase()}`
					}
					backgroundColor={active && "#AEC8CA"}
					borderRadius={8}
					_hover={{ textDecor: title, backgroundColor: "#AEC8CA" }}
				>
					<MenuButton
						w={"100%"}
						display="flex"
						flexDir={"column"}
						alignItems={"flex-start"}
						p={1}
					>
						<Flex alignItems={"center"}>
							<Icon
								as={icon}
								color={active ? "#82AAAD" : "white"}
								ml={{ base: 0, md: 0, lg: 2 }}
							/>
							<Flex
								display={{ base: "none", md: "flex" }}
								ml={{ base: 0, md: 1, lg: 2 }}
								color={active ? "#82AAAD" : "white"}
								fontSize={title === "Home" ? "1.1vw" : "1vw"}
							>
								{title}
							</Flex>
						</Flex>
					</MenuButton>
				</Link>
			</Menu>
		</Flex>
	);
};

export default SidebarItem;
