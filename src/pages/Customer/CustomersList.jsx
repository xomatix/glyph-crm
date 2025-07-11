import React from "react";
import GlTable from "../../../components/glTable/glTable";
import { useNavigate } from "react-router";
import GlSlot from "../../../components/GlSlot/GlSlot";
import GlButton from "../../../components/GlButton/GlButton";

function CustomersList() {
  const navigate = useNavigate();
  return (
    <div style={{ padding: "16px" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "16px",
          }}
        >
          <h2 style={{ fontSize: "20px", fontWeight: "600", margin: 0 }}>
            Customers list
          </h2>
          <GlButton
            color="primary"
            afterAction={() => {
              navigate(`/customers/0`);
            }}
          >
            Add new customer
          </GlButton>
        </div>

        {/* Table */}
        <GlTable
          nameSpace={"crm"}
          dataSetIdent={"glCustomersAll"}
          onRowClick={(row) => {
            navigate(`/customers/${row.gl_customers_id}`);
          }}
          headers={[
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
