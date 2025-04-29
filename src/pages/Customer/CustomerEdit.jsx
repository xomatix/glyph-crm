import React from "react";
import { useNavigate, useParams } from "react-router";
import "./CustomerEdit.css";
import GlRecord from "../../../components/GlRecord/GlRecord";
import GlEdit from "../../../components/GlEdit/GlEdit";
import GlButton from "../../../components/GlButton/GlButton";
import GlContainer from "../../../components/GlContainer/GlContainer";
import GlRow from "../../../components/GlRow/GlRow";

function CustomerEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

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

            <GlEdit field="email" Context={RecordContext} />

            <GlEdit field="phone" Context={RecordContext} />

            <GlEdit field="city" Context={RecordContext} />

            <GlEdit field="address" Context={RecordContext} />
          </GlContainer>
        )}
      </GlRecord>
    </div>
  );
}

export default CustomerEdit;
