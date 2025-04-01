import React, { useContext, useEffect } from "react";
import "./GlLookup.css";
import GlList from "../GlList/GlList";
import GlEdit from "../GlEdit/GlEdit";

export const GlLookup = ({
  field,
  type = "text",
  label = field,
  fieldInLookup = field,
  showLabel = true,
  dataSetIdent,
  nameSpace,
  Context,
  children,
  where = {},
}) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const contextValue = Context && useContext(Context);
  const { record = {}, setRecord = () => {} } = contextValue || {};

  const handleChange = (newValue) => {
    console.log(newValue[fieldInLookup]);
    setRecord((prev) => ({ ...prev, [field]: newValue[fieldInLookup] }));
  };

  return (
    <div className="edit-container">
      <GlEdit
        field={field}
        type={type}
        label={label}
        showLabel={showLabel}
        Context={Context}
      ></GlEdit>
      <GlList
        dataSetIdent={dataSetIdent}
        nameSpace={nameSpace}
        onClick={(row) => {
          handleChange(row);
        }}
        where={where}
      >
        {(row) => children(row)}
      </GlList>
    </div>
  );
};

export default GlLookup;
