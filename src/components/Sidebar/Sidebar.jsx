import { useState } from "react";
import "./Sidebar.css";

function Sidebar({ show, handleShow, handleClose }) {
  const [selectedItem, setSelectedItem] = useState({
    transaction: false,
    holding: false,
    setting: false,
  });

  const updateSelectedItem = (stateKey) => {
    setSelectedItem((prevStates) => ({
      ...{ transaction: false, holding: false, setting: false }, // Reset all states
      [stateKey]: true, // Set the selected state to true
    }));
  };

  // console.log(selectedItem);
  return (
    <div className={`sidebar ${show ? "open" : "closed"}`}>
      {show && (
        <div className="sidebar-items">
          <div
            className={
              selectedItem.transaction ? "sidebar-item-glassy" : "sidebar-item"
            }
            onClick={() => {
              updateSelectedItem("transaction");
            }}
          >
            Transactions
          </div>
          <div
            className={
              selectedItem.holding ? "sidebar-item-glassy" : "sidebar-item"
            }
            onClick={() => {
              updateSelectedItem("holding");
            }}
          >
            Holdings
          </div>
          <div
            className={
              selectedItem.setting ? "sidebar-item-glassy" : "sidebar-item"
            }
            onClick={() => {
              updateSelectedItem("setting");
            }}
          >
            Settings
          </div>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
