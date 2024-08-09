import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import { BrowserRouter, Routes, Route, Navigate,  } from "react-router-dom";
import Services from "./components/Services/Services";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";


function App() {
  // let navigate = useNavigate();
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
			console.log("Token expired and removed from localStorage.");
      // navigate("/login")
		}
	}

	removeExpiredToken();

	setInterval(removeExpiredToken, 60000);
	return (
		<BrowserRouter>
			<AuthProvider>
				<Routes>
					<Route path="/" element={<Navigate replace to="/home" />} />
					<Route path="/home" element={<Home />} />
					<Route path="/about" element={<About />} />
					<Route path="/services" element={<Services />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="/login" element={<Login />} />
					{/* <Route path="/dashboard" element={<PrivateRouter><Dashboard /></PrivateRouter>} /> */}
					<Route path="/dashboard" element={<Dashboard />} />
				</Routes>
			</AuthProvider>
		</BrowserRouter>
	);
}

export default App;
