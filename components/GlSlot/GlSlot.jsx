import React from "react";

function GlSlot({ slot, itemScope, children }) {
  return <div slot={slot}>{children(itemScope)}</div>;
}

export default GlSlot;
