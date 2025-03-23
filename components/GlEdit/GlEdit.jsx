import React, { useContext } from "react";

export const GlEdit = ({ field, label = field, Context }) => {
  const { record, setRecord } = useContext(Context);

  const handleChange = (e) => {
    setRecord((prev) => ({ ...prev, [field]: e.target.value }));
  };

  return (
    <label>
      {label}
      <input type="text" value={record[field] || ""} onChange={handleChange} />
    </label>
  );
};

export default GlEdit;
