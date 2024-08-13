import getUserIdFromToken from "../util/getUserIdFromToken";
export const getWatchlist = async () => {
	try {
		const userId = getUserIdFromToken();
		const response = await fetch(
			`https://wealthpath-385e08c18cf4.herokuapp.com/watchlist/${userId}`,
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
				errorDetails = { error: "An error occurred, but no details were provided" };
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