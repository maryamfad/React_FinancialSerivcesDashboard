import { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import "./Navbar.css";
import { IoMenu } from "react-icons/io5";

function NavbarMenu({ show, setShow, handleShow, handleClose }) {
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
  console.log(selectedItem);
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

        <li
          className={selectedItem.home ? "nav-item-glassy" : "nav-item"}
          onClick={() => {
            updateSelectedItem("home");
          }}
        >
          Home
        </li>
        <li
          className={selectedItem.about ? "nav-item-glassy" : "nav-item"}
          onClick={() => {
            updateSelectedItem("about");
          }}
        >
          About
        </li>
        <li
          className={selectedItem.services ? "nav-item-glassy" : "nav-item"}
          onClick={() => {
            updateSelectedItem("services");
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
          }}
        >
          Contact
        </li>
      </ul>
    </div>
    // <Navbar expand="lg" className=" navbar navbar-fixed-top" style={{backgroundColor:'#343A40', color:'#F8F9FA'}}>
    //   <Container>
    //     <i class="bi bi-list" style={{height: '20px'}} onClick={()=>setShow(!show)} ></i>

    //     <Navbar.Brand href="#home">Dashboard</Navbar.Brand>
    //     <Navbar.Toggle aria-controls="basic-navbar-nav" />
    //     <Navbar.Collapse id="basic-navbar-nav">
    //       <Nav className="me-auto" >
    //         <Nav.Link href="#home" style={{color:'#F8F9FA'}}>Home</Nav.Link>
    //         <Nav.Link href="#link" style={{color:'#F8F9FA'}}>Link</Nav.Link>
    //         <NavDropdown title="Dropdown" id="basic-nav-dropdown" style={{color:'#F8F9FA'}}>
    //           <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
    //           <NavDropdown.Item href="#action/3.2">
    //             Another action
    //           </NavDropdown.Item>
    //           <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
    //           <NavDropdown.Divider />
    //           <NavDropdown.Item href="#action/3.4">
    //             Separated link
    //           </NavDropdown.Item>
    //         </NavDropdown>
    //       </Nav>
    //     </Navbar.Collapse>
    //   </Container>
    // </Navbar>
  );
}

export default NavbarMenu;
