import { useNavigate, useParams } from "react-router";
import React, { useState, useRef } from "react";
import "./StatusStyle.css";
import GlRecord from "../../../components/GlRecord/GlRecord";
import GlEdit from "../../../components/GlEdit/GlEdit";
import GlButton from "../../../components/GlButton/GlButton";
import GlContainer from "../../../components/GlContainer/GlContainer";
import GlTable from "../../../components/glTable/glTable";
import GlRow from "../../../components/GlRow/GlRow";
import GlLookup from "../../../components/GlLookup/GlLookup";
import GlSlot from "../../../components/GlSlot/GlSlot";

function CustomerEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="container">
      <GlRecord
        dataSetIdent="glEventsStatusAllDistinct"
        nameSpace="crm"
        where={{ status: id }}
      >
        {(RecordContext, record) => (
          <GlContainer>
            <div style={{ display: "flex", gap: "8px" }}>
              <GlButton
                className="primary"
                dataSetIdent="glEventsSave"
                nameSpace="crm"
                record={record}
                afterAction={() => {
                  navigate(`/types`);
                }}
              >
                Save
              </GlButton>
              <GlButton
                className="danger"
                dataSetIdent="glEventsDelete"
                nameSpace="crm"
                record={record}
                afterAction={() => {
                  navigate(`/types`);
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
            </div>
            <GlEdit
              field="status"
              label="Type ID"
              Context={RecordContext}
              readOnly
            />
            <GlEdit field="statusname" label="Status" Context={RecordContext} />
            <GlEdit
              field="color"
              label="Color"
              Context={RecordContext}
              type="color"
            />
          </GlContainer>
        )}
      </GlRecord>
    </div>
  );
}

export default CustomerEdit;
