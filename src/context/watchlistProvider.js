import React, { createContext, useContext, useState, useEffect } from "react";
import getUserIdFromToken from "../util/getUserIdFromToken";

const WatchlistContext = createContext();

export const useWatchlist = () => {
	return useContext(WatchlistContext);
};

const WatchlistProvider = ({ children }) => {
	const [watchlist, setWatchlist] = useState([]);

	useEffect(() => {
		getWatchlist();
	}, []);
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
			setWatchlist(data.stocks);
			return data;
		} catch (error) {
			throw error;
		}
	};
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
			setWatchlist(data.watchlist);
			return data.watchlist;
		} catch (error) {
			throw error;
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
			setWatchlist(data.watchlist);
			return data.watchlist;
		} catch (error) {
			throw error;
		}
	};

	return (
		<WatchlistContext.Provider
			value={{ watchlist,setWatchlist,  addToWatchlist, removeFromWatchlist }}
		>
			{children}
		</WatchlistContext.Provider>
	);
};

export {WatchlistContext, WatchlistProvider};
