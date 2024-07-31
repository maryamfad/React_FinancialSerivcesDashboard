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
    return null;
  }
};

export default getUserIdFromToken;
