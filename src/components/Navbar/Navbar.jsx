import { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import "./Navbar.css";
import { IoMenu } from "react-icons/io5";
import {  Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
function NavbarMenu({ show, setShow, handleShow, handleClose }) {

  let navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState({
    menu: false,
    home: false,
    about: false,
    services: false,
    products: false,
    product1: false,
    product2: false,
    product3: false,
    contact: false,
  });

  const updateSelectedItem = (stateKey) => {
    setSelectedItem((prevStates) => ({
      ...{
        menu: false,
        home: false,
        about: false,
        services: false,
        products: false,
        product1: false,
        product2: false,
        product3: false,
        contact: false,
      }, // Reset all states
      [stateKey]: true, // Set the selected state to true
    }));
  };

  return (
    <div className="navbar-container">
      <ul className="navbar-list">
        <li
          // className="nav-item"
          className={selectedItem.menu ? "nav-item-glassy" : "nav-item"}
          onClick={(e) => {
            e.preventDefault();
            updateSelectedItem("menu");
            setShow(!show);
          }}
        >
          <IoMenu />
        </li>
        {/* <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav> */}
        <li
          className={selectedItem.home ? "nav-item-glassy" : "nav-item"}
          onClick={() => {
            updateSelectedItem("home");
            navigate('/home');
          }}
        >
          Home
          {/* <Link to="/">Home</Link> */}
        </li>
        <li
          className={selectedItem.about ? "nav-item-glassy" : "nav-item"}
          onClick={() => {
            updateSelectedItem("about");
            navigate('/about');
          }}
        >
          About
        </li>
        <li
          className={selectedItem.services ? "nav-item-glassy" : "nav-item"}
          onClick={() => {
            updateSelectedItem("services");
            navigate('/services');
          }}
        >
          Services
        </li>
        <li
          className="nav-item"
          onMouseEnter={()=>{updateSelectedItem("products")}}
          onClick={() => {
            setIsDropdownOpen(!isDropdownOpen);
            updateSelectedItem("products");
            
          }}
          
        >
          Products
          {isDropdownOpen && (
            <ul className="dropdown">
              <li
                className="dropdown-item"
                // onClick={() => {
                //   updateSelectedItem("product1");
                // }}
              >
                Product 1
              </li>
              <li
                className="dropdown-item"
                // onClick={() => {
                //   updateSelectedItem("product2");
                // }}
              >
                Product 2
              </li>
              <li
                className="dropdown-item"
                // onClick={() => {
                //   updateSelectedItem("product3");
                // }}
              >
                Product 3
              </li>
            </ul>
          )}
        </li>
        <li
          className={selectedItem.contact ? "nav-item-glassy" : "nav-item"}
          onClick={() => {
            updateSelectedItem("contact");
            navigate("/contact")
          }}
        >
          Contact
        </li>
      </ul>
    </div>

  );
}

export default NavbarMenu;
