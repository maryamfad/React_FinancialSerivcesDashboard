import { mockData } from "../components/Home/StockInsiderTransactions/mockData";
const getStockInsiderTransactions = async (symbol) => {
	const url = `https://www.alphavantage.co/query?function=INSIDER_TRANSACTIONS&symbol=${symbol}&apikey=${process.env.REACT_APP_ALPHAVANTAGE_API_KEY}`;
	try {
		const response = await fetch(url, {
			method: "GET",
			headers: {
				accept: "application/json",
				"User-Agent": "request",
			},
		});

		const data = await response.json();
		// console.log(data);
		if (data.Information) {
            alert("The Api calls has reached its limit so we use mock data")
            return mockData;}
		else return data;
	} catch (error) {
		console.log(error.message);
		throw error;
	}
};
export default getStockInsiderTransactions;
