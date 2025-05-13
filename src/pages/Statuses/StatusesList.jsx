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
        {/* Header and button */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "16px",
          }}
        >
          <h2 style={{ fontSize: "20px", fontWeight: "600", margin: 0 }}>
            Statuses
          </h2>
          <GlButton
            color="primary"
            afterAction={() => {
              navigate(`/status/0`);
            }}
          >
            Add new status
          </GlButton>
        </div>

        {/* Table */}
        <GlTable
          nameSpace={"crm"}
          dataSetIdent={"glEventsStatusAllDistinct"}
          headers={[
            { label: "Type", field: "statusname" },
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
                action={() => {
                  navigate(`/status/${row.status}`);
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
