import React, { useContext } from "react";
import "./GlEdit.css";
import GlRow from "../GlRow/GlRow";
import { Checkbox, FormControlLabel, Switch, TextField } from "@mui/material";

export const GlEdit = ({
  field,
  type = "text",
  label = field,
  showLabel = true,
  onFocus = () => {},
  onBlur = () => {},
  onEnter = () => {},
  Context,
  readOnly = false,
}) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const contextValue = Context && useContext(Context);
  const { record = {}, setRecord = () => {} } = contextValue || {};

  const handleChange = (e) => {
    let newVal = e.target.value;
    if (type == "switch") {
      newVal = record[field] ? false : true;
    }
    setRecord((prev) => ({ ...prev, [field]: newVal }));
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      onEnter(record);
    }
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
      {showLabel &&
        !["text", "datetime", "color", "switch", "number"].includes(type) && (
          <label>{label}</label>
        )}
      {type == "textarea" && (
        <textarea
          className={`edit-input textarea${readOnly ? " readOnly" : ""}`}
          value={record[field] || ""}
          onChange={handleChange}
        />
      )}
      {["text", "number"].includes(type) && (
        <TextField
          id={field}
          disabled={readOnly}
          type={type}
          value={record[field] || ""}
          onChange={handleChange}
          onKeyUp={handleEnter}
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
      {["switch"].includes(type) && (
        <FormControlLabel
          id={field}
          disabled={readOnly}
          label={label}
          control={
            <Switch
              size="medium"
              onChange={handleChange}
              checked={record[field]}
              variant="outlined"
            />
          }
        />
      )}
    </div>
  );
};

export default GlEdit;
