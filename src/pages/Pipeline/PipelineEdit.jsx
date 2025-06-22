import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import GlTable from "../../../components/GlTable/GlTable";
import GlButton from "../../../components/GlButton/GlButton";
import service from "../../../glService/glService";

const PipelineEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [record, setRecord] = useState(null);

  const loadData = async () => {
    if (id === "0") {
      setRecord({});
    } else {
      const [data] = await service.select("crm", "GlSalesPipelineAll", {
        p_where: { gl_sales_pipeline_id: id },
      });
      setRecord(data);
    }
  };

  const handleSave = async () => {
    try {
      if (id === "0") {
        await service.insert("crm", "gl_sales_pipeline", record);
      } else {
        await service.update("crm", "gl_sales_pipeline", {
          p_id: id,
          ...record,
        });
      }
      navigate("/pipeline");
    } catch (e) {
      console.error("Save failed", e);
    }
  };

  useEffect(() => {
    loadData();
  }, [id]);

  if (!record) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-semibold">
        {id === "0" ? "Create New Pipeline" : `Edit Pipeline #${id}`}
      </h1>

      <GlTable
        editable
        singleRow
        entity={"gl_sales_pipeline"}
        nameSpace={"crm"}
        data={record}
        onChange={(updated) => setRecord(updated)}
        headers={[
          { label: "Title", field: "title" },
          { label: "Description", field: "description" },
          { label: "Stage", field: "stage", relation: "gl_sales_pipeline_stage" },
          { label: "Status", field: "status", relation: "gl_sales_pipeline_status" },
          { label: "Type", field: "type", relation: "gl_sales_pipeline_type" },
        ]}
      />

      <GlButton color="primary" onClick={handleSave}>
        Save
      </GlButton>
    </div>
  );
};

export default PipelineEdit;
