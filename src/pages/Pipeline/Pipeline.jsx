import React, { useEffect, useState } from "react";
import service, { getMenuPermissions } from "../../../glService/glService";
import GlTable from "../../../components/GlTable/GlTable";
import GlButton from "../../../components/GlButton/GlButton";
import { useNavigate } from "react-router-dom";
import GlSlot from "../../../components/GlSlot/GlSlot";

const Pipeline = () => {
  const [canEdit, setCanEdit] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadPermissions = async () => {
      try {
        const perms = await getMenuPermissions();
        setCanEdit(perms.includes("Sales Manager") || perms.includes("admin"));
      } catch (error) {
        console.error("Permission load error:", error);
        setCanEdit(false);
      }
    };
    loadPermissions();
  }, []);

  // Open detail view on row click
  const openDetail = (row) => {
    navigate(`/pipeline/${row.gl_sales_pipeline_id}`);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Sales Pipeline</h1>

      <GlButton color="primary" action={() => navigate("/pipeline/0")}>
        + New Pipeline
      </GlButton>

      <GlTable
        nameSpace={"crm"}
        dataSetIdent={"GlSalesPipelineAll"}
        where={{}}
        headers={[
          { label: "ID", field: "gl_sales_pipeline_id" },
          { label: "Title", field: "title" },
          { label: "Description", field: "description" },
          { label: "Stage", field: "stage_name" },  
          { label: "Type", field: "type_name" },     
          { label: "", field: "actions" },
        ]}
        onRowClick={openDetail}
      >
        <GlSlot slot={"actions"}>
          {(row) => (
            canEdit ? (
              <GlButton color="primary" action={() => openDetail(row)}>
                Open / Edit
              </GlButton>
            ) : (
              <GlButton color="primary" action={() => openDetail(row)}>
                Open
              </GlButton>
            )
          )}
        </GlSlot>
      </GlTable>

      <GlTable nameSpace={"crm"} dataSetIdent={"gl_sales_pipeline_stage"} />
    </div>
  );
};

export default Pipeline;
