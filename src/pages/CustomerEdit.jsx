import React from "react";
import { useNavigate, useParams } from "react-router";
import GlRecord from "../../components/GlRecord/GlRecord";
import GlEdit from "../../components/GlEdit/GlEdit";
import GlButton from "../../components/GlButton/GlButton";

function CustomerEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div>
      Customer Edit ID:{id}
      <GlRecord
        dataSetIdent="glCustomersAll"
        nameSpace="crm"
        where={{ id: id }}
      >
        {(RecordContext, record) => (
          <div>
            <h2>{record.ident}</h2>
            <GlEdit
              field="ident"
              label="Customer CODE"
              Context={RecordContext}
            />
            <br />
            <GlEdit field="name" Context={RecordContext} />
            <br />
            <GlButton
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
              dataSetIdent="glCustomersDelete"
              nameSpace="crm"
              Context={RecordContext}
              afterAction={() => {
                navigate(`/customers`);
              }}
            >
              Delete
            </GlButton>
          </div>
        )}
      </GlRecord>
    </div>
  );
}

export default CustomerEdit;
