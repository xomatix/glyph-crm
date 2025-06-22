import React, { useEffect, useState } from "react";
import GlPipeline from "../../../components/GlPipeline/GlPipeline";
import service, { getMenuPermissions } from "../../../glService/glService";
import GlTable from "../../../components/GlTable/GlTable";
import GlButton from "../../../components/GlButton/GlButton";
import { useNavigate } from "react-router-dom";
import GlSlot from "../../../components/GlSlot/GlSlot";

const Pipeline = () => {
  //const [filters, setFilters] = useState({});
  const [canEdit, setCanEdit] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadPermissions = async () => {
      try {
        const perms = await getMenuPermissions();
        setCanEdit(perms.includes("Sales Manager"));
      } catch (error) {
        console.error("Permission load error:", error);
        setCanEdit(false);
      }
    };
    loadPermissions();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Sales Pipeline</h1>
      {/* <GlPipeline
        // rows={rows}
        // filters={filters}
        // setFilters={setFilters}
        // loading={loading}
        // canEdit={canEdit}
        // refresh={loadData} */}
      {/* /> */}
      <GlTable
        nameSpace={"crm"}
        dataSetIdent={"GlSalesPipelineAll"}
        where={{ }}
         headers={[
           { label: "ID", field: "gl_sales_pipeline_id" },
           { label: "title", field: "title" },
           { label: "description", field: "description" },
           { label: "", field: "actions" },
         ]}
        onRowClick={(row) => {
        }}
      >
        <GlSlot
        slot={"actions"}
        >{(row)=>(
           <GlButton
          color="primary"
          afterAction={() => {
            navigate(`/pipeline/${row.gl_sales_pipeline_id}`);
          }}
        >
          Open
        </GlButton>
        )}
          </GlSlot>
      </GlTable >

      <GlTable
      nameSpace={"crm"}
      dataSetIdent={"gl_sales_pipeline_stage"}
      />
    </div>
  );
};

export default Pipeline;
