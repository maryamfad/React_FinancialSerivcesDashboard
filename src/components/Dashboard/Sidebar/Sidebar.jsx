import { useState } from "react";
import "./Sidebar.css";
import {
  Flex,
  Divider,
  Avatar,
  Heading,
  Text,
  IconButton,
} from "@chakra-ui/react";
import { FiBriefcase, FiDollarSign, FiHome, FiMenu, FiSettings } from "react-icons/fi";
import SidebarItem from "./SidebarItem";

function Sidebar() {
  const [sidebarSize, setSizebarSize] = useState("large");
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
      pos={"sticky"}
      h="98vh"
      boxShadow={"0 4px 12px 0 rgba(0,0,0,0.05)"}
      w={sidebarSize === "small" ? "75px" : "200px"}
      borderTopRightRadius={sidebarSize === "small" ? "15px" : "30px"}
      borderBottomRightRadius={sidebarSize === "small" ? "15px" : "30px"}
      flexDir={"column"}
      justifyContent={"space-between"}
      backgroundColor={"teal"}
    >
      <Flex
        p={"5%"}
        flexDir={"column"}
        as={"nav"}
      >
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
    // <div className={`sidebar ${show ? "open" : "closed"}`}>
    //   {show && (
    //     <div className="sidebar-items">
    //       <div
    //         className={
    //           selectedItem.transaction ? "sidebar-item-glassy" : "sidebar-item"
    //         }
    //         onClick={() => {
    //           updateSelectedItem("transaction");
    //         }}
    //       >
    //         Transactions
    //       </div>
    //       <div
    //         className={
    //           selectedItem.holding ? "sidebar-item-glassy" : "sidebar-item"
    //         }
    //         onClick={() => {
    //           updateSelectedItem("holding");
    //         }}
    //       >
    //         Holdings
    //       </div>
    //       <div
    //         className={
    //           selectedItem.setting ? "sidebar-item-glassy" : "sidebar-item"
    //         }
    //         onClick={() => {
    //           updateSelectedItem("setting");
    //         }}
    //       >
    //         Settings
    //       </div>
    //     </div>
    //   )}
    // </div>
  );
}

export default Sidebar;
