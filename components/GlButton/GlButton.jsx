import { useState } from "react";
import service from "../../glService/glService";
// import "./GlButton.css";
import Button from "@mui/material/Button";

export const GlButton = ({
  action = () => {},
  afterAction = () => {},
  dataSetIdent = "",
  nameSpace = "",
  record = null,
  className = "",
  color = "",
  size = "",
  children,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleButtonPress = async () => {
    setIsLoading(true);
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
        setIsLoading(false);
        return;
      }
    }
    afterAction(record);
    setIsLoading(false);
  };

  return (
    <>
      <Button
        loading={isLoading}
        variant="contained"
        color={color}
        size={size}
        className={className + " gl-button"}
        onClick={handleButtonPress}
      >
        {children}
      </Button>
    </>
  );
};

export default GlButton;
