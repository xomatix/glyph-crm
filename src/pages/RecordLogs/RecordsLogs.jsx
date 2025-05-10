import React from "react";
import GlTable from "../../../components/glTable/glTable";
import GlContainer from "../../../components/GlContainer/GlContainer";
import { useParams } from "react-router-dom";
import GlSlot from "../../../components/GlSlot/GlSlot";

function RecordLogs() {
  const { table_name, id } = useParams();
  return (
    <GlContainer>
      {table_name}_logs ID: {id}
      <GlTable
        nameSpace={"standard"}
        dataSetIdent={"glRecordLogsAll"}
        where={{ table_name: table_name, id: id }}
        headers={[
          { label: "log_time", field: "log_time" },
          { label: "operation", field: "operation" },
          { label: "record", field: "record" },
        ]}
      >
        <GlSlot slot="log_time">
          {(row) => (
            <div>{row.log_time.replace("T", " ").substring(0, 19)}</div>
          )}
        </GlSlot>
        <GlSlot slot="record">
          {(row) => <div>{JSON.stringify(row.record)}</div>}
        </GlSlot>
      </GlTable>
    </GlContainer>
  );
}

export default RecordLogs;
