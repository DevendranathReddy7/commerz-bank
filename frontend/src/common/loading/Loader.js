import React from "react";
import "./Loader.css";
const Loader = (props) => {
  return (
    <div class="loading-container">
      <div class="loading-dots">
        <div class="dot dot1"></div>
        <div class="dot dot2"></div>
        <div class="dot dot3"></div>
      </div>
      <div class="loading-text">{props.message}</div>
    </div>
  );
};
export default Loader;
