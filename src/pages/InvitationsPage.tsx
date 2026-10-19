import { useState } from "react";
import AddRow from "../components/AddRow";
import EventSelect from "../components/EventSelect";
import { useEvents } from "../context/EventsContext";
import { Guest, RsvpStatus } from "../types";
import { formatDate } from "../utils/format";
import { uid } from "../utils/storage";

const STATUS_LABELS: Record<RsvpStatus, string> = {
  pending: "No reply",
  yes: "Attending",
  maybe: "Maybe",
  no: "Declined",
};

function InvitationsPage() {
  const { events, updateEvent } = useEvents();
  const [selectedId, setSelectedId] = useState("");
  const event = events.find((e) => e.id === selectedId) ?? events[0];

  const setGuests = (guests: Guest[]) =>
    event && updateEvent(event.id, { guests });
  const patchGuest = (id: string, patch: Partial<Guest>) =>
    event &&
    setGuests(event.guests.map((g) => (g.id === id ? { ...g, ...patch } : g)));

  const inviteLink = (g: Guest) => {
    const place = event.location ? ` at ${event.location}` : "";
    const body = `Hi ${g.name},\n\nYou're invited to ${event.title} on ${formatDate(event.date)}${place}.\n\nPlease reply with yes, maybe or no.`;
    return `mailto:${g.email}?subject=${encodeURIComponent(`You're invited: ${event.title}`)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <>
      <h2>Invitations</h2>
      <EventSelect
        events={events}
        value={event?.id ?? ""}
        onChange={setSelectedId}
      />

      {event && (
        <>
          <div className="tally">
            {(Object.keys(STATUS_LABELS) as RsvpStatus[]).map((s) => (
              <span key={s}>
                <b>{event.guests.filter((g) => g.status === s).length}</b>{" "}
                {STATUS_LABELS[s].toLowerCase()}
              </span>
            ))}
          </div>

          <AddRow
            button="Add guest"
            fields={[
              { name: "name", label: "Name", required: true },
              { name: "email", label: "Email", type: "email", required: true },
            ]}
            onAdd={(v) =>
              setGuests([
                ...event.guests,
                {
                  id: uid(),
                  name: v.name,
                  email: v.email,
                  status: "pending",
                  invited: false,
                },
              ])
            }
          />

          {event.guests.length === 0 && (
            <p className="empty">Add guests, then send each an invitation.</p>
          )}

          <ul className="list">
            {event.guests.map((g) => (
              <li key={g.id} className="item">
                <div className="grow">
                  <strong>{g.name}</strong>
                  <span className="meta">{g.email}</span>
                </div>
                <a
                  className="btn"
                  href={inviteLink(g)}
                  onClick={() => patchGuest(g.id, { invited: true })}
                >
                  {g.invited ? "Resend invite" : "Send invite"}
                </a>
                <select
                  aria-label={`RSVP for ${g.name}`}
                  className={`rsvp ${g.status}`}
                  value={g.status}
                  onChange={(e) =>
                    patchGuest(g.id, { status: e.target.value as RsvpStatus })
                  }
                >
                  {(Object.keys(STATUS_LABELS) as RsvpStatus[]).map((s) => (
                    <option key={s} value={s}>
                      {STATUS_LABELS[s]}
                    </option>
                  ))}
                </select>
                <button
                  className="x"
                  aria-label={`Remove ${g.name}`}
                  onClick={() =>
                    setGuests(event.guests.filter((x) => x.id !== g.id))
                  }
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}

export default InvitationsPage;
