import { useNavigate, useParams } from "react-router";
import React, { useState, useRef } from "react";
import "./TypeEdit.css";
import GlRecord from "../../../components/GlRecord/GlRecord";
import GlEdit from "../../../components/GlEdit/GlEdit";
import GlButton from "../../../components/GlButton/GlButton";
import GlContainer from "../../../components/GlContainer/GlContainer";
import GlTable from "../../../components/glTable/glTable";
import GlRow from "../../../components/GlRow/GlRow";
import GlLookup from "../../../components/GlLookup/GlLookup";
import GlSlot from "../../../components/GlSlot/GlSlot";

function CustomerEdit() {
  const { gl_events_id } = useParams();
  const navigate = useNavigate();
  const [counter, setCounter] = useState(0);
  const tableRef = useRef();

  return (
    <div className="container">
      <GlRecord
        dataSetIdent="glTypesAll"
        nameSpace="crm"
        where={{ type_id: gl_events_id }}
      >
        {(RecordContext, record) => (
          <GlContainer>
            <GlEdit field="type" label="Type ID" Context={RecordContext} />

            <GlEdit
              field="typename"
              label="Types name"
              Context={RecordContext}
            />

            <GlEdit
              field="gl_company_name"
              label="Company"
              Context={RecordContext}
            />

            <h2>Statuses connected to a type</h2>

            <GlRecord
              dataSetIdent="glTypesAll"
              nameSpace="crm"
              where={{ type_id: gl_events_id, counter: counter }}
            >
              {(RecordStatusContext, recordStatus) => (
                <glRow>
                  <div style={{ display: "flex" }}>
                    <GlLookup
                      dataSetIdent="glEventsStatusAllDistinct"
                      nameSpace="crm"
                      Context={RecordStatusContext}
                      field={"status"}
                      fieldInLookup={"statusname"}
                      label="Status"
                    >
                      {(row) => (
                        <div style={{ backgroundColor: row.color }}>
                          {row.name}
                        </div>
                      )}
                    </GlLookup>
                    <GlButton
                      nameSpace="crm"
                      dataSetIdent="glStatusesSave"
                      style={{
                        margin: "auto 0 0 0",
                        height: "34px",
                        textWrap: "nowrap",
                      }}
                      record={recordStatus}
                      afterAction={() => {
                        if (tableRef.current) {
                          tableRef.current.refresh();
                        }
                      }}
                    >
                      Add status to a type: {record.name}
                    </GlButton>
                  </div>
                  <div className="c-bottom-table">
                    <GlTable
                      nameSpace={"crm"}
                      dataSetIdent={"glEventsStatusAll"}
                      // onRowClick={(row) => {
                      //   navigate(`/event/${row.gl_events_id}`);
                      // }}
                      where={{ type: gl_events_id }}
                      ref={tableRef}
                      headers={[
                        { label: "Status ID", field: "status" },
                        { label: "Status", field: "statusname" },
                        { label: "Actions", field: "actions" },
                      ]}
                    >
                      <GlSlot slot="statusname">
                        {(row) => (
                          <div
                            style={{
                              backgroundColor: row.color,
                              width: "fit-content",
                              padding: "4px 8px",
                              borderRadius: "8px",
                            }}
                          >
                            {row.statusname}
                          </div>
                        )}
                      </GlSlot>
                      <GlSlot slot="actions">
                        {(row) => (
                          <GlButton
                            className=""
                            dataSetIdent="gl_statusDelete"
                            nameSpace="crm"
                            record={row}
                            afterAction={() => {
                              if (tableRef.current) {
                                tableRef.current.refresh();
                              }
                            }}
                          >
                            delete
                          </GlButton>
                        )}
                      </GlSlot>
                    </GlTable>
                  </div>
                </glRow>
              )}
            </GlRecord>
          </GlContainer>
        )}
      </GlRecord>
    </div>
  );
}

export default CustomerEdit;
