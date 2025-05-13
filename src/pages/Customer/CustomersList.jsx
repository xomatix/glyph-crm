import React from "react";
import GlTable from "../../../components/glTable/glTable";
import { useNavigate } from "react-router";
import GlSlot from "../../../components/GlSlot/GlSlot";

function CustomersList() {
  const navigate = useNavigate();
  return (
 <div className="users-list p-4">
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      {/* Header and table */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          marginBottom: "16px",
        }}
      >
        <h2 className="text-xl font-semibold">Users list</h2>
      </div>
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
  </div>
  );
}

export default CustomersList;
