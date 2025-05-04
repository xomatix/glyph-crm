import React, { useContext } from "react";
import service from "../../glService/glService";
import "./GlButton.css";

export const GlButton = ({
  action = () => {},
  style = {},
  afterAction = () => {},
  dataSetIdent = "",
  nameSpace = "",
  record = null,
  className = "",
  children,
}) => {
  const handleButtonPress = async () => {
    console.log("Button press", record, dataSetIdent, nameSpace);
    if (dataSetIdent === "" || nameSpace === "") {
      action(record);
    } else {
      const data = await service.select(nameSpace, dataSetIdent, {
        rows: [record],
      });
      console.log("After save action", data);
      if (data && data.length > 0) {
        afterAction(data[0]);
        return;
      }
    }
    afterAction(record);
  };

  return (
    <button
      style={style}
      className={className + " gl-button"}
      onClick={handleButtonPress}
    >
      {children}
    </button>
  );
};

export default GlButton;
