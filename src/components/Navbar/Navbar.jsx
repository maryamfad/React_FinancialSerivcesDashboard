import { useState, useEffect } from "react";
import "./Navbar.css";
import { IoMenu } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { logout } from "../../services/AuthServices";

function NavbarMenu({ show, setShow }) {
  let navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [selectedItem, setSelectedItem] = useState({
    menu: false,
    home: false,
    about: false,
    services: false,
    login: false,
    logout: false,
  });

  const updateSelectedItem = (stateKey) => {
    setSelectedItem(() => ({
      ...{
        menu: false,
        home: false,
        about: false,
        services: false,
        login: false,
        logout: false,
      },
      [stateKey]: true,
    }));
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  return (
    <div className="navbar-container">
      <div>
        <ul className="navbar-list">
          <li
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
              navigate("/home");
            }}
          >
            Home
          </li>
          <li
            className={selectedItem.about ? "nav-item-glassy" : "nav-item"}
            onClick={() => {
              updateSelectedItem("about");
              navigate("/about");
            }}
          >
            About
          </li>
          <li
            className={selectedItem.services ? "nav-item-glassy" : "nav-item"}
            onClick={() => {
              updateSelectedItem("services");
              navigate("/services");
            }}
          >
            Services
          </li>
        </ul>
      </div>
      {localStorage.getItem("user") ? (
        <div
          className={selectedItem.login ? "nav-item-glassy" : "nav-item"}
          onClick={() => {
            updateSelectedItem("logout");
            logout();
            localStorage.removeItem("user");
            setUser(null);
            navigate("/home");
          }}
        >
          <div>{user}</div>
          Logout
        </div>
      ) : (
        <div
          className={selectedItem.login ? "nav-item-glassy" : "nav-item"}
          onClick={() => {
            updateSelectedItem("login");
            navigate("/login");
          }}
        >
          Login
        </div>
      )}
    </div>
  );
}

export default NavbarMenu;
