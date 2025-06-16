import React from "react";
import GlEdit from "../../components/GlEdit/GlEdit";
import GlLookup from "../../components/GlLookup/GlLookup";
import GlButton from "../../components/GlButton/GlButton";
import GlContainer from "../../components/GlContainer/GlContainer";
import GlRow from "../../components/GlRow/GlRow";

const GlPipeline = ({ rows, filters, setFilters, loading, canEdit, refresh }) => {
  const handleFilterChange = (field, value) => {
    setFilters({ ...filters, [field]: value });
  };

  return (
    <GlContainer style={{ padding: "1rem" }}>
      {/* Filters section */}
      <div style={{ marginBottom: 20 }}>
        <GlRow>
          <GlEdit
            label="Title"
            value={filters.title || ""}
            onChange={(e) => handleFilterChange("title", e.target.value)}
          />
          <GlEdit
            label="Description"
            value={filters.desc || ""}
            onChange={(e) => handleFilterChange("desc", e.target.value)}
          />
          <GlEdit
            label="Status"
            value={filters.status || ""}
            onChange={(e) => handleFilterChange("status", e.target.value)}
          />
          <GlEdit
            label="Type"
            value={filters.type || ""}
            onChange={(e) => handleFilterChange("type", e.target.value)}
          />
          <GlButton
            color="primary"
            action={() => refresh()}
            style={{ marginLeft: 10 }}
          >
            Refresh
          </GlButton>
        </GlRow>
      </div>

      {/* Loading indicator */}
      {loading && (
        <div style={{ marginBottom: 10, fontStyle: "italic" }}>Loading...</div>
      )}

      {/* Table */}
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#eee" }}>
            <th style={{ border: "1px solid #ccc", padding: 8 }}>Title</th>
            <th style={{ border: "1px solid #ccc", padding: 8 }}>Description</th>
            <th style={{ border: "1px solid #ccc", padding: 8 }}>Status</th>
            <th style={{ border: "1px solid #ccc", padding: 8 }}>Type</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(rows) && rows.length > 0 ? (
            rows.map((row) => (
              <tr key={row.gl_events_id}>
                <td style={{ border: "1px solid #ccc", padding: 8 }}>
                  {/* Editable if canEdit */}
                  {canEdit ? (
                    <GlEdit
                      value={row.title}
                      readOnly={!canEdit}
                    />
                  ) : (
                    row.title
                  )}
                </td>
                <td style={{ border: "1px solid #ccc", padding: 8 }}>
                  {canEdit ? (
                    <GlEdit value={row.desc} readOnly={!canEdit} />
                  ) : (
                    row.desc
                  )}
                </td>
                <td style={{ border: "1px solid #ccc", padding: 8 }}>
                  {canEdit ? (
                    <GlLookup
                      dataSetIdent="glEventsStatusAll"
                      nameSpace="crm"
                      fieldInLookup="statusname"
                      value={row.status}
                      readOnly={!canEdit}
                    >
                      {(item) => <div>{item.statusname}</div>}
                    </GlLookup>
                  ) : (
                    row.statusName
                  )}
                </td>
                <td style={{ border: "1px solid #ccc", padding: 8 }}>
                  {canEdit ? (
                    <GlLookup
                      dataSetIdent="glTypesAll"
                      nameSpace="crm"
                      fieldInLookup="typename"
                      value={row.type}
                      readOnly={!canEdit}
                    >
                      {(item) => <div>{item.typename}</div>}
                    </GlLookup>
                  ) : (
                    row.typeName
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={4}
                style={{
                  textAlign: "center",
                  padding: 16,
                  fontStyle: "italic",
                  color: "#888",
                }}
              >
                {/* Empty row fallback */}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </GlContainer>
  );
};

export default GlPipeline;
