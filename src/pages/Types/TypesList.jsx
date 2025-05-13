import React from "react";
import GlTable from "../../../components/glTable/glTable";
import { useNavigate } from "react-router";
import "./TypesList.css";
import GlSlot from "../../../components/GlSlot/GlSlot";
import GlButton from "../../../components/GlButton/GlButton";

function SelectorsList() {
  const navigate = useNavigate();
  return (
     <div className="selectors-list p-4">
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
        <h2 className="text-xl font-semibold">Types</h2>
        <GlButton
          className="primary"
          afterAction={() => {
            navigate(`/event/0`);
          }}
        >
          Add new type
        </GlButton>
      </div>
      <GlTable
        nameSpace={"crm"}
        dataSetIdent={"glTypesAll"}
        // onRowClick={(row) => {
        //   navigate(`/event/${row.gl_events_id}`);
        // }}
        headers={[
          { label: "Type ID", field: "type" },
          { label: "Type", field: "typename" },
          { label: "Company", field: "gl_company_name" },
          { label: "Actions", field: "actions" },
        ]}
      >
        <GlSlot slot="typename">
          {(row) => (
            <div style={{backgroundColor: row.color, width: 'fit-content', padding: '4px 8px', borderRadius: '8px'}}>{row.typename}</div>
          )}
        </GlSlot>
        <GlSlot slot="actions">
          {(row) => (
            <GlButton
              className=""
              action={() => {
                navigate(`/type/${row.type}`);
              }}
            >
              Open
            </GlButton>
          )}
        </GlSlot>
      </GlTable>
      {/* <tr>
        <th>customer</th>
        <th>date</th>
        <th>desc</th>
        <th>gl_companies_id</th>
        <th>gl_events_id</th>
        <th>gl_username</th>
        <th>ident</th>
        <th>status</th>
        <th>statusname</th>
        <th>title</th>
        <th>type</th>
        <th>typename</th>
        <th>user</th>
      </tr> */}
    </div>
  </div>
  );
}

export default SelectorsList;
