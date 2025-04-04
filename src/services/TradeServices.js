import getUserIdFromToken from "../util/getUserIdFromToken";

export const buyStock = async (
	quantity,
	stockSymbol,
	purchasePrice,
	orderType
) => {
	try {
		const userId = getUserIdFromToken();
		const response = await fetch(
			`${process.env.REACT_APP_BACKEND_URL}/trade/buy`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					authorization: `Bearer ${localStorage.getItem("token")}`,
				},
				body: JSON.stringify({
					userId: userId,
					quantity: Number(quantity),
					stockSymbol: stockSymbol,
					purchasePrice: purchasePrice,
					orderType: orderType,
				}),
			}
		);

		if (!response.ok) {
			const errorDetails = await response.json();
			const error = new Error(errorDetails.error);
			error.status = response.status;
			error.details = errorDetails;
			throw error;
		}
		return true;
	} catch (error) {
		// throw error;
		console.log(error);
		return false;
		
	}
};

export const sellStock = async (
	quantity,
	stockSymbol,
	sellingPrice,
	orderType
) => {
	try {
		const userId = getUserIdFromToken();
		const response = await fetch(
			`${process.env.REACT_APP_BACKEND_URL}/trade/sell`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					authorization: `Bearer ${localStorage.getItem("token")}`,
				},
				body: JSON.stringify({
					userId: userId,
					quantity: Number(quantity),
					stockSymbol: stockSymbol,
					sellingPrice: sellingPrice,
					orderType: orderType,
				}),
			}
		);

		if (!response.ok) {
			const errorDetails = await response.json();
			const error = new Error(errorDetails.error);
			error.status = response.status;
			error.details = errorDetails;
			throw error;
		}

		return response.json();
	} catch (error) {
		throw error;
	}
};



export const getPortfolio = async () => {
	try {
		const userId = getUserIdFromToken();
		const response = await fetch(
			`${process.env.REACT_APP_BACKEND_URL}/portfolio/${userId}`,
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

		return data;
	} catch (error) {
		throw error;
	}
};
