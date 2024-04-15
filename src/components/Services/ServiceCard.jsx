import React from "react";
import "./Services.css";
import { PiArrowElbowRight } from "react-icons/pi";

const ServiceCard = ({ title, description }) => {
  return (
    <div className="service-card">
      <div className="service-card-title">
        <div>{title}</div>
      </div>
      <div className="service-card-description">
        <p>{description}</p>
      </div>
      <div className="service-card-button">
        <button className="more-button">
          More <PiArrowElbowRight />
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;
