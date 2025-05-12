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
    <div className="users-list">
      Users Table
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
                {
                  field: "gl_users_id",
                  label: "ID",
                },
                {
                  field: "gl_username",
                  label: "Username",
                },
                {
                  field: "gl_email",
                  label: "EMail",
                },
                {
                  field: "is_active",
                  label: "Active",
                },
              ]}
              // gl_companies_id		gl_username	gl_users_id	is_active
              // where={{ id: record["books_id"] }}
              onRowClick={(row) => {
                navigate(`/users/${row.gl_users_id}`);
              }}
            />
          </div>
        )}
      </GlRecord>
    </div>
  );
}

export default UsersList;
