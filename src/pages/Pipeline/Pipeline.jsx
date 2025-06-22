
import React, { useEffect, useState } from "react";
import GlPipeline from "../../../components/GlPipeline/GlPipeline";
import service from "../../../glService/glService";

const Pipeline = () => {
  const [rows, setRows] = useState([]);
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(true);
  const [canEdit, setCanEdit] = useState(false);

  useEffect(() => {
    const loadPermissions = async () => {
      try {
        const perms = await service.select("crm", "glMenuPermissions", {});
        setCanEdit(perms.includes("SalesPipeline:Edit"));
      } catch (error) {
        console.error("Permission load error:", error);
        setCanEdit(false);
      }
    };
    loadPermissions();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await service.select("crm", "glSalesPipelineAll", {
        p_where: filters,
      });
      setRows(data);
    } catch (error) {
      console.error("Pipeline load failed:", error);
      setRows([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, [filters]);

  useEffect(() => {
    const handlePipelineAutoEvents = async () => {
      try {
        for (const row of rows) {
          if (row.status_name === "Closed Won" || row.status_name === "Closed Lost") {
            await service.select("crm", "glEventAutoGenerateFromPipeline", {
              gl_sales_pipeline_id: row.gl_sales_pipeline_id,
            });
          }
        }
      } catch (error) {
        console.error("Auto event generation failed:", error);
      }
    };

    if (rows.length > 0) {
      handlePipelineAutoEvents();
    }
  }, [rows]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Sales Pipeline</h1>
      <GlPipeline
        rows={rows}
        filters={filters}
        setFilters={setFilters}
        loading={loading}
        canEdit={canEdit}
        refresh={loadData}
      />
    </div>
  );
};

export default Pipeline;
