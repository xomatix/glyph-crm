import React from "react";
import GlTable from "../../../components/glTable/glTable";
import { useNavigate } from "react-router";
import GlSlot from "../../../components/GlSlot/GlSlot";
import GlButton from "../../../components/GlButton/GlButton";

function SelectorsList() {
  const navigate = useNavigate();
  return (
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
          <GlButton
            className="primary"
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
          headers={[
            { label: "Title", field: "title" },
            { label: "Date", field: "date" },
            { label: "Owner", field: "gl_username" },
            { label: "Customer", field: "ident" },
            { label: "Status", field: "statusname" },
            { label: "Type", field: "typename" },
            { label: "Description", field: "desc" },
            { label: "Actions", field: "actions" },
          ]}
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
                  ? row.date.replace("T", " ").substring(0, 19)
                  : ""}
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
  );
}

export default SelectorsList;
