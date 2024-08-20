import React, { createContext, useContext, useState, useEffect } from "react";
import getUserIdFromToken from "../util/getUserIdFromToken";

const HoldingContext = createContext();

export const useHolding = () => {
	return useContext(HoldingContext);
};

const HoldingProvider = ({ children }) => {
	const [holdings, setHoldings] = useState([]);
	// const [errorMessage, setErrorMessage] = useState("");

	const getHoldings = async () => {
		try {
			const userId = getUserIdFromToken();
			const response = await fetch(
				`https://wealthpath-385e08c18cf4.herokuapp.com/portfolio/holdings/${userId}`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						authorization: `Bearer ${localStorage.getItem(
							"token"
						)}`,
					},
				}
			);

			if (!response.ok) {
				let errorDetails;
				try {
					errorDetails = await response.json();
				} catch (jsonError) {
					errorDetails = {
						error: "An error occurred, but no details were provided",
					};
				}
				const error = new Error(errorDetails.error || "Unknown error");
				error.status = response.status;
				error.details = errorDetails;
				throw error;
			}
			const data = await response.json();
			// console.log("holding data", data);

			if (data.message === "No Holding found for this user") {
				setHoldings([]);
			} else {
				setHoldings(data);
			}
		} catch (error) {
			throw error;
		}
	};
	useEffect(() => {
		getHoldings();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<HoldingContext.Provider
			value={{
				holdings,
				setHoldings,
				getHoldings,
			}}
		>
			{children}
		</HoldingContext.Provider>
	);
};
export { HoldingContext, HoldingProvider };
