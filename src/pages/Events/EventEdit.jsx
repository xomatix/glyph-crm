import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import "./EventEdit.css";
import GlRecord from "../../../components/GlRecord/GlRecord";
import GlEdit from "../../../components/GlEdit/GlEdit";
import GlButton from "../../../components/GlButton/GlButton";
import GlContainer from "../../../components/GlContainer/GlContainer";
import GlRow from "../../../components/GlRow/GlRow";
import GlLookup from "../../../components/GlLookup/GlLookup";
import service from "../../../glService/glService";

function CustomerEdit() {
  const { gl_events_id } = useParams();
  const navigate = useNavigate();

  const [userRoles, setUserRoles] = useState([]);

  async function loadRoles() {
    let result = await service.select("crm", "glMenuPermissions", {});

    result = result.map((o) => o.name);
    setUserRoles(result);
  }
  useEffect(() => {
    loadRoles();
  }, []);

  return (
    <div className="container">
      <GlRecord
        dataSetIdent="glEventsAll"
        nameSpace="crm"
        where={{ gl_events_id: gl_events_id }}
      >
        {(RecordContext, record) => (
          <GlContainer>
            {gl_events_id != 0 && (
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
                      navigate(`/event/${record["gl_events_id"]}`);
                    } else {
                      navigate(0);
                    }
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
                    navigate(`/events`);
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
                {userRoles.includes("admin") && (
                  <GlButton
                    className="info"
                    record={record}
                    action={() => {
                      navigate(`/logs/gl_events/${gl_events_id}`);
                    }}
                  >
                    Logs
                  </GlButton>
                )}
              </GlRow>
            )}
            {gl_events_id == 0 && (
              <GlRow>
                <GlButton
                  className="primary"
                  dataSetIdent="glEventsSave"
                  nameSpace="crm"
                  record={record}
                  afterAction={() => {
                    navigate(`/events`);
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
            )}

            <GlEdit field="title" label="Title" Context={RecordContext} />

            <GlEdit field="desc" label="Description" Context={RecordContext} />

            <GlEdit
              field="date"
              label="Date"
              type="datetime"
              Context={RecordContext}
            />

            <GlRow>
              <GlLookup
                dataSetIdent="glCustomersAll"
                nameSpace="crm"
                Context={RecordContext}
                field={"customer"}
                fieldInLookup={"ident"}
                label="Customer"
              >
                {(row) => <div>{row.ident}</div>}
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

            {gl_events_id != 0 && (
              <GlEdit
                field="typename"
                label="Type"
                Context={RecordContext}
                readOnly
              />
            )}

            {gl_events_id == 0 && (
              <GlLookup
                dataSetIdent="glTypesAll"
                nameSpace="crm"
                Context={RecordContext}
                field={"type"}
                fieldInLookup={"typename"}
                label="Type"
                where={{ companies_id: 1 }}
              >
                {(row) => <div>{row.typename}</div>}
              </GlLookup>
            )}

            <GlLookup
              dataSetIdent="glEventsStatusAll"
              nameSpace="crm"
              Context={RecordContext}
              field={"status"}
              fieldInLookup={"statusname"}
              label="Status"
              where={{ type: record.type }}
            >
              {(row) => (
                <div style={{ backgroundColor: row.color }}>{row.name}</div>
              )}
            </GlLookup>
          </GlContainer>
        )}
      </GlRecord>
    </div>
  );
}

export default CustomerEdit;
