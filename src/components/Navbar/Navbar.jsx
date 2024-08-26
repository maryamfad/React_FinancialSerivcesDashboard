import { useEffect, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Box, Flex } from "@chakra-ui/react";
import { AuthContext } from "../../context/AuthProvider";

function NavbarMenu() {
	const { logout } = useContext(AuthContext);
	let navigate = useNavigate();

	const location = useLocation();

	const isActive = (path) => location.pathname === path;

	useEffect(() => {
		const storedUser = localStorage.getItem("user");
		if (storedUser) {
		}
	}, []);
	console.log(localStorage.getItem("token"));
	return (
		<Flex
			backgroundColor="primary"
			justifyContent={"space-between"}
			alignItems={"center"}
			pr={"5%"}
		>
			<Flex
				justifyContent="space-between"
				alignItems="center"
				width="100%"
				color={"white"}
			>
				<Flex>
					<Link to="/home">
						<Box
							bg={
								isActive("/home")
									? "rgba(255, 255, 255, 0.1)"
									: ""
							}
							p={{ base: 1, md: 2 }}
							m={{ base: 0, md: 2 }}
							borderRadius={"5px"}
							_hover={{
								backgroundColor: "rgba(255, 255, 255, 0.1)",
								borderRadius: "5px",
							}}
						>
							Home
						</Box>
					</Link>
					<Link to="/about">
						<Box
							bg={
								isActive("/about")
									? "rgba(255, 255, 255, 0.1)"
									: ""
							}
							_hover={{
								backgroundColor: "rgba(255, 255, 255, 0.1)",
								borderRadius: "5px",
							}}
							borderRadius={"5px"}
							p={{ base: 1, md: 2 }}
							m={{ base: 0, md: 2 }}
						>
							About
						</Box>
					</Link>
					<Link to="/services">
						<Box
							bg={
								isActive("/services")
									? "rgba(255, 255, 255, 0.1)"
									: ""
							}
							borderRadius={"5px"}
							_hover={{
								backgroundColor: "rgba(255, 255, 255, 0.1)",
								borderRadius: "5px",
							}}
							p={{ base: 1, md: 2 }}
							m={{ base: 0, md: 2 }}
						>
							Services
						</Box>
					</Link>
					<Link to={"/dashboard"}>
						<Box
							bg={
								isActive("/dashboard")
									? "rgba(255, 255, 255, 0.1)"
									: ""
							}
							borderRadius={"5px"}
							borderWidth={"2px"}
							borderColor={"white"}
							_hover={{
								backgroundColor: "rgba(255, 255, 255, 0.1)",
								borderRadius: "5px",
							}}
							p={{ base: 1, md: 2 }}
							m={{ base: 0, md: 2 }}
							ml={"2%"}
						>
							Dashboard
						</Box>
					</Link>
				</Flex>
				<Flex>
					{localStorage.getItem("token") == null && (
						<Link to="/signup">
							<Box
								_hover={{
									backgroundColor: "rgba(255, 255, 255, 0.1)",
									borderRadius: "5px",
								}}
								borderRadius={"5px"}
								p={{ base: 1, md: 2 }}
								m={{ base: 0, md: 2 }}
							>
								Signup
							</Box>
						</Link>
					)}
					{localStorage.getItem("token") != null ? (
						<Box
							_hover={{
								backgroundColor: "rgba(255, 255, 255, 0.1)",
								borderRadius: "5px",
							}}
							borderRadius={"5px"}
							p={{ base: 1, md: 2 }}
							m={{ base: 0, md: 2 }}
							onClick={() => {
								// localStorage.removeItem("token");

								logout().then(() => {
									navigate("/home");
								});
							}}
							cursor={"pointer"}
						>
							Logout
						</Box>
					) : (
						<Link to="/login">
							<Box
								_hover={{
									backgroundColor: "rgba(255, 255, 255, 0.1)",
									borderRadius: "5px",
								}}
								borderRadius={"5px"}
								p={{ base: 1, md: 2 }}
								m={{ base: 0, md: 2 }}
							>
								Login
							</Box>
						</Link>
					)}
				</Flex>
			</Flex>
		</Flex>
	);
}

export default NavbarMenu;
