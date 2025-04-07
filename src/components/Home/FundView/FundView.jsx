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
import IndexView from "./IndexView/IndexView";
const FundView = () => {
	const fundTypes = ["Index, ETF & Mutual Fund"];
	const [selectedFundType, setSelectedFundType] = useState(["Index"]);

	return (
		<Box>
			<CheckboxGroup
				value={selectedFundType}
				onChange={setSelectedFundType}
			>
				<Stack
					direction="row"
					justifyContent={"space-evenly"}
					spacing={4}
				>
					<Checkbox
						colorScheme="green"
						borderColor={"primary"}
						value="Index"
					>
						Index
					</Checkbox>
					<Checkbox
						colorScheme="green"
						borderColor={"primary"}
						value="ETF & Mutual Fund"
					>
						ETF & Mutual Fund
					</Checkbox>
				</Stack>
			</CheckboxGroup>
            {selectedFundType.includes("Index") && <IndexView />}
            {/* {selectedFundType.includes("ETF & Mutual Fund") && <ETFView />} */}
			
		</Box>
	);
};
export default FundView;
