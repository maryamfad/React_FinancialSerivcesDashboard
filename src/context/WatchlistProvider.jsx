import React, { createContext, useContext, useState, useEffect } from "react";
import getUserIdFromToken from "../util/getUserIdFromToken";
import getFullQuote from "../api/stockViewAPIs/getFullQuote";

const WatchlistContext = createContext();

export const useWatchlist = () => {
	return useContext(WatchlistContext);
};

const WatchlistProvider = ({ children }) => {
	const [watchlist, setWatchlist] = useState([]);
	const [errorMessage, setErrorMessage] = useState();
	const [isLoading, setIsLoading] = useState(true);

	const getWatchlist = async () => {
		try {
			const userId = getUserIdFromToken();
			const response = await fetch(
				`https://wealthpath-0fdb123d5bf7.herokuapp.com/watchlist/${userId}`,
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
			if (!data?.stocks) return [];

			const arr = await Promise.all(
				data.stocks.map(async (stock) => {
					const stockInfos = await getFullQuote(stock.stockSymbol);
					return {
						stockSymbol: stock.stockSymbol,
						price: stockInfos[0]?.price,
						marketCap: stockInfos[0]?.marketCap,
						change: Number(stockInfos[0]?.change).toFixed(2),
						changesPercentage: Number(
							stockInfos[0]?.changesPercentage
						).toFixed(2),
						exchange: stockInfos[0]?.exchange,
						name: stockInfos[0]?.name,
					};
				})
			);

			return arr;
		} catch (error) {
			console.log("error in getWatchlist", error);

			setErrorMessage(error);
		}
	};

	useEffect(() => {
		getWatchlist().then((watchlist) => {
			console.log("watchlistttt", watchlist);

			setWatchlist(watchlist);
			setIsLoading(false);
		});
	}, []);
	const addToWatchlist = async (symbol) => {
		try {
			const userId = getUserIdFromToken();
			const response = await fetch(
				`https://wealthpath-0fdb123d5bf7.herokuapp.com/watchlist/add/${userId}`,
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
				`https://wealthpath-0fdb123d5bf7.herokuapp.com/watchlist/remove/${userId}`,
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
				isLoading,
			}}
		>
			{children}
		</WatchlistContext.Provider>
	);
};

export { WatchlistContext, WatchlistProvider };
