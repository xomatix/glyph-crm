import React from "react";
import GlTable from "../../../components/glTable/glTable";
import GlContainer from "../../../components/GlContainer/GlContainer";
import { useParams } from "react-router-dom";

function RecordLogs() {
  const { table_name, id } = useParams();
  return (
    <GlContainer>
      {table_name}_logs ID: {id}
      <GlTable
        nameSpace={"standard"}
        dataSetIdent={"glRecordLogsAll"}
        where={{ table_name: table_name, id: id }}
      />
    </GlContainer>
  );
}

export default RecordLogs;
