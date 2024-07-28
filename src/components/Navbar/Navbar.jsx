import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../services/AuthServices";
import { Box, Flex, Text } from "@chakra-ui/react";

function NavbarMenu() {
  let navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [selectedItem, setSelectedItem] = useState({
    menu: false,
    home: false,
    about: false,
    services: false,
    login: false,
    logout: false,
  });

  const updateSelectedItem = (stateKey) => {
    setSelectedItem(() => ({
      ...{
        menu: false,
        home: false,
        about: false,
        services: false,
        login: false,
        logout: false,
      },
      [stateKey]: true,
    }));
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      // setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <Flex
      backgroundColor="#003366"
      height={{base:"150px",sm:"150px",md:"60px",lg:"60px", xl:"60px"}}
      position={"fixed"}
      minWidth={"100vw"}
      zIndex={2}
      boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"}
      justifyContent={"space-between"}
      alignItems={"center"}
      pr={"30px"}
    >
      <Box width={"60%"} ml={"70px"}>
        <Flex flexDir={{base:"column", sm:"column", md:"row", lg:"row", xl:"row"}} 
        width={{base:"60%", sm:"60%", md:"100%", lg:"100%", xl:"100%"}}>
          <Flex
            justifyContent={"center"}
            alignItems={"center"}
            width={"100px"}
            fontSize={"20px"}
            fontWeight={"500"}
            cursor={"pointer"}
            backgroundColor={selectedItem.home && "rgba(255, 255, 255, 0.4)"}
            backdropFilter={selectedItem.home && "blur(10px)"}
            borderRadius={selectedItem.home && "5px"}
            border={selectedItem.home && "1px solid rgba(52, 58, 64, 0.3)"}
            color={
              selectedItem.home ? "1px solid rgba(52, 58, 64, 0.3)" : "white"
            }
            pr={selectedItem.home && 5}
            pl={selectedItem.home && 5}
            _hover={{
              backgroundColor: "rgba(255, 255, 255, 0.4)",
              color: "black",
              borderRadius: "5px",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              paddingLeft: "5px",
              paddingRight: "5px",
              fontWeight: "500",
            }}
            onClick={() => {
              updateSelectedItem("home");
              navigate("/home");
            }}
          >
            Home
          </Flex>
          <Flex
            justifyContent={"center"}
            alignItems={"center"}
            width={"100px"}
            fontSize={"20px"}
            cursor={"pointer"}
            fontWeight={"500"}
            backgroundColor={selectedItem.about && "rgba(255, 255, 255, 0.4)"}
            backdropFilter={selectedItem.about && "blur(10px)"}
            borderRadius={selectedItem.about && "5px"}
            border={selectedItem.about && "1px solid rgba(52, 58, 64, 0.3)"}
            color={
              selectedItem.about ? "1px solid rgba(52, 58, 64, 0.3)" : "white"
            }
            pr={selectedItem.about && 5}
            pl={selectedItem.about && 5}
            _hover={{
              backgroundColor: "rgba(255, 255, 255, 0.4)",
              color: "black",
              borderRadius: "5px",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              paddingLeft: "5px",
              paddingRight: "5px",
              fontWeight: "500",
            }}
            onClick={() => {
              updateSelectedItem("about");
              navigate("/about");
            }}
          >
            About
          </Flex>
          <Flex
            justifyContent={"center"}
            alignItems={"center"}
            width={"100px"}
            fontSize={"20px"}
            cursor={"pointer"}
            fontWeight={"500"}
            backgroundColor={
              selectedItem.services && "rgba(255, 255, 255, 0.4)"
            }
            backdropFilter={selectedItem.services && "blur(10px)"}
            borderRadius={selectedItem.services && "5px"}
            border={selectedItem.services && "1px solid rgba(52, 58, 64, 0.3)"}
            color={
              selectedItem.services
                ? "1px solid rgba(52, 58, 64, 0.3)"
                : "white"
            }
            pr={selectedItem.services && 5}
            pl={selectedItem.services && 5}
            _hover={{
              backgroundColor: "rgba(255, 255, 255, 0.4)",
              color: "black",
              borderRadius: "5px",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              paddingLeft: "5px",
              paddingRight: "5px",
              fontWeight: "500",
            }}
            onClick={() => {
              updateSelectedItem("services");
              navigate("/services");
            }}
          >
            Services
          </Flex>
          <Box
            boxShadow={
              "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset"
            }
            cursor={"pointer"}
            p={2}
            color={"white"}
            textAlign={"center"}
            marginLeft={{base:0, sm:0, md:0, lg:120,xl:120}}
            borderWidth={"2px"}
            borderRadius={"5px"}
            onClick={() => {
              navigate("/dashboard");
            }}
          >
            Dashboard
          </Box>
        </Flex>
      </Box>
      {localStorage.getItem("token") ? (
        <Flex
          justifyContent={"center"}
          alignItems={"center"}
          width={"100px"}
          fontSize={"20px"}
          cursor={"pointer"}
          fontWeight={"500"}
          backgroundColor={selectedItem.logout && "rgba(255, 255, 255, 0.4)"}
          backdropFilter={selectedItem.logout && "blur(10px)"}
          borderRadius={selectedItem.logout && "5px"}
          border={selectedItem.logout && "1px solid rgba(52, 58, 64, 0.3)"}
          color={
            selectedItem.logout ? "1px solid rgba(52, 58, 64, 0.3)" : "white"
          }
          pr={selectedItem.logout && 5}
          pl={selectedItem.logout && 5}
          _hover={{
            backgroundColor: "rgba(255, 255, 255, 0.4)",
            color: "black",
            borderRadius: "5px",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            paddingLeft: "5px",
            paddingRight: "5px",
            fontWeight: "500",
          }}
          onClick={() => {
            updateSelectedItem("logout");
            logout();
            setUser(null);
          }}
        >
          <Text>{user}</Text>
          Logout
        </Flex>
      ) : (
        <Flex
          justifyContent={"center"}
          alignItems={"center"}
          width={"100px"}
          fontSize={"20px"}
          cursor={"pointer"}
          fontWeight={"500"}
          backgroundColor={selectedItem.login && "rgba(255, 255, 255, 0.4)"}
          backdropFilter={selectedItem.login && "blur(10px)"}
          borderRadius={selectedItem.login && "5px"}
          border={selectedItem.login && "1px solid rgba(52, 58, 64, 0.3)"}
          color={
            selectedItem.login ? "1px solid rgba(52, 58, 64, 0.3)" : "white"
          }
          pr={selectedItem.login && 5}
          pl={selectedItem.login && 5}
          _hover={{
            backgroundColor: "rgba(255, 255, 255, 0.4)",
            color: "black",
            borderRadius: "5px",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            paddingLeft: "5px",
            paddingRight: "5px",
            fontWeight: "500",
          }}
          onClick={() => {
            updateSelectedItem("login");
            navigate("/login");
          }}
        >
          Login
        </Flex>
      )}
    </Flex>
  );
}

export default NavbarMenu;
