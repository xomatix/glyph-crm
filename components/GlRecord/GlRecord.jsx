import React, { createContext, useState, useMemo, useEffect } from "react";
import service from "../../glService/glService";

export const GlRecord = ({
  initialRecord = null,
  dataSetIdent = "",
  nameSpace = "",
  where = {},
  afterChange = () => {},
  children,
}) => {
  const RecordContext = useMemo(() => createContext(null), []);
  const [record, setRecord] = useState(initialRecord);

  useEffect(() => {
    const download = async () => {
      let resp = await service.select(nameSpace, dataSetIdent, {
        where: where,
      });
      if (resp !== null && resp.length > 0) {
        setRecord(resp[0]);
      } else {
        setRecord({});
      }
    };
    if (initialRecord === null) download();
  }, []);

  useEffect(() => {
    afterChange();
  }, [record]);

  return (
    <>
      {record !== null && (
        <RecordContext.Provider value={{ record, setRecord }}>
          {children(RecordContext, record, setRecord)}
        </RecordContext.Provider>
      )}
    </>
  );
};

export default GlRecord;
