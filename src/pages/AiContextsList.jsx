import React from "react";
import GlTable from "../../components/glTable/glTable";
import { useNavigate } from "react-router";
import GlButton from "../../components/GlButton/GlButton";

function AiContextsList() {
  const navigate = useNavigate();
  return (
    <div className="ai-contents-list">
      Selectors
      <GlButton
        action={() => {
          navigate("/ai-context/0");
        }}
      >
        ➕
      </GlButton>
      <GlTable
        nameSpace={"core"}
        dataSetIdent={"glAiContextFnAll"}
        onRowClick={(row) => {
          navigate(`/ai-context/${row.gl_ai_context_id}`);
        }}
      />
    </div>
  );
}

export default AiContextsList;
