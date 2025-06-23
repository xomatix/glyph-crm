import React, { useContext } from "react";
import "./GlEdit.css";
import GlRow from "../GlRow/GlRow";
import { Checkbox, FormControlLabel, Switch, TextField } from "@mui/material";
import MonacoEditor from "@monaco-editor/react";
import { useState } from "react";

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
  const [showPass, setShowPass] = useState(false);

  const EyeIcon = () => {
    return (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15.0007 12C15.0007 13.6569 13.6576 15 12.0007 15C10.3439 15 9.00073 13.6569 9.00073 12C9.00073 10.3431 10.3439 9 12.0007 9C13.6576 9 15.0007 10.3431 15.0007 12Z"
          stroke="#000000"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12.0012 5C7.52354 5 3.73326 7.94288 2.45898 12C3.73324 16.0571 7.52354 19 12.0012 19C16.4788 19 20.2691 16.0571 21.5434 12C20.2691 7.94291 16.4788 5 12.0012 5Z"
          stroke="#000000"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  };
  const EyeClosedIcon = () => {
    return (
      <svg
        width="20"
        height="20`"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2.99902 3L20.999 21M9.8433 9.91364C9.32066 10.4536 8.99902 11.1892 8.99902 12C8.99902 13.6569 10.3422 15 11.999 15C12.8215 15 13.5667 14.669 14.1086 14.133M6.49902 6.64715C4.59972 7.90034 3.15305 9.78394 2.45703 12C3.73128 16.0571 7.52159 19 11.9992 19C13.9881 19 15.8414 18.4194 17.3988 17.4184M10.999 5.04939C11.328 5.01673 11.6617 5 11.9992 5C16.4769 5 20.2672 7.94291 21.5414 12C21.2607 12.894 20.8577 13.7338 20.3522 14.5"
          stroke="#000000"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    );
  };

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
        !["text", "datetime", "color", "switch", "number", "password"].includes(
          type
        ) && <label>{label}</label>}
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
      {["password"].includes(type) && (
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
            type={showPass ? "text" : "password"}
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
              onClick={() => setShowPass(!showPass)}
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
              {showPass ? <EyeClosedIcon /> : <EyeIcon />}
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
