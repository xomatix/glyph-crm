import React from "react";
import GlTable from "../../components/glTable/glTable";

function UsersList() {
  return (
    <div className="users-list">
      Users list
      <GlTable
        nameSpace={"bookstore"}
        dataSetIdent={"booksFnAll"}
        onRowClick={(row) => {
          console.log("Row clicked:", row);
        }}
      />
    </div>
  );
}

export default UsersList;
