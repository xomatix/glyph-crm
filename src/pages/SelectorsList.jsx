import React from "react";
import GlTable from "../../components/glTable/glTable";
import { useNavigate } from "react-router";

function SelectorsList() {
  const navigate = useNavigate();
  return (
    <div className="selectors-list">
      Selectors
      <GlTable
        nameSpace={"core"}
        dataSetIdent={"selectorsFnAll"}
        onRowClick={(row) => {
          navigate(`/selectors/${row.gl_selectors_id}`);
        }}
        headers={[
          // { label: "ID", field: "gl_selectors_id" },
          { label: "Namespace", field: "selector_namespace" },
          { label: "Selector name", field: "selector_name" },
          { label: "Page size", field: "page_size" },
        ]}
      />
    </div>
  );
}

export default SelectorsList;
