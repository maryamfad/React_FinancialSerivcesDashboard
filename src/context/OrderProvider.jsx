import React, { createContext, useContext, useState, useEffect } from "react";
import getUserIdFromToken from "../util/getUserIdFromToken";

const OrderContext = createContext();

export const useOrder = () => {
	return useContext(OrderContext);
};

const OrderProvider = ({ children }) => {
	const [orders, setOrders] = useState([]);
	const [errorMessage, setErrorMessage] = useState();
	const getAllOrders = async () => {
		try {
			const userId = getUserIdFromToken();
			const response = await fetch(
				`https://wealthpath-385e08c18cf4.herokuapp.com/trade/orders/${userId}`,
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

			let arr = data;
			arr.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
			if (data.message === "No Holding found for this user") {
				setOrders([]);
			} else {
				setOrders(arr);
			}
		} catch (error) {
			setErrorMessage(error);
		}
	};

	useEffect(() => {
		getAllOrders();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<OrderContext.Provider
			value={{
				orders,
				setOrders,
				getAllOrders,
                errorMessage
			}}
		>
			{children}
		</OrderContext.Provider>
	);
};

export { OrderContext, OrderProvider };
