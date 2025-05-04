import React from "react";
import { useNavigate, useParams } from "react-router";
//import "./CustomerEdit.css";
import GlRecord from "../../../components/GlRecord/GlRecord";
import GlEdit from "../../../components/GlEdit/GlEdit";
import GlButton from "../../../components/GlButton/GlButton";
import GlContainer from "../../../components/GlContainer/GlContainer";
import GlRow from "../../../components/GlRow/GlRow";

function CustomerEdit() {
  const { gl_events_id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="container">
      <div style={{ display: "flex" }}>
        Event Name:
        <GlRecord
          dataSetIdent="glEventsAll"
          nameSpace="crm"
          where={{ gl_events_id: gl_events_id }}
        >
          {(RecordContext, record) => <div> {record.title} </div>}
        </GlRecord>
      </div>
      <GlRecord
        dataSetIdent="glEventsAll"
        nameSpace="crm"
        where={{ gl_events_id: gl_events_id }}
      >
        {(RecordContext, record) => (
          <GlContainer>
            <GlRow>
              <GlButton
                className="primary"
                dataSetIdent="glEventsSave"
                nameSpace="crm"
                record={record}
                afterAction={async (record) => {
                  if (
                    record["gl_events_id"] !== null &&
                    record["gl_events_id"] !== Number(gl_events_id)
                  ) {
                    navigate(`/customers/${record["gl_events_id"]}`);
                  } else {
                    navigate(0);
                  }
                }}
              >
                Save
              </GlButton>
              <GlButton
                className="danger"
                dataSetIdent="glCustomersDelete"
                nameSpace="crm"
                record={record}
                afterAction={() => {
                  navigate(`/events`);
                }}
              >
                Delete
              </GlButton>
            </GlRow>
            <GlEdit field="title" Context={RecordContext} />

            <GlEdit field="desc" Context={RecordContext} />

            <GlEdit field="date" Context={RecordContext} />

            <GlEdit field="customer" Context={RecordContext} />

            <GlEdit field="type" Context={RecordContext} />

            <GlEdit field="status" Context={RecordContext} />
          </GlContainer>
        )}
      </GlRecord>
    </div>
  );
}

export default CustomerEdit;
