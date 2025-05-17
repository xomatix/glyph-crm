import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import "./CustomerEdit.css";
import GlRecord from "../../../components/GlRecord/GlRecord";
import GlEdit from "../../../components/GlEdit/GlEdit";
import GlButton from "../../../components/GlButton/GlButton";
import GlContainer from "../../../components/GlContainer/GlContainer";
import GlRow from "../../../components/GlRow/GlRow";
import GlList from "../../../components/GlList/GlList";
import GlLookup from "../../../components/GlLookup/GlLookup";
import Timeline from "../../../components/Timeline/Timeline";
import service from "../../../glService/glService";

function CustomerEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [counter, setCounter] = useState(0);
  const badgesRef = useRef();

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
    <div className="container" id="customer-edit">
      <GlRecord
        dataSetIdent="glCustomersAll"
        nameSpace="crm"
        where={{ id: id }}
      >
        {(RecordContext, record) => (
          <GlContainer>
            <GlRow
              className="client-edit-row"
              style={{ alignItems: "flex-start" }}
            >
              <div className="field-group" style={{ flex: 3, minWidth: 0 }}>
                <h2>Customer Edit ID:{id}</h2>
                <h2>{record.ident} </h2>
                <GlRow>
                  <GlButton
                    color="primary"
                    dataSetIdent="glCustomersSave"
                    nameSpace="crm"
                    record={record}
                    afterAction={async (record) => {
                      if (
                        record["gl_customers_id"] !== null &&
                        record["gl_customers_id"] !== Number(id)
                      ) {
                        navigate(`/customers/${record["gl_customers_id"]}`);
                      } else {
                        navigate(0);
                      }
                    }}
                  >
                    Save
                  </GlButton>
                  {id > 0 && (
                    <GlButton
                      color="error"
                      dataSetIdent="glCustomersDelete"
                      nameSpace="crm"
                      record={record}
                      afterAction={() => {
                        navigate(`/customers`);
                      }}
                    >
                      Delete
                    </GlButton>
                  )}
                  {userRoles.includes("admin") && (
                    <GlButton
                      color="info"
                      record={record}
                      action={() => {
                        navigate(`/logs/gl_customers/${id}`);
                      }}
                    >
                      Logs
                    </GlButton>
                  )}
                </GlRow>
                <GlEdit
                  field="ident"
                  label="Customer CODE"
                  Context={RecordContext}
                />
                <GlEdit field="name" Context={RecordContext} />
                <GlRow>
                  <GlEdit field="email" Context={RecordContext} />
                  <GlEdit field="phone" Context={RecordContext} />
                </GlRow>
                <GlRow>
                  <GlEdit field="city" Context={RecordContext} />
                  <GlEdit field="address" Context={RecordContext} />
                </GlRow>
                {id > 0 && (
                  <GlRecord
                    dataSetIdent="glCustomersAll"
                    nameSpace="crm"
                    where={{ id: id, counter: counter }}
                  >
                    {(RecordBadgeContext, recordBadge) => (
                      <div>
                        <h2>Badges</h2>
                        <GlRow>
                          <GlLookup
                            Context={RecordBadgeContext}
                            nameSpace="crm"
                            dataSetIdent="glBadgesAll"
                            field="gl_customers_badge_id"
                            fieldInLookup="customers_badge_name"
                            label="New Badge"
                            where={{ gl_customers_id: id, counter: counter }}
                          >
                            {(row) => (
                              <div
                                className="badge-item"
                                style={{ backgroundColor: row.color }}
                              >
                                {row.name}
                              </div>
                            )}
                          </GlLookup>
                          <GlButton
                            nameSpace="crm"
                            size="small"
                            color="primary"
                            dataSetIdent="glCustomersBadgesSave"
                            record={recordBadge}
                            afterAction={() => {
                              if (
                                badgesRef != null &&
                                badgesRef.current != null
                              ) {
                                badgesRef.current.refresh();
                              }
                            }}
                          >
                            Add badge
                          </GlButton>
                        </GlRow>
                        <GlList
                          ref={badgesRef}
                          nameSpace="crm"
                          dataSetIdent="glCustomersBadges"
                          where={{
                            gl_customers_id: record.gl_customers_id,
                            counter: counter,
                          }}
                        >
                          {(row) => (
                            <div className="badge-item">
                              <div
                                className="badge"
                                style={{ backgroundColor: row.color }}
                              >
                                {row.name}
                              </div>
                              <GlButton
                                color="error"
                                size="small"
                                nameSpace="crm"
                                dataSetIdent="glCustomersBadgesDelete"
                                record={row}
                                afterAction={() => {
                                  if (
                                    badgesRef != null &&
                                    badgesRef.current != null
                                  ) {
                                    badgesRef.current.refresh();
                                  }
                                }}
                              >
                                X
                              </GlButton>
                            </div>
                          )}
                        </GlList>
                      </div>
                    )}
                  </GlRecord>
                )}
              </div>
              {/* <div className="timeline" style={{ flex: 1 }}> */}
              <Timeline where={{ customer: id }} />
              {/* </div> */}
            </GlRow>
          </GlContainer>
        )}
      </GlRecord>
    </div>
  );
}

export default CustomerEdit;
