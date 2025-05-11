import React from "react";
import GlTable from "../../../components/glTable/glTable";
import { useNavigate } from "react-router";
import GlSlot from "../../../components/GlSlot/GlSlot";
import GlButton from "../../../components/GlButton/GlButton";

function SelectorsList() {
  const navigate = useNavigate();
  return (
    <div className="selectors-list">
      Statuses
      <GlButton
        className="primary"
        afterAction={() => {
          navigate(`/event/0`);
        }}
      >
        Add new status
      </GlButton>
      <GlTable
        nameSpace={"crm"}
        dataSetIdent={"glEventsStatusAllDistinct"}
        // onRowClick={(row) => {
        //   navigate(`/event/${row.gl_events_id}`);
        // }}
        headers={[
          { label: "Type", field: "statusname" },
          { label: "Actions", field: "actions" },
        ]}
      >
        <GlSlot slot="statusname">
          {(row) => (
            <div style={{backgroundColor: row.color, width: 'fit-content', padding: '4px 8px', borderRadius: '8px'}}>{row.statusname}</div>
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
  );
}

export default SelectorsList;
