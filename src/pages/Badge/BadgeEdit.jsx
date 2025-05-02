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
          <GlContainer>
            <h2>Badge {record.name}</h2>
            <GlRow>
              <GlButton
                className="primary"
                dataSetIdent="glBadgesSave"
                nameSpace="crm"
                Context={RecordContext}
                afterAction={() => {
                  navigate(0);
                }}
              >
                Save
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
          </GlContainer>
        )}
      </GlRecord>
    </div>
  );
}

export default SelectorEdit;
