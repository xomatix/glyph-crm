import React, { useRef } from "react";
import GlTable from "../../../components/glTable/glTable";
import GlList from "../../../components/GlList/GlList";
import GlContainer from "../../../components/GlContainer/GlContainer";
import GlRecord from "../../../components/GlRecord/GlRecord";
import GlLookup from "../../../components/GlLookup/GlLookup";
import { useNavigate } from "react-router-dom";

function UsersList() {
  const booksTableRef = useRef();
  const navigate = useNavigate();

return (
  <div className="users-list" style={{ padding: "16px" }}>
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      {/* Header aligned with table */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          marginBottom: "16px",
        }}
      >
        <h2 style={{ fontSize: "20px", fontWeight: "600", margin: 0 }}>
          Users Table
        </h2>
        {/* Optional: Add a button here later */}
      </div>

      <GlRecord
        nameSpace={"bookstore"}
        dataSetIdent={"booksFnAll"}
        afterChange={() => {}}
      >
        {(RecordContext, record) => (
          <div>
            <div className="filters"></div>
            <GlTable
              ref={booksTableRef}
              nameSpace={"standard"}
              dataSetIdent={"glUsersAll"}
              headers={[
                { field: "gl_users_id", label: "ID" },
                { field: "gl_username", label: "Username" },
                { field: "gl_email", label: "EMail" },
                { field: "is_active", label: "Active" },
              ]}
              onRowClick={(row) => {
                navigate(`/users/${row.gl_users_id}`);
              }}
            />
          </div>
        )}
      </GlRecord>
    </div>
  </div>
);


}

export default UsersList;
