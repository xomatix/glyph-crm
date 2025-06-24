import React, { useEffect, useState } from "react";
import service, { getMenuPermissions } from "../../../glService/glService";
import GlTable from "../../../components/GlTable/GlTable";
import GlButton from "../../../components/GlButton/GlButton";
import { useNavigate } from "react-router-dom";
import GlSlot from "../../../components/GlSlot/GlSlot";

const Pipeline = () => {
  const [canEdit, setCanEdit] = useState(false);
  const [pipelines, setPipelines] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const perms = await getMenuPermissions();
        setCanEdit(perms.includes("Sales Manager") || perms.includes("admin"));
      } catch {
        setCanEdit(false);
      }
      await loadPipelines();
    })();
  }, []);

  const loadPipelines = async () => {
    const data = await service.select("crm", "GlSalesPipelineAll", {});
    setPipelines(Array.isArray(data) ? data : []);
  };

  const openDetail = (row) => navigate(`/pipeline/${row.gl_sales_pipeline_id}`);
  const createNewPipeline = () => navigate("/pipeline/0");

  const handleGeneratePipelineCopies = async () => {
  try {
    for (const p of pipelines) {
     await service.select("crm", "GlSalesPipelineSave", {
  gl_sales_pipeline_id: null, // ważne, by wymusić INSERT
  title: `Kopia: ${p.title}`,
  description: p.description,
});

    }
    alert("Kopie pipeline’ów zostały wygenerowane.");
    await loadPipelines();
  } catch (err) {
    console.error("Błąd przy generowaniu kopii pipeline’ów:", err);
    alert("Nie udało się wygenerować kopii pipeline’ów.");
  }
};


  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Sales Pipeline</h1>

      {canEdit && (
        <div className="flex gap-2 mb-4">
          <GlButton color="primary" action={createNewPipeline}>
            + New Pipeline
          </GlButton>
          <GlButton color="secondary" action={handleGeneratePipelineCopies}>
            Generate
          </GlButton>
        </div>
      )}

      <GlTable
        nameSpace="crm"
        dataSetIdent="GlSalesPipelineAll"
        where={{}}
        data={pipelines}
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
        <GlSlot slot="actions">
          {(row) =>
            canEdit ? (
              <GlButton color="primary" action={() => openDetail(row)}>
                Open / Edit
              </GlButton>
            ) : (
              <GlButton color="primary" action={() => openDetail(row)}>
                Open
              </GlButton>
            )
          }
        </GlSlot>
      </GlTable>
    </div>
  );
};

export default Pipeline;
