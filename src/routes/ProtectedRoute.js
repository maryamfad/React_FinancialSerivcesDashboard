import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthProvider";

function ProtectedRoute({ children }) {
	const { isAuthenticated } = useContext(AuthContext);
console.log("isAuthenticated", isAuthenticated);

	if (!isAuthenticated) {
		return <Navigate to="/login" />;
	}

	return children;
}

export default ProtectedRoute;
