import { useState } from "react";
import "./App.css";
import Dashboard from "./components/Dashboard/Dashboard";
import Sidebar from "./components/Sidebar/Sidebar";
import Navbar from "./components/Navbar/Navbar";
import About from "./components/About/About";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Services from "./components/Services/Services";
import Signup from "./components/Signup/Signup";


function App() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <BrowserRouter>
      <div className="app-container">
        <Navbar
          show={show}
          handleClose={handleClose}
          handleShow={handleShow}
          setShow={setShow}
        />
        <div className="page">
          <Sidebar
            show={show}
            handleClose={handleClose}
            handleShow={handleShow}
          />
          {/* <Dashboard show={show}/> */}
        </div>
      

      <Routes>
      {/* <Route path="/" element={<Dashboard show={show}/>} /> */}
        {/* <Route path="/home" element={<Dashboard show={show}/>} /> */}
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
