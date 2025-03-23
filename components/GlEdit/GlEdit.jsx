import React, { useContext } from "react";

export const GlEdit = ({ field, Context }) => {
  const { record, setRecord } = useContext(Context);

  const handleChange = (e) => {
    setRecord((prev) => ({ ...prev, [field]: e.target.value }));
  };

  return (
    <input type="text" value={record[field] || ""} onChange={handleChange} />
  );
};

export default GlEdit;
