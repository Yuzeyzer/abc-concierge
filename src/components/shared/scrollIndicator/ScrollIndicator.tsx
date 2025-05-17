import React from "react";
import "./ScrollIndicaton.styles.css";

const ScrollIndicator = () => {
  return (
    <div className="scroll-indicator flex flex-col items-center space-y-1">
      <div className="arrow arrow-1"></div>
      <div className="arrow arrow-2"></div>
      <div className="arrow arrow-3"></div>
    </div>
  );
};

export default ScrollIndicator;
