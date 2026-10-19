import { FormEvent, useState } from "react";
import AddRow from "../components/AddRow";
import EventSelect from "../components/EventSelect";
import { useEvents } from "../context/EventsContext";
import { formatDate } from "../utils/format";
import { uid } from "../utils/storage";

function CollaboratorsPage() {
  const { events, updateEvent } = useEvents();
  const [selectedId, setSelectedId] = useState("");
  const [taskText, setTaskText] = useState("");
  const [assignee, setAssignee] = useState("");
  const event = events.find((e) => e.id === selectedId) ?? events[0];

  const addTask = (e: FormEvent) => {
    e.preventDefault();
    if (!event || !taskText.trim()) return;
    updateEvent(event.id, {
      tasks: [
        ...event.tasks,
        { id: uid(), text: taskText.trim(), assignee, done: false },
      ],
    });
    setTaskText("");
  };

  return (
    <>
      <h2>Collaborators</h2>
      <EventSelect
        events={events}
        value={event?.id ?? ""}
        onChange={setSelectedId}
      />

      {event && (
        <>
          <section>
            <h3>Team</h3>
            <AddRow
              button="Add member"
              fields={[
                { name: "name", label: "Name", required: true },
                { name: "role", label: "Role (e.g. Caterer)" },
              ]}
              onAdd={(v) =>
                updateEvent(event.id, {
                  team: [
                    ...event.team,
                    { id: uid(), name: v.name, role: v.role },
                  ],
                })
              }
            />
            {event.team.length === 0 && (
              <p className="empty">Add the people helping you plan.</p>
            )}
            <ul className="list">
              {event.team.map((m) => (
                <li key={m.id} className="item">
                  <div className="grow">
                    <strong>{m.name}</strong>
                    <span className="meta">{m.role}</span>
                  </div>
                  <button
                    className="x"
                    aria-label={`Remove ${m.name}`}
                    onClick={() =>
                      updateEvent(event.id, {
                        team: event.team.filter((x) => x.id !== m.id),
                      })
                    }
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h3>Tasks</h3>
            <form className="row add" onSubmit={addTask}>
              <input
                placeholder="New task"
                aria-label="New task"
                value={taskText}
                onChange={(e) => setTaskText(e.target.value)}
              />
              <select
                aria-label="Assign to"
                value={assignee}
                onChange={(e) => setAssignee(e.target.value)}
              >
                <option value="">Unassigned</option>
                {event.team.map((m) => (
                  <option key={m.id} value={m.name}>
                    {m.name}
                  </option>
                ))}
              </select>
              <button className="btn primary" type="submit">
                Add task
              </button>
            </form>
            {event.tasks.length === 0 && (
              <p className="empty">
                No tasks yet. Split the plan into tasks people can own.
              </p>
            )}
            <ul className="list">
              {event.tasks.map((t) => (
                <li key={t.id} className="item">
                  <label className="grow check">
                    <input
                      type="checkbox"
                      checked={t.done}
                      onChange={() =>
                        updateEvent(event.id, {
                          tasks: event.tasks.map((x) =>
                            x.id === t.id ? { ...x, done: !x.done } : x,
                          ),
                        })
                      }
                    />
                    <span className={t.done ? "done" : ""}>{t.text}</span>
                  </label>
                  {t.assignee && <span className="meta">{t.assignee}</span>}
                  <button
                    className="x"
                    aria-label="Remove task"
                    onClick={() =>
                      updateEvent(event.id, {
                        tasks: event.tasks.filter((x) => x.id !== t.id),
                      })
                    }
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h3>Discussion</h3>
            <AddRow
              button="Post"
              fields={[
                { name: "author", label: "Your name", required: true },
                { name: "text", label: "Write a message", required: true },
              ]}
              onAdd={(v) =>
                updateEvent(event.id, {
                  comments: [
                    ...event.comments,
                    {
                      id: uid(),
                      author: v.author,
                      text: v.text,
                      at: new Date().toISOString(),
                    },
                  ],
                })
              }
            />
            {event.comments.length === 0 && (
              <p className="empty">Start the conversation with your team.</p>
            )}
            <ul className="list">
              {event.comments.map((c) => (
                <li key={c.id} className="item">
                  <div className="grow">
                    <strong>{c.author}</strong>{" "}
                    <span className="meta inline">{formatDate(c.at)}</span>
                    <p>{c.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </>
      )}
    </>
  );
}

export default CollaboratorsPage;
