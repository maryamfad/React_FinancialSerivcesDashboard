import { useState } from "react";
import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import Home from "./components/Home/Home";
// import Sidebar from "./components/Sidebar/Sidebar";
// import Navbar from "./components/Navbar/Navbar";
import About from "./components/About/About";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Services from "./components/Services/Services";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
// import PrivateRouter from "./routes/PrivateRoute";
import Dashboard from "./components/Dashboard/Dashboard";

function App() {
  // const [show, setShow] = useState(false);
  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="app-container">
          {/* <Navbar
            show={show}
            handleClose={handleClose}
            handleShow={handleShow}
            setShow={setShow}
            // user={user}
            // setUser={setUser}
          /> */}
          {/* <div className="page"> */}
            {/* <Sidebar
              show={show}
              handleClose={handleClose}
              handleShow={handleShow}
            /> */}
            {/* <Dashboard show={show}/> */}
          {/* </div> */}

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
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
