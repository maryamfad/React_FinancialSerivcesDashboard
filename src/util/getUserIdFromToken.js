import { jwtDecode } from "jwt-decode";

const getUserIdFromToken = () => {
	const token = localStorage.getItem("token");
	if (!token) {
		return null;
	}
	try {
		const decodedToken = jwtDecode(token);
		const userId = decodedToken.userId;
		return userId;
	} catch (error) {
		console.error("Invalid token:", error);
		alert(
			"Your session has expired or your token is invalid. Please log in again."
		);
		localStorage.removeItem("token");
		window.location.href = "/login";
		return null;
	}
};

export default getUserIdFromToken;
