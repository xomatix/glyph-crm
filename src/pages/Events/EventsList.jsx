import React, { useContext, useState, useEffect, useRef } from "react";
import GlTable from "../../../components/glTable/glTable";
import { useNavigate } from "react-router";
import GlSlot from "../../../components/GlSlot/GlSlot";
import GlButton from "../../../components/GlButton/GlButton";
import GlRecord from "../../../components/GlRecord/GlRecord";
import GlEdit from "../../../components/GlEdit/GlEdit";
import GlLookup from "../../../components/GlLookup/GlLookup";
import service from "../../../glService/glService";
import "./EventsList.css";

function SelectorsList() {
  const navigate = useNavigate();
  const tableRef = useRef();
  const [userRoles, setUserRoles] = useState([]);

  async function loadRoles() {
    const result = await getMenuPermissions();
    setUserRoles(result);
  }
  useEffect(() => {
    loadRoles();
  }, []);
  async function getMenuPermissions() {
    const result = await service.select("crm", "glMenuPermissions", {});
    return result.map((o) => o.name);
  }
  return (
    <GlRecord
      initialRecord={{ isMine: 0 }}
      afterChange={() => {
        if (tableRef.current) {
          tableRef.current.refresh();
        }
      }}
    >
      {(RecordContext, record, setRecord) => (
        <div className="selectors-list" style={{ padding: "16px" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            {/* Title and button row */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                marginBottom: "16px",
              }}
            >
              <h2 style={{ fontSize: "20px", fontWeight: "600", margin: 0 }}>
                Events
              </h2>
              <div>
                <GlEdit
                  label={"Search"}
                  field={"event_title_desc"}
                  Context={RecordContext}
                />
              </div>
              <div>
                <GlLookup
                  dataSetIdent="glEventsStatusAll"
                  nameSpace="crm"
                  Context={RecordContext}
                  field={"status_name"}
                  fieldInLookup={"status_name"}
                  label="Status"
                >
                  {(row) => (
                    <div style={{ backgroundColor: row.color }}>{row.name}</div>
                  )}
                </GlLookup>
              </div>
              <div>
                <GlLookup
                  dataSetIdent="glTypesAll"
                  nameSpace="crm"
                  Context={RecordContext}
                  field={"typename"}
                  fieldInLookup={"typename"}
                  label="Type"
                  where={{ companies_id: 1 }}
                >
                  {(row) => <div>{row.typename}</div>}
                </GlLookup>
              </div>
              {userRoles.length > 0 && (
                <div>
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <input
                      className="role-set-checkbox"
                      type="checkbox"
                      checked={!!record.isMine}
                      onChange={(e) => {
                        setRecord((prev) => ({
                          ...prev,
                          isMine: e.target.checked ? 1 : 0,
                        }));
                      }}
                    />
                    Only show my events
                  </label>
                </div>
              )}

              <GlButton
                color="primary"
                afterAction={() => {
                  navigate(`/event/0`);
                }}
              >
                Add new event
              </GlButton>
            </div>

            {/* Table */}
            <GlTable
              nameSpace={"crm"}
              dataSetIdent={"glEventsAll"}
              ref={tableRef}
              headers={[
                { label: "Title", field: "title" },
                { label: "Date", field: "date_list" },
                { label: "Owner", field: "gl_username" },
                { label: "Customer", field: "ident" },
                { label: "Status", field: "statusname" },
                { label: "Type", field: "typename" },
                { label: "Description", field: "desc" },
                { label: "Actions", field: "actions" },
              ]}
              where={{
                event_title_desc: record.event_title_desc,
                status_name: record.status_name,
                isMine: record.isMine,
                typename: record.typename,
              }}
            >
              <GlSlot slot="title">
                {(row) => (
                  <div
                    style={{ color: "#1090FF", cursor: "pointer" }}
                    onClick={() => navigate(`/event/${row.gl_events_id}`)}
                  >
                    {row.title}
                  </div>
                )}
              </GlSlot>
              <GlSlot slot="date">
                {(row) => (
                  <div>
                    {row.date != null
                      ? row.date.replace("T", " ").substring(0, 10)
                      : ""}
                  </div>
                )}
              </GlSlot>
              <GlSlot slot="statusname">
                {(row) => (
                  <div
                    style={{
                      backgroundColor: row.statuscolor,
                      width: "fit-content",
                      padding: "4px 8px",
                      borderRadius: "8px",
                    }}
                  >
                    {row.statusname}
                  </div>
                )}
              </GlSlot>
              <GlSlot slot="ident">
                {(row) => (
                  <div
                    style={{ color: "#1090FF", cursor: "pointer" }}
                    onClick={() => navigate(`/customers/${row.customer}`)}
                  >
                    {row.ident}
                  </div>
                )}
              </GlSlot>
              <GlSlot slot="actions">
                {(row) => (
                  <GlButton
                    action={() => {
                      navigate(`/event/${row.gl_events_id}`);
                    }}
                  >
                    Open
                  </GlButton>
                )}
              </GlSlot>
            </GlTable>
          </div>
        </div>
      )}
    </GlRecord>
  );
}

export default SelectorsList;
