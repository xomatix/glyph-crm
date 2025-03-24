import React, { useContext } from "react";
import service from "../../glService/glService";

export const GlButton = ({
  action = () => {},
  afterAction = () => {},
  dataSetIdent = "",
  nameSpace = "",
  Context,
  children,
}) => {
  const { record, _ } = useContext(Context);

  const handleButtonPress = async () => {
    console.log("Burrom press", record, dataSetIdent, nameSpace);
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

  return <button onClick={handleButtonPress}>{children}</button>;
};

export default GlButton;
