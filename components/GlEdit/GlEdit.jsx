import React, { useContext } from "react";
import "./GlEdit.css";
import GlRow from "../GlRow/GlRow";

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
          id={field}
          className="edit-input textarea"
          type={type}
          value={record[field] || ""}
          onChange={handleChange}
        />
      )}
      {type == "color" && (
        <GlRow>
          <input
            id={field}
            className="edit-input gl-input"
            type="text"
            value={record[field] || ""}
            onChange={handleChange}
          />
          <input
            id={field + "_picker"}
            className="gl-input color-picker"
            type={type}
            value={record[field] || ""}
            onChange={handleChange}
          />
        </GlRow>
      )}
      {type == "datetime" && (
        <input
          id={field}
          className="gl-date gl-input"
          type="datetime-local"
          value={record[field]}
          onChange={handleChange}
        />
      )}
    </div>
  );
};

export default GlEdit;
