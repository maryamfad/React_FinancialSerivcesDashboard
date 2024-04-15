import { useState } from "react";
import "./App.css";
import Dashboard from "./components/Dashboard/Dashboard";
import Sidebar from "./components/Sidebar/Sidebar";
import Navbar from "./components/Navbar/Navbar";
import About from "./components/About/About";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";


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
        <Route path="/home" element={<Dashboard show={show}/>} />
        <Route path="/about" element={<About />} />
      </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
