import React from "react";
import { useNavigate, useParams } from "react-router";
//import "./CustomerEdit.css";
import GlRecord from "../../../components/GlRecord/GlRecord";
import GlEdit from "../../../components/GlEdit/GlEdit";
import GlButton from "../../../components/GlButton/GlButton";
import GlContainer from "../../../components/GlContainer/GlContainer";
import GlRow from "../../../components/GlRow/GlRow";
import GlLookup from "../../../components/GlLookup/GlLookup";

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
              <GlButton
                className="info"
                record={record}
                action={() => {
                  navigate(`/logs/gl_events/${gl_events_id}`);
                }}
              >
                Logs
              </GlButton>
            </GlRow>
            <GlEdit field="title" Context={RecordContext} />

            <GlEdit field="desc" Context={RecordContext} />

            <GlEdit field="date" type="datetime" Context={RecordContext} />

            <GlRow>
              <GlLookup
                dataSetIdent="glCustomersAll"
                nameSpace="crm"
                Context={RecordContext}
                field={"customer"}
                fieldInLookup={"ident"}
              >
                {(row) => <div>{JSON.stringify(row)}</div>}
              </GlLookup>
              <GlButton
                className="primary"
                style={{ height: "34px", marginTop: "auto" }}
                action={() => {
                  navigate(`/customers/${record.customer}`);
                }}
              >
                <svg
                  className="nav-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </GlButton>
            </GlRow>
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
