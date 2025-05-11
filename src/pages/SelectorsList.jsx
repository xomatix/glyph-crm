import React, { useState } from "react";
import GlTable from "../../components/glTable/glTable";
import { useNavigate } from "react-router";
import GlEdit from "../../components/GlEdit/GlEdit";
import GlRecord from "../../components/GlRecord/GlRecord";

function SelectorsList() {
  const navigate = useNavigate();
  const [selector_name, setSelector_name] = useState("");
  return (
    <div className="selectors-list">
      Selectors
      <br />
      <input
        className={`edit-input`}
        type={"text"}
        value={selector_name}
        onChange={(e) => {
          setSelector_name(e.target.value);
        }}
      />
      <GlTable
        nameSpace={"core"}
        dataSetIdent={"selectorsFnAll"}
        onRowClick={(row) => {
          navigate(`/selectors/${row.gl_selectors_id}`);
        }}
        where={{ selector_name: selector_name }}
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
