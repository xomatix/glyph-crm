import React from "react";
import { useNavigate, useParams } from "react-router";
import GlRecord from "../../components/GlRecord/GlRecord";
import GlEdit from "../../components/GlEdit/GlEdit";
import GlButton from "../../components/GlButton/GlButton";
import service from "../../glService/glService";
import "./SelectorsEdit.css";

function SelectorEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div>
      Customer Edit {id}
      <GlRecord
        dataSetIdent="selectorsFnAll"
        nameSpace="core"
        where={{ gl_selectors_id: id }}
      >
        {(RecordContext) => (
          <div>
            <h2>Selector</h2>

            <br />
            <GlEdit field="selector_name" Context={RecordContext} />
            <br />
            <GlEdit field="selector_namespace" Context={RecordContext} />
            <br />
            <GlEdit field="page_size" Context={RecordContext} />
            <br />
            <div className="text-area">
              <GlEdit
                type="textarea"
                field="selector_fn"
                Context={RecordContext}
              />
            </div>
            <br />
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
              Context={RecordContext}
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
            {/* <GlButton
              dataSetIdent="glCustomersDelete"
              nameSpace="crm"
              Context={RecordContext}
              afterAction={() => {
                navigate(`/customers`);
              }}
            >
              Delete
            </GlButton> */}
          </div>
        )}
      </GlRecord>
    </div>
  );
}

export default SelectorEdit;
