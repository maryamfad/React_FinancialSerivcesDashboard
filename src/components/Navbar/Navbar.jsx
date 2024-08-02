import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Box, Flex } from "@chakra-ui/react";

function NavbarMenu() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
    }
  }, []);

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
              bg={isActive("/home") ? "rgba(255, 255, 255, 0.1)" : ""}
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
              bg={isActive("/about") ? "rgba(255, 255, 255, 0.1)" : ""}
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
              bg={isActive("/services") ? "rgba(255, 255, 255, 0.1)" : ""}
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
          <Link to="/dashboard">
            <Box
              bg={isActive("/dashboard") ? "rgba(255, 255, 255, 0.1)" : ""}
              borderRadius={"5px"}
              _hover={{
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                borderRadius: "5px",
              }}
              p={{ base: 1, md: 2 }}
              m={{ base: 0, md: 2 }}
            >
              Dashboard
            </Box>
          </Link>
        </Flex>
        <Flex>
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
        </Flex>
      </Flex>
    </Flex>
  );
}

export default NavbarMenu;
