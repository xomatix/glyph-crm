import React from "react";
import GlTable from "../../components/glTable/glTable";
import GlList from "../../components/GlList/GlList";

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
      Books List
      <GlList nameSpace={"bookstore"} dataSetIdent={"booksFnAll"}>
        {(row) => <div>{JSON.stringify(row)}</div>}
      </GlList>
    </div>
  );
}

export default UsersList;
