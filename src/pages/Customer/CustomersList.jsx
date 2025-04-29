import React from "react";
import GlTable from "../../../components/glTable/glTable";
import { useNavigate } from "react-router";

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
      />
    </div>
  );
}

export default CustomersList;
