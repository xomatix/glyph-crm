import React, { useContext } from "react";
import "./GlEdit.css";
import GlRow from "../GlRow/GlRow";
import { Checkbox, FormControlLabel, Switch, TextField } from "@mui/material";
import MonacoEditor from "@monaco-editor/react";

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
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
          }}
        >
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
            style={{ flex: 1 }}
          />
          {record[field] && !readOnly && (
            <button
              type="button"
              onClick={() => setRecord((prev) => ({ ...prev, [field]: "" }))}
              style={{
                position: "absolute",
                right: 8,
                background: "transparent",
                border: "none",
                cursor: "pointer",
                fontSize: 18,
                color: "#aaa",
                padding: 0,
                lineHeight: 1,
              }}
              aria-label="Clear"
              tabIndex={-1}
            >
              ×
            </button>
          )}
        </div>
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
      {type === "sql" && (
        <div
          style={{
            minHeight: 200,
            border: "1px solid #ccc",
            borderRadius: 4,
            marginTop: 8,
          }}
        >
          <MonacoEditor
            defaultLanguage={"sql"}
            theme="hc-black"
            height="800px"
            value={record[field] || ""}
            options={{
              minimap: { enabled: true },
              fontSize: 14,
              wordWrap: "on",
              scrollBeyondLastLine: false,
              automaticLayout: true,
            }}
            onChange={(value) =>
              setRecord((prev) => ({ ...prev, [field]: value }))
            }
          />
        </div>
      )}
    </div>
  );
};

export default GlEdit;
