import { useState } from "react";

import {
  Flex,
  Divider,
  Avatar,
  Heading,
  Text,
  IconButton,
} from "@chakra-ui/react";
import {
  FiBriefcase,
  FiDollarSign,
  FiHome,
  FiMenu,
  FiSettings,
} from "react-icons/fi";
import SidebarItem from "./SidebarItem";

function Sidebar() {
  const [sidebarSize, setSizebarSize] = useState("small");
  // const [selectedItem, setSelectedItem] = useState({
  //   transaction: false,
  //   holding: false,
  //   setting: false,
  // });

  // const updateSelectedItem = (stateKey) => {
  //   setSelectedItem((prevStates) => ({
  //     ...{ transaction: false, holding: false, setting: false }, // Reset all states
  //     [stateKey]: true, // Set the selected state to true
  //   }));
  // };

  return (
    <Flex
      height="100vh"
      position="sticky"
      top="0"
      overflowY="auto"
      boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"}
      w={
        sidebarSize === "small"
          ? { base: "55px", sm: "55px", md: "55px", lg: "75px", xl: "75px" }
          : {
              base: "150px",
              sm: "150px",
              md: "150px",
              lg: "200px",
              xl: "200px",
            }
      }
      transition="all 0.3s ease-in-out"
      borderTopRightRadius={sidebarSize === "small" ? "15px" : "30px"}
      borderBottomRightRadius={sidebarSize === "small" ? "15px" : "30px"}
      flexDir={"column"}
      justifyContent={"space-between"}
      backgroundColor={"#125667"}
    >
      <Flex p={"5%"} flexDir={"column"} as={"nav"}>
        <IconButton
          background={"none"}
          color={"white"}
          mt={5}
          _hover={{ background: "none" }}
          icon={<FiMenu />}
          onClick={() => {
            if (sidebarSize === "small") {
              setSizebarSize("large");
            } else {
              setSizebarSize("small");
            }
          }}
        />
        <SidebarItem
          sidebarSize={sidebarSize}
          title={"Dashboard"}
          icon={FiHome}
        />
        <SidebarItem
          sidebarSize={sidebarSize}
          title={"Stocks"}
          icon={FiDollarSign}
        />
        <SidebarItem
          sidebarSize={sidebarSize}
          title={"Reports"}
          icon={FiBriefcase}
        />
        <SidebarItem
          sidebarSize={sidebarSize}
          title={"Setting"}
          icon={FiSettings}
        />
      </Flex>
      <Flex
        p="5%"
        flexDir={"column"}
        w={"100%"}
        alignItems={sidebarSize === "small" ? "center" : "flex-start"}
        mb={4}
      >
        <Divider display={sidebarSize === "small" ? "none" : "flex"} />
        <Flex mt={"4"} align={"center"}>
          <Avatar size={"sm"} />
          <Flex
            flexDir={"column"}
            ml={"4"}
            display={sidebarSize === "small" ? "none" : "flex"}
          >
            <Heading as={"h3"} size={"sm"}>
              Maryam Fadaee
            </Heading>
            <Text color={"grey"}>Admin</Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Sidebar;
