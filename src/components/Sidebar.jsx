import { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";

function Sidebar({ show, handleShow, handleClose }) {
  return (
    <div className={`col-${show ? "1" : "0"}`}>
      {show && (
        <div className="position-fixed top-0 start-0 bottom-0 overflow-auto">
          <div className="col-md-6 col-sm-12 col-xxl-6 vw-50 px-3 mt-5">
            Transactions
          </div>
          <div className="col-md-6 col-sm-12 col-xxl-6 vw-50 px-3 mt-3">
            Holdings
          </div>
          <div className="col-md-6 col-sm-12 col-xxl-6 vw-50 px-3 mt-3">
            Settings
          </div>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
