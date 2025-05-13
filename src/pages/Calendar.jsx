import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import GlButton from "../../components/GlButton/GlButton";
import service from "../../glService/glService";

const eventTypeColorMap = {
  1: "#FF6347",
  2: "#4682B4",
  3: "#32CD32",
  4: "#FFD700",
  5: "#8A2BE2",
};

function Calendar() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [reminders, setReminders] = useState([]);
  const [noUpcomingEvents, setNoUpcomingEvents] = useState(false);

  async function getData() {
    const data = await service.select("crm", "glEventsAll", {});

    const parsedEvents = data.map((item) => {
      const eventColor = eventTypeColorMap[item.type] || "#999";

      const reminderTime = new Date(item.date);
      reminderTime.setMinutes(reminderTime.getMinutes() - 30);

      if (item.typename?.toLowerCase().includes("meeting")) {
        createFollowUpTask(item);
      }

      setTimeout(() => {
        const reminderText = `"${item.title}" at ${getFormattedDate(item.date)}`;
        const reminderClass = getTimeBasedColor(item.date);

        setReminders((prev) => {
          if (!prev.some((reminder) => reminder.text === reminderText)) {
            return [
              ...prev,
              {
                text: reminderText,
                date: item.date,
                colorClass: reminderClass,
              },
            ];
          }
          return prev;
        });
      }, reminderTime.getTime() - new Date().getTime());

      return {
        id: item.gl_events_id,
        title: item.title,
        start: item.date,
        end: item.date,
        extendedProps: {
          description: item.desc,
          customerIdent: item.ident,
          user: item.gl_username,
          statusName: item.statusname,
          typeName: item.typename,
          eventColor,
        },
        backgroundColor: eventColor,
        borderColor: eventColor,
      };
    });

    setEvents(parsedEvents);
    filterUpcomingReminders(parsedEvents);
  }

  function createFollowUpTask(event) {
    const followUpTask = {
      title: `Follow-up: ${event.title}`,
      desc: `Follow-up task after meeting on ${event.date}\n\nOriginal description:\n${event.desc}`,
      date: new Date(new Date(event.date).getTime() + 86400000),
      status: 1,
      customer: event.customer,
      user: event.gl_username,
      type: event.type,
    };

    service.insert("crm", "gl_events", followUpTask);
  }

  useEffect(() => {
    getData();
  }, []);

  function getFormattedDate(date) {
    const formattedDate = new Date(date).toLocaleString(undefined, {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
    return formattedDate;
  }

  function getTimeBasedColor(eventDate) {
    const now = new Date();
    const eventTime = new Date(eventDate);
    const timeDiff = eventTime - now;

    const tenMinutes = 10 * 60 * 1000;
    const oneHour = 60 * 60 * 1000;
    const threeHours = 3 * 60 * 60 * 1000;

    if (timeDiff <= tenMinutes) {
      return "bg-red-500 text-white";
    } else if (timeDiff <= oneHour) {
      return "bg-yellow-400 text-black";
    } else if (timeDiff <= threeHours) {
      return "bg-green-500 text-white";
    } else {
      return "bg-gray-300 text-black";
    }
  }

  function filterUpcomingReminders(events) {
    const now = new Date();

    // Filter upcoming reminders based on event date
    const upcomingReminders = reminders.filter(
      (reminder) => new Date(reminder.date) > now
    );

    if (upcomingReminders.length === 0) {
      setNoUpcomingEvents(true);
    } else {
      setNoUpcomingEvents(false);
    }

    setReminders(upcomingReminders);
  }

return (
  <div style={{ padding: "16px" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "600", margin: 0 }}>Calendar</h1>
      <GlButton action={getData}>🔄 Refresh</GlButton>
    </div>

    <div style={{ display: "flex", gap: "24px" }}>
      <div style={{ width: "26rem", display: "flex", gap: "16px", flexShrink: 0 }}>
        <div style={{ flex: 1, backgroundColor: "white", border: "1px solid #e5e7eb", borderRadius: "12px", boxShadow: "0 1px 2px rgba(0,0,0,0.1)", padding: "16px" }}>
          <h3 style={{ fontSize: "14px", fontWeight: "600", color: "#1f2937", marginBottom: "12px" }}>Activity Types Legend</h3>
          <div style={{ display: "grid", gap: "12px", fontSize: "14px", color: "#374151" }}>
            {[
              { color: "blue", label: "🗓️ Close Dates", hex: "#2563eb" },
              { color: "orange", label: "⏱️ Follow-ups", hex: "#fb923c" },
              { color: "green", label: "👥 Meetings", hex: "#22c55e" },
              { color: "purple", label: "📞 Calls", hex: "#a78bfa" },
              { color: "indigo", label: "✉️ Emails", hex: "#818cf8" },
              { color: "emerald", label: "✅ Completed", hex: "#10b981" },
              { color: "rose", label: "⏳ Pending", hex: "#f43f5e" },
            ].map((item, idx) => (
              <div key={idx} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ width: "12px", height: "12px", borderRadius: "9999px", backgroundColor: item.hex, display: "inline-block" }} />
                {item.label}
              </div>
            ))}
          </div>
        </div>

        <div style={{ flex: 1, backgroundColor: "white", border: "1px solid #e5e7eb", borderRadius: "12px", boxShadow: "0 1px 2px rgba(0,0,0,0.1)", padding: "16px" }}>
          <h3 style={{ fontSize: "14px", fontWeight: "600", color: "#1f2937", marginBottom: "12px" }}>Reminders</h3>
          {noUpcomingEvents ? (
            <p style={{ padding: "8px", borderRadius: "8px", backgroundColor: "#6b7280", color: "white" }}>No upcoming reminders.</p>
          ) : (
            <ul style={{ fontSize: "14px", color: "#374151", listStyleType: "disc", paddingLeft: "20px", maxHeight: "256px", overflowY: "auto" }}>
              {reminders.map((reminder, idx) => (
                <li key={idx} style={{ padding: "8px", borderRadius: "8px", backgroundColor: reminder.color }}>
                  {reminder.text}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div style={{ flex: 1 }}>
        <div style={{ height: "600px" }}>
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={events}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,dayGridWeek,dayGridDay",
            }}
            eventClick={(info) => {
              setSelectedEvent({
                title: info.event.title,
                ...info.event.extendedProps,
                date: info.event.startStr,
              });
            }}
            height="100%"
          />
        </div>
      </div>
    </div>

    {selectedEvent && (
      <div style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        backdropFilter: "blur(4px)"
      }}>
        <div style={{
          backgroundColor: "white",
          borderRadius: "16px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
          padding: "24px",
          width: "100%",
          maxWidth: "32rem",
          margin: "auto",
          animation: "fade-in-up 0.3s ease-out"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "700", color: "#111827", margin: 0 }}>{selectedEvent.title}</h2>
            <button
              style={{ fontSize: "20px", color: "#6b7280", border: "none", background: "none", cursor: "pointer" }}
              onClick={() => setSelectedEvent(null)}
            >
              ×
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "14px", color: "#374151" }}>
            <div style={{ display: "flex", gap: "8px" }}>
              <span style={{ fontWeight: "600" }}>📅 Date:</span>
              <span>{getFormattedDate(selectedEvent.date)}</span>
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              <span style={{ fontWeight: "600" }}>Status:</span>
              <span>{selectedEvent.statusName}</span>
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              <span style={{ fontWeight: "600" }}>Customer:</span>
              <span>{selectedEvent.customerIdent}</span>
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              <span style={{ fontWeight: "600" }}>User:</span>
              <span>{selectedEvent.user}</span>
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              <span style={{ fontWeight: "600" }}>Type:</span>
              <span>{selectedEvent.typeName}</span>
            </div>
          </div>

          <div style={{ marginTop: "20px" }}>
            <p style={{ fontWeight: "600", marginBottom: "4px" }}>Description:</p>
            <p style={{ whiteSpace: "pre-wrap", fontSize: "14px", color: "#1f2937" }}>
              {selectedEvent.description}
            </p>
          </div>

          <div style={{ marginTop: "24px", textAlign: "right" }}>
            <GlButton
              action={() => setSelectedEvent(null)}
              style={{ backgroundColor: "#2563eb", color: "white", padding: "8px 16px", borderRadius: "8px", border: "none", cursor: "pointer" }}
            >
              Close
            </GlButton>
          </div>
        </div>
      </div>
    )}
  </div>
);
}

export default Calendar;
