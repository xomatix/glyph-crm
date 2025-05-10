import React from "react";
import GlTable from "../../../components/glTable/glTable";
import { useNavigate } from "react-router";
import GlSlot from "../../../components/GlSlot/GlSlot";

function CustomersList() {
  const navigate = useNavigate();
  return (
    <div className="users-list">
      Users list
      <GlTable
        nameSpace={"crm"}
        dataSetIdent={"glCustomersAll"}
        onRowClick={(row) => {
          navigate(`/customers/${row.gl_customers_id}`);
        }}
        headers={[
          // { label: "ID", field: "gl_customers_id" },
          { label: "Name", field: "name" },
          { label: "Ident", field: "ident" },
          { label: "Email", field: "email" },
          { label: "Phone", field: "phone" },
        ]}
      >
        <GlSlot slot="email">
          {(row) => <a href={`mailto:${row.email}`}>{row.email}</a>}
        </GlSlot>
        <GlSlot slot="phone">
          {(row) => <a href={`tel:${row.phone}`}>{row.phone}</a>}
        </GlSlot>
      </GlTable>
    </div>
  );
}

export default CustomersList;
