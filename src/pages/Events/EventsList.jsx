import React from "react";
import GlTable from "../../../components/glTable/glTable";
import { useNavigate } from "react-router";

function SelectorsList() {
    const navigate = useNavigate();
    return (
        <div className="selectors-list">
            Events
            <GlTable
                nameSpace={"crm"}
                dataSetIdent={"glEventsAll"}
                onRowClick={(row) => {
                    navigate(`/event/${row.gl_events_id}`);
                }}
            />
        </div>
    );
}

export default SelectorsList;
