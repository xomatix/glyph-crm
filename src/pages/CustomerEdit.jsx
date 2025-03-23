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
      Customer Edit {id}
      <GlRecord
        dataSetIdent="glCustomersAll"
        nameSpace="crm"
        where={{ id: id }}
      >
        {(RecordContext) => (
          <div>
            <h2>Customer</h2>
            <GlEdit field="ident" Context={RecordContext} />
            <br />
            <GlEdit field="name" Context={RecordContext} />
            <br />
            <GlButton
              dataSetIdent="glCustomersSave"
              nameSpace="crm"
              Context={RecordContext}
              afterAction={() => {
                navigate(`/customers/${id}`);
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
