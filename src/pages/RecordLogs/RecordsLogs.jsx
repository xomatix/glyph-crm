import React, { useState } from "react";
import GlTable from "../../../components/glTable/glTable";
import GlContainer from "../../../components/GlContainer/GlContainer";
import { useParams } from "react-router-dom";
import GlSlot from "../../../components/GlSlot/GlSlot";
import GlModal from "../../../components/GlModal/GlModal";

function RecordLogs() {
  const { table_name, id } = useParams();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState({ record: {} });
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
        onRowClick={(row) => {
          setSelectedRow(row);
          setModalOpen(true);
        }}
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
      <GlModal
        isOpen={modalOpen}
        title={`${selectedRow.operation} at ${selectedRow.log_time}`}
        onClose={() => setModalOpen(false)}
      >
        {Object.keys(selectedRow.record).map((row) => (
          <div>
            <b>{row}</b> : <span>{selectedRow.record[row]}</span>
          </div>
        ))}
      </GlModal>
    </GlContainer>
  );
}

export default RecordLogs;
