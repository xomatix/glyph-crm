import React from "react";
import GlContainer from "../../../components/GlContainer/GlContainer";
import GlTable from "../../../components/GlTable/GlTable";
import { useNavigate } from "react-router-dom";
import GlSlot from "../../../components/GlSlot/GlSlot";
import GlRow from "../../../components/GlRow/GlRow";

function BadgesList() {
  const navigate = useNavigate();

  return (
    <div>
      <GlContainer>
        <GlTable
          nameSpace="crm"
          dataSetIdent="glBadgesAll"
          onRowClick={(row) => {
            navigate(`/badges/${row.gl_customers_badge_id}`);
          }}
          headers={[
            { field: "gl_customers_badge_id", label: "ID" },
            { field: "color", label: "Color" },
            { field: "customers_badge_name", label: "Badge Name" },
          ]}
          defaultSortConfig={{
            field: "gl_customers_badge_id",
            direction: "desc",
          }}
        >
          <GlSlot slot="color">
            {(row) => (
              <GlRow>
                <div
                  style={{
                    backgroundColor: row.color,
                    width: "fit-content",
                    padding: "8px 10px",
                    borderRadius: "32px",
                  }}
                ></div>
                {row.color}
              </GlRow>
            )}
          </GlSlot>
        </GlTable>
      </GlContainer>
    </div>
  );
}

export default BadgesList;
