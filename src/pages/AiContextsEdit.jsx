import React from "react";
import { useNavigate, useParams } from "react-router";
import GlRecord from "../../components/GlRecord/GlRecord";
import GlEdit from "../../components/GlEdit/GlEdit";
import GlButton from "../../components/GlButton/GlButton";

import GlContainer from "../../components/GlContainer/GlContainer";
import "./SelectorsEdit.css";

function AiContextsEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div>
      Ai Context Edit {id}
      <GlRecord
        dataSetIdent="glAiContextFnAll"
        nameSpace="core"
        where={{ gl_ai_context_id: id }}
      >
        {(RecordContext) => (
          <div className="selectors-edit">
            <GlContainer>
              <h2>Context</h2>
              <br />
              <GlEdit field="name" Context={RecordContext} />
              <br />
              <GlEdit field="selector_fn_name" Context={RecordContext} />
              <br />
              <GlEdit field="selector_fn_namespace" Context={RecordContext} />
              <br />
              <GlButton
                dataSetIdent="glAiContextSave"
                nameSpace="core"
                color="primary"
                Context={RecordContext}
                afterAction={async (record) => {
                  console.log(record);
                  if (
                    record["gl_ai_context_id"] !== null &&
                    record["gl_ai_context_id"] !== Number(id)
                  ) {
                    navigate(`/ai-context/${record["gl_ai_context_id"]}`);
                  } else {
                    navigate(0);
                  }
                }}
              >
                Save
              </GlButton>
            </GlContainer>
            <GlContainer>
              <GlEdit type="textarea" field="prompt" Context={RecordContext} />
            </GlContainer>
          </div>
        )}
      </GlRecord>
    </div>
  );
}

export default AiContextsEdit;
