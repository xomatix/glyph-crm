import React, { useEffect, useState } from "react";
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
        dataSetIdent="glCustomersAll"
        nameSpace="crm"
        where={{ id: id }}
      >
        {(RecordContext, record) => (
          <GlContainer>
            <GlRow className="client-edit-row">
              <div>
                <h2>Customer Edit ID:{id}</h2>
                <h2>{record.ident} </h2>

                <GlRow>
                  <GlButton
                    className="primary"
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
                  <GlButton
                    className="danger"
                    dataSetIdent="glCustomersDelete"
                    nameSpace="crm"
                    record={record}
                    afterAction={() => {
                      navigate(`/customers`);
                    }}
                  >
                    Delete
                  </GlButton>
                  {userRoles.includes("admin") && (
                    <GlButton
                      className="info"
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
                <GlRecord
                  dataSetIdent="glCustomersAll"
                  nameSpace="crm"
                  where={{ id: id, counter: counter }}
                >
                  {(RecordBadgeContext, recordBadge) => (
                    <div>
                      <h2>Badges</h2>
                      {/* {JSON.stringify(recordBadge)} */}
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
                          dataSetIdent="glCustomersBadgesSave"
                          style={{
                            margin: "auto 0 0 0",
                            height: "34px",
                            textWrap: "nowrap",
                          }}
                          record={recordBadge}
                          afterAction={() => {
                            setCounter(counter + 1);
                          }}
                        >
                          Add badge to customer
                        </GlButton>
                      </GlRow>

                      <GlList
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
                              className="danger"
                              nameSpace="crm"
                              dataSetIdent="glCustomersBadgesDelete"
                              record={row}
                              afterAction={() => {
                                setCounter(counter + 1);
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
              </div>
              <Timeline where={{ customer: id }}></Timeline>
            </GlRow>
          </GlContainer>
        )}
      </GlRecord>
    </div>
  );
}

export default CustomerEdit;
