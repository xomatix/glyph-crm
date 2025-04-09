import React, { useContext } from "react";
import "./GlEdit.css";

export const GlEdit = ({
  field,
  type = "text",
  label = field,
  showLabel = true,
  onFocus = () => {},
  onBlur = () => {},
  Context,
}) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const contextValue = Context && useContext(Context);
  const { record = {}, setRecord = () => {} } = contextValue || {};

  const handleChange = (e) => {
    setRecord((prev) => ({ ...prev, [field]: e.target.value }));
  };

  return (
    <div
      className="edit-container"
      onFocus={() => {
        onFocus(record);
      }}
      onBlur={() => {
        onBlur(record);
      }}
    >
      {showLabel && <label>{label}</label>}
      {type == "textarea" && (
        <textarea
          className="edit-input textarea"
          value={record[field] || ""}
          onChange={handleChange}
        />
      )}
      {type == "text" && (
        <input
          className="edit-input textarea"
          type={type}
          value={record[field] || ""}
          onChange={handleChange}
        />
      )}
    </div>
  );
};

export default GlEdit;
