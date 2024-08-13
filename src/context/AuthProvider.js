import React, { createContext, useState } from "react";
import { Navigate } from "react-router-dom";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [userToken, setUserToken] = useState(null);

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
			setUserToken(response.token);
            setIsAuthenticated(true);
			return response.json();
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
		<AuthContext.Provider value={{ userToken, signUp, login, logout, isAuthenticated }}>
			{children}
		</AuthContext.Provider>
	);
};

export { AuthProvider, AuthContext };
