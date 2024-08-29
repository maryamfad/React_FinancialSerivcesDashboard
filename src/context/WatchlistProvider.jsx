import React, { createContext, useContext, useState, useEffect } from "react";
import getUserIdFromToken from "../util/getUserIdFromToken";
import getFullQuote from "../api/getFullQuote";

const WatchlistContext = createContext();

export const useWatchlist = () => {
	return useContext(WatchlistContext);
};

const WatchlistProvider = ({ children }) => {
	const [watchlist, setWatchlist] = useState([]);
	const [errorMessage, setErrorMessage] = useState();

	const getWatchlist = async () => {
		try {
			const userId = getUserIdFromToken();
			const response = await fetch(
				`https://wealthpath-385e08c18cf4.herokuapp.com/watchlist/${userId}`,
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
			console.log("data from getWatchlist", data);

			let arr = [];
			data.stocks?.map(async (stock) => {
				const stockInfos = await getFullQuote(stock.stockSymbol);
				arr.push({
					stockSymbol: stock.stockSymbol,
					price: stockInfos[0]?.price,
					marketCap: stockInfos[0]?.marketCap,
					change: Number(stockInfos[0]?.change).toFixed(2),
					changesPercentage: Number(
						stockInfos[0]?.changesPercentage
					).toFixed(2),
					exchange: stockInfos[0]?.exchange,
					name: stockInfos[0]?.name,
				});
				setWatchlist(arr);
			});
			return data.stocks;
		} catch (error) {
			console.log("error in getWatchlist", error);

			setErrorMessage(error);
		}
	};

	useEffect(() => {
		getWatchlist();
	}, []);
	const addToWatchlist = async (symbol) => {
		try {
			const userId = getUserIdFromToken();
			const response = await fetch(
				`https://wealthpath-385e08c18cf4.herokuapp.com/watchlist/add/${userId}`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						authorization: `Bearer ${localStorage.getItem(
							"token"
						)}`,
					},
					body: JSON.stringify({
						stockSymbol: symbol,
					}),
				}
			);

			if (!response.ok) {
				if (response.status === 400) {
					setErrorMessage("The stock is already in the Watchlist");
				} else {
					setErrorMessage(response.message);
				}
			} else {
				const data = await response.json();
				const stockInfos = await getFullQuote(symbol);
				watchlist.push({
					stockSymbol: symbol,
					price: stockInfos[0]?.price,
					marketCap: stockInfos[0]?.marketCap,
					change: Number(stockInfos[0]?.change).toFixed(2),
					changesPercentage: Number(
						stockInfos[0]?.changesPercentage
					).toFixed(2),
					exchange: stockInfos[0]?.exchange,
					name: stockInfos[0]?.name,
				});
				setWatchlist(watchlist);
				return data.watchlist;
			}
		} catch (error) {
			setErrorMessage(error);
		}
	};

	const removeFromWatchlist = async (symbol) => {
		try {
			const userId = getUserIdFromToken();
			const response = await fetch(
				`https://wealthpath-385e08c18cf4.herokuapp.com/watchlist/remove/${userId}`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						authorization: `Bearer ${localStorage.getItem(
							"token"
						)}`,
					},
					body: JSON.stringify({
						stockSymbol: symbol,
					}),
				}
			);

			if (!response.ok) {
				setErrorMessage(response.message);
			}
			const data = await response.json();
			setWatchlist(data.watchlist);
			return data.watchlist;
		} catch (error) {
			setErrorMessage(error);
		}
	};

	return (
		<WatchlistContext.Provider
			value={{
				watchlist,
				setWatchlist,
				addToWatchlist,
				removeFromWatchlist,
				errorMessage,
				setErrorMessage,
			}}
		>
			{children}
		</WatchlistContext.Provider>
	);
};

export { WatchlistContext, WatchlistProvider };
