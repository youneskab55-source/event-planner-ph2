import { ChangeEvent, FormEvent, useState } from "react";
import { NewEvent } from "../types";

const empty: NewEvent = { title: "", date: "", location: "", description: "" };

function EventForm({ onSubmit }: { onSubmit: (data: NewEvent) => void }) {
  const [form, setForm] = useState<NewEvent>(empty);

  const set =
    (key: keyof NewEvent) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm({ ...form, [key]: e.target.value });

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.date) return;
    onSubmit({ ...form, title: form.title.trim() });
    setForm(empty);
  };

  return (
    <form className="panel form" onSubmit={submit}>
      <label>
        Event name
        <input value={form.title} onChange={set("title")} required />
      </label>
      <label>
        Date and time
        <input
          type="datetime-local"
          value={form.date}
          onChange={set("date")}
          required
        />
      </label>
      <label>
        Location
        <input value={form.location} onChange={set("location")} />
      </label>
      <label>
        Description
        <textarea
          rows={3}
          value={form.description}
          onChange={set("description")}
        />
      </label>
      <div>
        <button className="btn primary" type="submit">
          Create event
        </button>
      </div>
    </form>
  );
}

export default EventForm;
