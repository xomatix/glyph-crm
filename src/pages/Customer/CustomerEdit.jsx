import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import "./CustomerEdit.css";
import GlRecord from "../../../components/GlRecord/GlRecord";
import GlEdit from "../../../components/GlEdit/GlEdit";
import GlButton from "../../../components/GlButton/GlButton";
import GlContainer from "../../../components/GlContainer/GlContainer";
import GlRow from "../../../components/GlRow/GlRow";
import GlList from "../../../components/GlList/GlList";
import GlLookup from "../../../components/GlLookup/GlLookup";

function CustomerEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [counter, setCounter] = useState(0);

  return (
    <div className="container">
      Customer Edit ID:{id}
      <GlRecord
        dataSetIdent="glCustomersAll"
        nameSpace="crm"
        where={{ id: id }}
      >
        {(RecordContext, record) => (
          <GlContainer>
            <h2>{record.ident}</h2>
            <GlRow>
              <GlButton
                className="primary"
                dataSetIdent="glCustomersSave"
                nameSpace="crm"
                Context={RecordContext}
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
                Context={RecordContext}
                afterAction={() => {
                  navigate(`/customers`);
                }}
              >
                Delete
              </GlButton>
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
                  {JSON.stringify(recordBadge)}
                  <GlRow>
                    <GlLookup
                      Context={RecordBadgeContext}
                      nameSpace="crm"
                      dataSetIdent="glBadgesAll"
                      field="gl_customers_badge_id"
                      fieldInLookup="customers_badge_name"
                      label="New Badge"
                      where={{ gl_customers_id: id }}
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
                      style={{ margin: "auto 0 2px 0", height: "34px" }}
                      action={() => {
                        setCounter(counter + 1);
                      }}
                    >
                      dodaj {counter}
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
                      <div
                        className="badge-item"
                        style={{ backgroundColor: row.color }}
                      >
                        {row.name}
                      </div>
                    )}
                  </GlList>
                </div>
              )}
            </GlRecord>
          </GlContainer>
        )}
      </GlRecord>
    </div>
  );
}

export default CustomerEdit;
