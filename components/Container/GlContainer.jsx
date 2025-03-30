import React from "react";
import "./GlContainer.css";

function GlContainer({ width = "100%", height = "100%", children }) {
  return (
    <div style={{ width: width, height: height }} className="card">
      {children}
    </div>
  );
}

export default GlContainer;
