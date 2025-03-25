import React, { useContext } from "react";

export const GlEdit = ({ field, type = "text", label = field, Context }) => {
  const { record, setRecord } = useContext(Context);

  const handleChange = (e) => {
    setRecord((prev) => ({ ...prev, [field]: e.target.value }));
  };

  return (
    <label>
      {label}
      {type == "textarea" && (
        <textarea value={record[field] || ""} onChange={handleChange} />
      )}
      {type == "text" && (
        <input
          type={type}
          value={record[field] || ""}
          onChange={handleChange}
        />
      )}
    </label>
  );
};

export default GlEdit;
