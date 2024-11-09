import React, { createContext, useContext, useState, useEffect } from "react";
import getUserIdFromToken from "../util/getUserIdFromToken";

const HoldingContext = createContext();

export const useHolding = () => {
	return useContext(HoldingContext);
};

const HoldingProvider = ({ children }) => {
	const [holdings, setHoldings] = useState([]);
	const [errorMessage, setErrorMessage] = useState("");

	const getHoldings = async () => {
		try {
			const userId = getUserIdFromToken();
			const response = await fetch(
				`https://wealthpath-0fdb123d5bf7.herokuapp.com/portfolio/holdings/${userId}`,
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
				setErrorMessage(response.message);
			}
			const data = await response.json();

			if (data.message === "No Holding found for this user") {
				setHoldings([]);
			} else {
				setHoldings(data);
			}
		} catch (error) {
			setErrorMessage(error);
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
				errorMessage,
			}}
		>
			{children}
		</HoldingContext.Provider>
	);
};
export { HoldingContext, HoldingProvider };
