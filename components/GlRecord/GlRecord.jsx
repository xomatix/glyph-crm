import React, { createContext, useState, useMemo } from "react";

// RecordProvider that dynamically creates its own context
export const GlRecord = ({ initialRecord, children }) => {
  const RecordContext = useMemo(() => createContext(null), []);
  const [record, setRecord] = useState(initialRecord);

  return (
    <RecordContext.Provider value={{ record, setRecord }}>
      {children(RecordContext)}
    </RecordContext.Provider>
  );
};

export default GlRecord;
