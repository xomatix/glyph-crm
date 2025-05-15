import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router";
import GlRecord from "../../../components/GlRecord/GlRecord";
import GlContainer from "../../../components/GlContainer/GlContainer";
import GlEdit from "../../../components/GlEdit/GlEdit";
import GlRow from "../../../components/GlRow/GlRow";
import GlButton from "../../../components/GlButton/GlButton";

function SelectorEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div>
      Badge Edit {id}
      <GlRecord
        dataSetIdent="glBadgesAll"
        nameSpace="crm"
        where={{ gl_customers_badge_id: id }}
      >
        {(RecordContext, record) => (
          <GlContainer width="1200px">
            <h2>Badge {record.name}</h2>
            <div className="field-group">
              <GlRow>
                <GlButton
                  color="primary"
                  dataSetIdent="glBadgesSave"
                  nameSpace="crm"
                  record={record}
                  afterAction={async (insertedRecord) => {
                    console.log("insertedRecord", insertedRecord);
                    if (
                      insertedRecord["gl_customers_badge_id"] !== null &&
                      insertedRecord["gl_customers_badge_id"] !== Number(id)
                    ) {
                      navigate(
                        `/badges/${insertedRecord["gl_customers_badge_id"]}`
                      );
                    } else {
                      navigate(0);
                    }
                  }}
                >
                  Save
                </GlButton>
                <GlButton
                  color="error"
                  dataSetIdent="glBadgesDelete"
                  nameSpace="crm"
                  record={record}
                  afterAction={() => {
                    navigate(`/badges`);
                  }}
                >
                  Delete
                </GlButton>
                <GlButton
                  className=""
                  action={() => {
                    navigate(-1);
                  }}
                >
                  Close
                </GlButton>
              </GlRow>
              <GlEdit field="name" Context={RecordContext}></GlEdit>
              <GlRow>
                <GlEdit
                  field="color"
                  type="color"
                  Context={RecordContext}
                ></GlEdit>
              </GlRow>
            </div>
          </GlContainer>
        )}
      </GlRecord>
    </div>
  );
}

export default SelectorEdit;
