import React, { createContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(() => {
		const token = localStorage.getItem("token");
		return token && !isTokenExpired(token);
	});
	const [userToken, setUserToken] = useState(localStorage.getItem("token"));

	function isTokenExpired(token) {
		try {
			const tokenPayload = JSON.parse(atob(token.split(".")[1]));
			const currentTime = Math.floor(Date.now() / 1000);
			return tokenPayload.exp < currentTime;
		} catch (e) {
			return true;
		}
	}

	function removeExpiredToken() {
		const token = localStorage.getItem("token");

		if (token && isTokenExpired(token)) {
			localStorage.removeItem("token");
			setIsAuthenticated(false);
			setUserToken(null);
			console.log("Token expired and removed from localStorage.");
		}
	}

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token && !isTokenExpired(token)) {
			setIsAuthenticated(true);
			setUserToken(token);
		} else {
			removeExpiredToken();
			setIsAuthenticated(false);
		}

		const intervalId = setInterval(() => {
			removeExpiredToken();
		}, 60000);
		return () => clearInterval(intervalId);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const signUp = async (username, password) => {
		try {
			const response = await fetch(
				"https://wealthpath-385e08c18cf4.herokuapp.com/auth/signup",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ username, password }),
				}
			);

			if (!response.ok) {
				const errorDetails = await response.json();
				const error = new Error("Network response was not ok");
				error.status = response.status;
				error.details = errorDetails;
				console.log(error);
				throw error;
			}

			return response.json();
		} catch (error) {
			throw error;
		}
	};

	const login = async (username, password) => {
		try {
			const response = await fetch(
				"https://wealthpath-385e08c18cf4.herokuapp.com/auth/login",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ username, password }),
				}
			);

			if (!response.ok) {
				const errorDetails = await response.json();
				const error = new Error("Network response was not ok");
				error.status = response.status;
				error.details = errorDetails;
				throw error;
			}

			const data = await response.json();
			localStorage.setItem("token", data.token);
			setUserToken(data.token);

			console.log("response", data.token);
			setIsAuthenticated(true);
			return data;
		} catch (error) {
			throw error;
		}
	};

	const logout = async () => {
		const token = localStorage.getItem("token");

		try {
			const response = await fetch(
				"https://wealthpath-385e08c18cf4.herokuapp.com/auth/logout",
				{
					method: "POST",
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					},
				}
			);
			setIsAuthenticated(false);
			setUserToken(null);
			if (response.ok) {
				localStorage.removeItem("token");
				Navigate("/login");
			} else {
				const errorText = await response.text();
				console.error("Logout failed", errorText);
			}
		} catch (error) {
			console.error("Logout failed", error);
		}
	};

	return (
		<AuthContext.Provider
			value={{ userToken, signUp, login, logout, isAuthenticated }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export { AuthProvider, AuthContext };
