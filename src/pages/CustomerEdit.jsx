import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import GlRecord from "../../components/GlRecord/GlRecord";
import service from "../../glService/glService";
import GlEdit from "../../components/GlEdit/GlEdit";
import GlButton from "../../components/GlButton/GlButton";

function CustomerEdit() {
  const { id } = useParams();
  // const [record, setRecord] = useState(null);

  // useEffect(() => {
  //   const download = async () => {
  //     let resp = await service.select("crm", "glCustomersAll", {
  //       where: { id: id },
  //     });
  //     if (resp.length > 0) {
  //       setRecord(resp[0]);
  //     }
  //   };
  //   download();
  // }, []);

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
            <h2>Book</h2>

            <label>
              Ident: <GlEdit field="ident" Context={RecordContext} />
            </label>
            <br />
            <label>
              Name: <GlEdit field="name" Context={RecordContext} />
            </label>
            <br />
            <GlButton
              action={(record) => {
                console.log("Record data:", record);
              }}
              Context={RecordContext}
            >
              Save
            </GlButton>
          </div>
        )}
      </GlRecord>
    </div>
  );
}

export default CustomerEdit;
