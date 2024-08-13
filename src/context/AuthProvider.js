import React, { createContext, useContext, useState } from "react";
import { Navigate } from "react-router-dom";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);

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

			if (response.ok) {
				localStorage.removeItem("token"); // Remove the token
				Navigate("/login"); // Redirect to login page
			} else {
				const errorText = await response.text();
				console.error("Logout failed", errorText);
			}
		} catch (error) {
			console.error("Logout failed", error);
		}
	};

	return (
		<AuthContext.Provider value={{ user, signUp, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export { AuthProvider, AuthContext };
