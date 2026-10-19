import EventForm from "../components/EventForm";
import { useEvents } from "../context/EventsContext";
import { formatDate } from "../utils/format";

function EventsPage() {
  const { events, addEvent, deleteEvent } = useEvents();
  const sorted = [...events].sort((a, b) => a.date.localeCompare(b.date));

  return (
    <>
      <h2>Events</h2>
      <EventForm onSubmit={addEvent} />

      {sorted.length === 0 && (
        <p className="empty">No events yet. Create your first event above.</p>
      )}

      <ul className="list">
        {sorted.map((e) => {
          const attending = e.guests.filter((g) => g.status === "yes").length;
          const done = e.tasks.filter((t) => t.done).length;
          return (
            <li key={e.id} className="event-card">
              <div className="grow">
                <strong>{e.title}</strong>
                <span className="meta">
                  {formatDate(e.date)}
                  {e.location && ` at ${e.location}`}
                </span>
                {e.description && <p>{e.description}</p>}
                <span className="meta">
                  {attending} of {e.guests.length} guests attending, {done} of{" "}
                  {e.tasks.length} tasks done
                </span>
              </div>
              <button
                className="btn danger"
                onClick={() =>
                  window.confirm(`Delete "${e.title}"?`) && deleteEvent(e.id)
                }
              >
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default EventsPage;
