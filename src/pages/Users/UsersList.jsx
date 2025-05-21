import React, { useEffect, useRef, useState } from "react";
import GlTable from "../../../components/glTable/glTable";
import GlRecord from "../../../components/GlRecord/GlRecord";
import { useNavigate } from "react-router-dom";
import { getMenuPermissions } from "../../../glService/glService";
import GlButton from "../../../components/GlButton/GlButton";

function UsersList() {
  const booksTableRef = useRef();
  const navigate = useNavigate();
  const [menuPermissions, setMenuPermissions] = useState([]);

  useEffect(() => {
    async function loadRoles() {
      setMenuPermissions(await getMenuPermissions());
    }
    loadRoles();
  }, []);

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
              <div className="filters">
                {menuPermissions.includes("admin") && (
                  <GlButton
                    color="primary"
                    record={record}
                    action={() => {
                      navigate("/users/0");
                    }}
                  >
                    Add user
                  </GlButton>
                )}
              </div>
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
