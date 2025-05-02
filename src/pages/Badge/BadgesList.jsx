import React from "react";
import GlContainer from "../../../components/GlContainer/GlContainer";
import GlTable from "../../../components/GlTable/GlTable";
import { useNavigate } from "react-router-dom";

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
        />
      </GlContainer>
    </div>
  );
}

export default BadgesList;
