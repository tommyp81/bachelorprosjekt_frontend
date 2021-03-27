import React from "react";
import "./ToggleButton.css";

const ToggleButton = (props) => {
  return (
    <button className="t-button" onClick={props.click}>
      <div className="t-B-line"></div>
      <div className="t-B-line"></div>
      <div className="t-B-line"></div>
    </button>
  );
};
export default ToggleButton;
