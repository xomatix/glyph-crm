import React, { useContext } from "react";

export const GlButton = ({ action, Context, children }) => {
  const { record, _ } = useContext(Context);

  const handleButtonPress = (e) => {
    e.preventDefault();

    action(record);
  };

  return <button onClick={handleButtonPress}>{children}</button>;
};

export default GlButton;
