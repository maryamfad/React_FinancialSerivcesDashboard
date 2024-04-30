import { Flex, Icon, Link, Menu, MenuButton } from "@chakra-ui/react";

const SidebarItem = ({ sidebarSize, title, icon, active }) => {
  return (
    <Flex mt={30} flexDir={"column"} w={"100%"}>
      <Menu placement="right">
        <Link
          backgroundColor={active && "#AEC8CA"}
          p={3}
          borderRadius={8}
          _hover={{ textDecor: "none", backgroundColor: "#AEC8CA" }}
          w={sidebarSize && "100%"}
        >
          <MenuButton
            w={"100%"}
            display="flex"
            flexDir={"column"}
            alignItems={sidebarSize === "small" ? "center" : "flex-start"}
          >
            <Flex alignItems={"center"}>
              <Icon
                as={icon}
                fontSize={"xl"}
                color={active ? "#82AAAD" : "white"}
              />
              <Flex
                ml={5}
                color={active ? "#82AAAD" : "white"}
                display={sidebarSize === "small" ? "none" : ""}
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
