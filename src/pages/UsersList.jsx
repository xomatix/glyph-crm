import React from "react";
import GlTable from "../../components/glTable/glTable";
import GlList from "../../components/GlList/GlList";
import GlContainer from "../../components/Container/GlContainer";
import GlRecord from "../../components/GlRecord/GlRecord";

function UsersList() {
  return (
    <div className="users-list">
      Users Table
      <GlTable
        nameSpace={"bookstore"}
        dataSetIdent={"booksFnAll"}
        onRowClick={(row) => {
          console.log("Row clicked:", row);
        }}
      />
      <GlRecord
        nameSpace={"bookstore"}
        dataSetIdent={"booksFnAll"}
        where={{ id: 1000 }}
      >
        {(RecordContext, record) => <p>{JSON.stringify(record)}</p>}
      </GlRecord>
      Books List
      <GlContainer>
        <GlList nameSpace={"bookstore"} dataSetIdent={"booksFnAll"}>
          {(row) => <div>{JSON.stringify(row)}</div>}
        </GlList>
      </GlContainer>
    </div>
  );
}

export default UsersList;
