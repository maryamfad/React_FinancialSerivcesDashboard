import { useState } from "react";
import "./App.css";
import Dashboard from "./components/Dashboard/Dashboard";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

function App() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className="d-flex flex-column">
      <Navbar show={show} handleClose={handleClose} handleShow={handleShow} setShow={setShow}/>
      <div className="d-flex">
      <Sidebar show={show} handleClose={handleClose} handleShow={handleShow}/>
      <Dashboard show={show}/>
      </div>
    </div>
  );
}

export default App;
