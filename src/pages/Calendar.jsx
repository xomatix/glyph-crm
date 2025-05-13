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
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Calendar</h1>
        <GlButton action={getData}>🔄 Refresh</GlButton>
      </div>

      <div className="flex gap-6">
        <div className="w-[26rem] flex gap-4 flex-shrink-0">
          <div className="w-1/2 bg-white border border-gray-200 rounded-xl shadow-sm p-4">
            <h3 className="text-sm font-semibold text-gray-800 mb-3">Activity Types Legend</h3>
            <div className="grid grid-cols-1 gap-3 text-sm text-gray-700">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-blue-600 inline-block" /> 🗓️ Close Dates
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-orange-400 inline-block" /> ⏱️ Follow-ups
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-green-500 inline-block" /> 👥 Meetings
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-purple-400 inline-block" /> 📞 Calls
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-indigo-400 inline-block" /> ✉️ Emails
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" /> ✅ Completed
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" /> ⏳ Pending
              </div>
            </div>
          </div>

          <div className="w-1/2 bg-white border border-gray-200 rounded-xl shadow-sm p-4">
            <h3 className="text-sm font-semibold text-gray-800 mb-3">Reminders</h3>
            {noUpcomingEvents ? (
              <p className="p-2 rounded-lg bg-gray-500 text-white">No upcoming reminders.</p>
            ) : (
              <ul className="text-sm text-gray-700 list-disc list-inside space-y-1 max-h-64 overflow-y-auto">
                {reminders.map((reminder, idx) => (
                  <li key={idx} className={`p-2 rounded-lg ${reminder.colorClass}`}>
                    {reminder.text}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="flex-1">
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
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
    <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-lg mx-auto animate-fade-in-up">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-900">{selectedEvent.title}</h2>
        <button
          className="text-gray-500 hover:text-gray-700 text-xl"
          onClick={() => setSelectedEvent(null)}
        >
          ×
        </button>
      </div>
      <div className="space-y-3 text-sm text-gray-700">
        <div className="flex gap-2">
          <span className="font-semibold">📅 Date:</span>
          <span>{getFormattedDate(selectedEvent.date)}</span>
        </div>
        <div className="flex gap-2">
          <span className="font-semibold">Status:</span>
          <span>{selectedEvent.statusName}</span>
        </div>
        <div className="flex gap-2">
          <span className="font-semibold">Customer:</span>
          <span>{selectedEvent.customerIdent}</span>
        </div>
        <div className="flex gap-2">
          <span className="font-semibold">User:</span>
          <span>{selectedEvent.user}</span>
        </div>
        <div className="flex gap-2">
          <span className="font-semibold">Type:</span>
          <span>{selectedEvent.typeName}</span>
        </div>
      </div>
      <div className="mt-5">
        <p className="font-semibold mb-1">Description:</p>
        <p className="whitespace-pre-wrap text-sm text-gray-800">{selectedEvent.description}</p>
      </div>
      <div className="mt-6 text-right">
        <GlButton
          action={() => setSelectedEvent(null)}
          className="bg-blue-600 text-white hover:bg-blue-700"
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
