import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import GlRecord from "../../components/GlRecord/GlRecord";
import GlEdit from "../../components/GlEdit/GlEdit";
import GlButton from "../../components/GlButton/GlButton";
import service from "../../glService/glService";
import GlContainer from "../../components/GlContainer/GlContainer";
import "./SelectorsEdit.css";
import aiIcon from "../assets/ai.svg";
import ReactMarkdown from "react-markdown";

function SelectorEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [aiResponse, setAiResponse] = useState(null);

  const askAiFn = async (record) => {
    // alert("Function");

    const resp = await service.askAi(
      "selectors_tables_ctx",
      "My current sql:\n" +
        record["selector_fn"].replaceAll("'", "''") +
        "\n" +
        record["prompt"].replaceAll("'", "''"),
      {
        where: {
          selector_fn: record["selector_fn"].replaceAll("'", "''"),
        },
      }
    );

    console.log(resp);
    if (resp["response"] != null || resp["response"] != undefined) {
      setAiResponse(resp["response"]);
    } else {
      setAiResponse("No response");
    }
  };

  return (
    <div>
      Customer Edit {id}
      <GlRecord
        dataSetIdent="selectorsFnAll"
        nameSpace="core"
        where={{ gl_selectors_id: id }}
      >
        {(RecordContext, record) => (
          <div className="row">
            <div
              className="column"
              style={{ marginRight: "16px", width: "30%" }}
            >
              <GlContainer>
                <h2>Selector</h2>

                <GlEdit
                  readOnly={record.gl_selectors_id != null}
                  field="selector_name"
                  Context={RecordContext}
                />

                <GlEdit
                  readOnly={record.gl_selectors_id != null}
                  field="selector_namespace"
                  Context={RecordContext}
                />

                <GlEdit field="page_size" Context={RecordContext} />

                <GlButton
                  action={async (record) => {
                    console.log(record);
                    await service.saveSelector(
                      record["selector_namespace"],
                      record["selector_name"],
                      record["selector_fn"],
                      record["page_size"]
                    );
                  }}
                  color="primary"
                  record={record}
                  afterAction={async (record) => {
                    console.log(record);
                    if (
                      record["gl_selectors_id"] !== null &&
                      record["gl_selectors_id"] !== Number(id)
                    ) {
                      navigate(`/selectors/${record["gl_selectors_id"]}`);
                    } else {
                      navigate(0);
                    }
                  }}
                >
                  Save
                </GlButton>
              </GlContainer>
              <GlContainer>
                <div className="ai-container">
                  <h2>Ask AI</h2>
                  <GlEdit
                    Context={RecordContext}
                    field="prompt"
                    type="textarea"
                  ></GlEdit>
                  <GlButton action={() => askAiFn(record)}>
                    <div className="btn-ask-ai">
                      Ask <img src={aiIcon} alt="AI" />
                    </div>
                  </GlButton>
                </div>
              </GlContainer>
            </div>
            <div className="column" style={{ flexGrow: 1 }}>
              <GlContainer>
                <GlEdit
                  type="sql"
                  field="selector_fn"
                  Context={RecordContext}
                />
              </GlContainer>
              {aiResponse && (
                <GlContainer>
                  <ReactMarkdown>{aiResponse}</ReactMarkdown>
                </GlContainer>
              )}
            </div>
          </div>
        )}
      </GlRecord>
    </div>
  );
}

export default SelectorEdit;
