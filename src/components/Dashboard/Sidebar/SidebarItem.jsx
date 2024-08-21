import { Flex, Icon, Menu, MenuButton } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
const SidebarItem = ({ title, icon, active }) => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
	return (
		<Flex mt={30} flexDir={"column"} w={"100%"} 	bg={
      isActive(`/${title.toLowerCase()}`)
        ? "rgba(255, 255, 255, 0.1)"
        : ""
    }>
			<Menu placement="right">
				<Link
					to={`/${title.toLowerCase()}`}
					backgroundColor={active && "#AEC8CA"}
					p={3}
					ml={3}
					borderRadius={8}
					_hover={{ textDecor: title, backgroundColor: "#AEC8CA" }}
					w={"100%"}
				>
					<MenuButton
						w={"100%"}
						display="flex"
						flexDir={"column"}
						alignItems={"flex-start"}
					>
						<Flex
							alignItems={"center"}
							borderWidth={title === "Home" ? "2px" : 0}
							borderRadius={"10px"}
						>
							<Icon
								as={icon}
								fontSize={"xl"}
								color={active ? "#82AAAD" : "white"}
								ml={2}
							/>
							<Flex
								ml={2}
								color={active ? "#82AAAD" : "white"}
								pl={title === "Home" ? 4 : 0}
								pr={title === "Home" ? 4 : 0}
								pt={title === "Home" ? 1 : 0}
								pb={title === "Home" ? 1 : 0}
								fontSize={title === "Home" ? "18px" : "16px"}
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
