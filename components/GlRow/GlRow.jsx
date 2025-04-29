import React from "react";
import "./GlRow.css";

function GlRow({ className = "", children }) {
  return <div className={className + " gl-row"}>{children}</div>;
}

export default GlRow;
