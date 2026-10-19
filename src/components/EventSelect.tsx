import { Link } from "react-router-dom";
import { EventItem } from "../types";

interface Props {
  events: EventItem[];
  value: string;
  onChange: (id: string) => void;
}

function EventSelect({ events, value, onChange }: Props) {
  if (events.length === 0) {
    return (
      <p className="empty">
        No events yet. <Link to="/">Create an event</Link> first.
      </p>
    );
  }
  return (
    <label className="select-event">
      Event
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        {events.map((e) => (
          <option key={e.id} value={e.id}>
            {e.title}
          </option>
        ))}
      </select>
    </label>
  );
}

export default EventSelect;
