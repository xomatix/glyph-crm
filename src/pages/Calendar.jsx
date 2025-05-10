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

  async function getData() {
    const data = await service.select("crm", "glEventsAll", {});

    const parsedEvents = data.map((item) => {
      const eventColor = eventTypeColorMap[item.type] || "#999";

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
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="p-4 relative">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Calendar</h1>
        <GlButton action={getData}>🔄 Refresh</GlButton>
      </div>

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
        height="auto"
      />

      {/* Pop-Up Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300 ease-out">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 w-full max-w-lg p-6 transform transition-all duration-300 ease-in-out scale-95 opacity-0 animate-scale-in">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-2xl font-bold text-gray-900">{selectedEvent.title}</h2>
              <button
                className="text-gray-500 hover:text-gray-700 text-xl font-semibold"
                onClick={() => setSelectedEvent(null)}
              >
                ×
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-1">📅 <strong>{selectedEvent.date}</strong></p>
            <div className="grid gap-2">
              <p className="text-sm"><strong>Status:</strong> {selectedEvent.statusName}</p>
              <p className="text-sm"><strong>Customer:</strong> {selectedEvent.customerIdent}</p>
              <p className="text-sm"><strong>User:</strong> {selectedEvent.user}</p>
              <p className="text-sm"><strong>Type:</strong> {selectedEvent.typeName}</p>
            </div>
            <div className="mt-4">
              <p className="text-sm font-semibold mb-2">Description:</p>
              <p className="text-sm text-gray-700 whitespace-pre-wrap">{selectedEvent.description}</p>
            </div>
            <div className="mt-5 text-right">
              <GlButton action={() => setSelectedEvent(null)} className="bg-blue-600 text-white hover:bg-blue-700 transition-colors">
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
