import React from "react";
import {
	Flex,
	Text,
	Box,
	HStack,
	Checkbox,
	CheckboxGroup,
	Stack,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";

const IndexView = () =>{
        const indexSymbols = [
            "^GSPC",
            "^DJI",
            "^IXIC",
            "^RUT",
            "^FTSE",
            "^N225",
            "^HSI",
            "^STOXX50E",
            "^VIX",
        ];
        const [selectedIndex, setSelectedIndex] = useState("^GSPC");
    return(
        <HStack spacing={6} p={4} mt={"1%"} ml={"5%"}>
				{indexSymbols.map((symbol) => (
					<Box
						key={symbol}
						cursor="pointer"
						onClick={() => setSelectedIndex(symbol)}
						fontWeight="semibold"
						position="relative"
					>
						<Text
							borderWidth={"2px"}
							borderRadius={"5"}
							borderColor={"primary"}
							bg={
								selectedIndex === symbol
									? "accentColor"
									: "none"
							}
							p={1}
							_hover={{
								bg: "accentColor",
								borderRadius: "5px",
							}}
						>
							{symbol}
						</Text>
					</Box>
				))}
			</HStack>
    )
}
export default IndexView;