import React, { createContext, useContext, useState, useEffect } from "react";
import getUserIdFromToken from "../util/getUserIdFromToken";

const OrderContext = createContext();

export const useOrder = () => {
	return useContext(OrderContext);
};

const OrderProvider = ({ children }) => {
	const [orders, setOrders] = useState([]);

   const getAllOrders = async () => {
        try {
            const userId = getUserIdFromToken();
            const response = await fetch(
                `https://wealthpath-385e08c18cf4.herokuapp.com/trade/orders/${userId}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        authorization: `Bearer ${localStorage.getItem("token")}`,
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
    
            if (data.message === "No Holding found for this user") {
				setOrders([]);
			} else {
				setOrders(data);
			}
        } catch (error) {
            throw error;
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
			}}
		>
			{children}
		</OrderContext.Provider>
	);
}

export { OrderContext, OrderProvider };