import React from "react";
import GlList from "../GlList/GlList";
import { useNavigate } from "react-router-dom";
import "./Timeline.css";
import GlContainer from "../GlContainer/GlContainer";

function Timeline({ where }) {
  const navigate = useNavigate();

  const getTypeIcon = (type) => {
    // return type;
    switch (type) {
      case "meeting":
        return "🤝";
      case "call":
        return "📞";
      case "email":
        return "✉️";
      default:
        return "📌";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="timeline">
      <GlList
        dataSetIdent={"glEventsAll"}
        nameSpace={"crm"}
        where={where}
        onClick={(row) => {
          navigate(`/event/${row["gl_events_id"]}`);
        }}
      >
        {(row) => (
          <div className="timeline-item">
            <div className="timeline-icon">{getTypeIcon(row.type)}</div>
            <GlContainer>
              <div className="timeline-date">{formatDate(row.date)}</div>
              <div className="timeline-title">
                {row.title || "Untitled Event"}
              </div>
              <div className="timeline-type">
                {row.typename}
              </div>
            </GlContainer>
          </div>
        )}
      </GlList>
    </div>
  );
}

export default Timeline;
