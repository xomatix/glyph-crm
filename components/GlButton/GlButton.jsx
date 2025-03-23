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
      if (data && data.length > 0) {
        action(data[0]);
      }
    }
    afterAction(record);
  };

  return <button onClick={handleButtonPress}>{children}</button>;
};

export default GlButton;
