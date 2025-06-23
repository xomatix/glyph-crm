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

  const openDetail = (row) => {
    navigate(`/pipeline/${row.gl_sales_pipeline_id}`);
  };

  const createNewPipeline = () => {
    navigate("/pipeline/0");
  };

  const insertRecord = async (nameSpace, tableName, data) => {
  try {
    const response = await fetch("http://localhost:8080", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: "insert",
        data: {
          nameSpace: nameSpace,
          tableName: tableName,
          values: data,
          s_id: localStorage.getItem("s_id"),
        },
      }),
    });

    const text = await response.text(); // <-- zamiast od razu .json
    console.log("Insert response text:", text); // <== LOG CAŁEJ ODPOWIEDZI
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return JSON.parse(text);
  } catch (err) {
    console.error("Insert error:", err);
    throw err;
  }
};


  const handleGenerateEvents = async () => {
    try {
      const pipelines = await service.select("crm", "GlSalesPipelineAll", {});
      const events = pipelines.map((p) => ({
        title: p.title,
        description: p.description,
        gl_company_id: p.gl_company_id,
        gl_customer_id: p.gl_customer_id,
        gl_user_id: p.gl_user_id,
        gl_event_status_id: 1,
        gl_event_type_id: 1,
        date: new Date().toISOString().split("T")[0],
      }));

      for (let event of events) {
        await insertRecord("crm", "gl_events", event);
      }

      alert("Wygenerowano eventy na podstawie pipelinów.");
    } catch (error) {
      console.error("Błąd przy generowaniu eventów:", error);
      alert("Wystąpił błąd przy generowaniu eventów.");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Sales Pipeline</h1>

      <div className="flex gap-2 mb-4">
        {canEdit && (
          <>
            <GlButton color="primary" action={createNewPipeline}>
              + New Pipeline
            </GlButton>

            <GlButton color="secondary" action={handleGenerateEvents}>
              Generuj eventy
            </GlButton>
          </>
        )}
      </div>

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

      <GlTable nameSpace={"crm"} dataSetIdent={"gl_sales_pipeline_stage"} />
    </div>
  );
};

export default Pipeline;
