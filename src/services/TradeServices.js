import getUserIdFromToken from "../util/getUserIdFromToken";

export const buyStock = async (quantity, stockSymbol, purchasePrice) => {
	try {
		const userId = getUserIdFromToken();
		const response = await fetch(
			`https://wealthpath-385e08c18cf4.herokuapp.com/trade/buy`,
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
				}),
			}
		);

		if (!response.ok) {
			const errorDetails = await response.json();
			const error = new Error("Network response was not ok");
			error.status = response.status;
			error.details = errorDetails;
			throw error;
		}

		return response.json();
	} catch (error) {
		throw error;
	}
};
