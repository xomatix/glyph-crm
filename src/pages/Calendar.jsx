
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
        setReminders((prev) => [...prev, `Reminder: "${item.title}" at ${item.date}`]);
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

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Calendar</h1>
        <GlButton action={getData}>🔄 Refresh</GlButton>
      </div>

      {/* Main content area with sidebar and calendar */}
      <div className="flex flex-col">
        <div className="flex gap-6">
          {/* Sidebar with upcoming events */}
          <div className="w-64 bg-white border border-gray-200 rounded-xl shadow-sm p-4 flex-shrink-0">
            <h3 className="text-sm font-semibold text-gray-800 mb-3">Upcoming Events</h3>
            <ul className="space-y-3 text-sm text-gray-700 max-h-96 overflow-y-auto pr-1">
              {events
                .filter(event => new Date(event.start) >= new Date())
                .sort((a, b) => new Date(a.start) - new Date(b.start))
                .slice(0, 5)
                .map(event => (
                  <li key={event.id} className="flex items-start gap-2">
                    <span className="w-3 h-3 mt-1 rounded-full inline-block" style={{ backgroundColor: event.backgroundColor }} />
                    <div>
                      <p className="font-medium">{event.title}</p>
                      <p className="text-xs text-gray-500">{new Date(event.start).toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" })}</p>
                    </div>
                  </li>
              ))}
            </ul>
          </div>

          {/* Calendar area */}
          <div className="flex-1">
            <div style={{ height: "700px" }}>
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
        
        {/* Legend and reminders in a row below calendar */}
        <div className="mt-6 flex">
          {/* Event Types Legend */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 flex-1">
            <h3 className="text-sm font-semibold text-gray-800 mb-3">Activity Types Legend</h3>
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 text-sm text-gray-700">
              <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-blue-600 inline-block" /> 🗓️ Close Dates</div>
              <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-orange-400 inline-block" /> ⏱️ Follow-ups</div>
              <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-green-500 inline-block" /> 👥 Meetings</div>
              <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-purple-400 inline-block" /> 📞 Calls</div>
              <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-indigo-400 inline-block" /> ✉️ Emails</div>
              <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" /> ✅ Completed</div>
              <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-rose-500 inline-block" /> ⏳ Pending</div>
            </div>
          </div>
          
          {/* Reminders panel */}
          <div className="bg-white border border-blue-300 rounded-xl shadow-sm p-4 ml-6 w-80">
            <h3 className="text-sm font-semibold mb-2">Reminders</h3>
            {reminders.length > 0 ? (
              <ul className="text-sm text-gray-700 list-disc list-inside space-y-1 max-h-24 overflow-y-auto">
                {reminders.map((reminder, idx) => (
                  <li key={idx}>{reminder}</li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500 italic">No current reminders</p>
            )}
          </div>
        </div>
      </div>

      {/* Event Details Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full animate-fade-in-up">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">{selectedEvent.title}</h2>
              <button
                className="text-gray-500 hover:text-gray-700 text-xl"
                onClick={() => setSelectedEvent(null)}
              >
                ×
              </button>
            </div>
            <div className="space-y-2 text-sm">
              <p>📅 <strong>Date:</strong> {selectedEvent.date}</p>
              <p><strong>Status:</strong> {selectedEvent.statusName}</p>
              <p><strong>Customer:</strong> {selectedEvent.customerIdent}</p>
              <p><strong>User:</strong> {selectedEvent.user}</p>
              <p><strong>Type:</strong> {selectedEvent.typeName}</p>
            </div>
            <div className="mt-4">
              <p className="font-semibold">Description:</p>
              <p className="whitespace-pre-wrap text-sm text-gray-700">{selectedEvent.description}</p>
            </div>
            <div className="mt-5 text-right">
              <GlButton action={() => setSelectedEvent(null)} className="bg-blue-600 text-white hover:bg-blue-700">
                Close
              </GlButton>
            </div>
          </div>
        </div>
      )}

      {/* Reminders Popup - Removed since we have integrated reminders in the layout */}
      {/* {reminders.length > 0 && (
        <div className="fixed bottom-4 right-4 bg-white border border-blue-300 shadow-lg rounded-lg p-4 max-w-xs z-40">
          <h3 className="text-sm font-semibold mb-2">Reminders</h3>
          <ul className="text-sm text-gray-700 list-disc list-inside space-y-1 max-h-40 overflow-y-auto">
            {reminders.map((reminder, idx) => (
              <li key={idx}>{reminder}</li>
            ))}
          </ul>
        </div>
      )} */}
    </div>
  );
}

export default Calendar;