import { useState } from "react";
import service from "../../glService/glService";
import "./GlButton.css";
import Button from "@mui/material/Button";
import GlModal from "../GlModal/GlModal";
import GlRow from "../GlRow/GlRow";

export const GlButton = ({
  action = () => {},
  afterAction = () => {},
  dataSetIdent = "",
  nameSpace = "",
  record = null,
  className = "",
  color = "",
  size = "",
  confirmMessage = "",
  children,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleButtonPressWithModal = async () => {
    setIsLoading(true);

    if (
      confirmMessage != "" &&
      confirmMessage != null &&
      confirmMessage.length > 0
    ) {
      setIsModalOpen(true);
    } else {
      handleButtonPress();
    }
  };

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
        onClick={handleButtonPressWithModal}
      >
        {children}
      </Button>
      <GlModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsLoading(false);
          setIsModalOpen(false);
        }}
      >
        {confirmMessage}
        <GlRow className="confirm-btn-row">
          <Button
            variant="contained"
            color="error"
            size="medium"
            className={"gl-button-cancel gl-button"}
            onClick={() => {
              setIsLoading(false);
              setIsModalOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="medium"
            className={"gl-button-confirm gl-button"}
            onClick={handleButtonPress}
          >
            Confirm
          </Button>
        </GlRow>
      </GlModal>
    </>
  );
};

export default GlButton;
