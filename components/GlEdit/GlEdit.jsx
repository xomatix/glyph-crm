import React, { useContext } from "react";
import "./GlEdit.css";
import GlRow from "../GlRow/GlRow";
import { TextField } from "@mui/material";

export const GlEdit = ({
  field,
  type = "text",
  label = field,
  showLabel = true,
  onFocus = () => {},
  onBlur = () => {},
  Context,
  readOnly = false,
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
      {showLabel && !["text", "datetime", "color"].includes(type) && (
        <label>{label}</label>
      )}
      {type == "textarea" && (
        <textarea
          className={`edit-input textarea${readOnly ? " readOnly" : ""}`}
          value={record[field] || ""}
          onChange={handleChange}
        />
      )}
      {type == "text" && (
        <TextField
          id={field}
          disabled={readOnly}
          type={type}
          value={record[field] || ""}
          onChange={handleChange}
          label={label}
          size="small"
          variant="outlined"
        />
      )}
      {type == "color" && (
        <GlRow className="gl-edit gl-color-picker">
          <TextField
            id={field}
            disabled={readOnly}
            type="text"
            value={record[field] || ""}
            onChange={handleChange}
            label={label}
            size="small"
            variant="outlined"
          />
          <TextField
            id={field + "_picker"}
            disabled={readOnly}
            className="color-picker"
            type={type}
            value={record[field] || ""}
            onChange={handleChange}
            // label={label}
            size="small"
            variant="outlined"
          />
        </GlRow>
      )}
      {type == "datetime" && (
        <TextField
          id={field}
          disabled={readOnly}
          type="datetime-local"
          value={record[field] || ""}
          onChange={handleChange}
          label={label}
          size="small"
          variant="outlined"
        />
      )}
    </div>
  );
};

export default GlEdit;
