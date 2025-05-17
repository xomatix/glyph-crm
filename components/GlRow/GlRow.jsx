import React from "react";
import "./GlRow.css";

function GlRow({ className = "", children, ...props }) {
  return (
    <div className={className + " gl-row"} {...props}>
      {children}
    </div>
  );
}

export default GlRow;
