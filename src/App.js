import { useState } from "react";
import "./App.css";
import Dashboard from "./components/Dashboard/Dashboard";
import Sidebar from "./components/Sidebar/Sidebar";
import Navbar from "./components/Navbar/Navbar";

function App() {
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  console.log(show);
  return (
    <div className="app-container">
      <Navbar show={show} handleClose={handleClose} handleShow={handleShow} setShow={setShow}/>
      <div className="page">
      <Sidebar show={show} handleClose={handleClose} handleShow={handleShow}/>
      <Dashboard show={show}/>
      </div>
    </div>
  );
}

export default App;
