import React from "react";
import GlTable from "../../../components/glTable/glTable";
import { useNavigate } from "react-router";
import GlSlot from "../../../components/GlSlot/GlSlot";
import GlButton from "../../../components/GlButton/GlButton";

function SelectorsList() {
  const navigate = useNavigate();
  return (
    <div className="selectors-list">
      Events
      <GlTable
        nameSpace={"crm"}
        dataSetIdent={"glEventsAll"}
        // onRowClick={(row) => {
        //   navigate(`/event/${row.gl_events_id}`);
        // }}
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
              className=""
              action={() => {
                navigate(`/event/${row.gl_events_id}`);
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
  );
}

export default SelectorsList;
