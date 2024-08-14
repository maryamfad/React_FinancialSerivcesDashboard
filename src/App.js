import "./App.css";
import { AuthProvider } from "./context/AuthProvider";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Services from "./components/Services/Services";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
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
					<Route
						path="/dashboard"
						element={
							<ProtectedRoute>
								<Dashboard />
							</ProtectedRoute>
						}
					/>
				</Routes>
			</AuthProvider>
		</BrowserRouter>
	);
}

export default App;
