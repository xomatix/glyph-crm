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
        setCanEdit(Array.isArray(perms) && perms.includes("SalesPipeline:Edit"));
      } catch (e) {
        console.error("Error loading permissions", e);
      }
    };
    loadPermissions();
  }, []);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const data = await service.select("crm", "glSalesPipelineAll", {
          p_where: JSON.stringify(filters),
        });
        console.log("Sales pipeline data:", data);
        setRows(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error("Error loading sales pipeline data", e);
        setRows([]);
      }
      setLoading(false);
    };
    loadData();
  }, [filters]);

  return (
    <div style={{ padding: 20 }}>
      <h1 style={{ fontSize: 24, marginBottom: 16 }}>Sales Pipeline</h1>
      <GlPipeline
        rows={rows}
        filters={filters}
        setFilters={setFilters}
        loading={loading}
        canEdit={canEdit}
        refresh={() => setFilters({ ...filters })}
      />
    </div>
  );
};

export default Pipeline;
