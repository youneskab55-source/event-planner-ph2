import { createContext, ReactNode, useContext } from "react";
import { EventItem, NewEvent } from "../types";
import { uid, useLocalStorage } from "../utils/storage";

interface EventsContextValue {
  events: EventItem[];
  addEvent: (data: NewEvent) => void;
  updateEvent: (id: string, patch: Partial<EventItem>) => void;
  deleteEvent: (id: string) => void;
}

const EventsContext = createContext<EventsContextValue | null>(null);

export function EventsProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useLocalStorage<EventItem[]>(
    "eventhub:events",
    [],
  );

  const addEvent = (data: NewEvent) =>
    setEvents((prev) => [
      { id: uid(), guests: [], team: [], tasks: [], comments: [], ...data },
      ...prev,
    ]);

  const updateEvent = (id: string, patch: Partial<EventItem>) =>
    setEvents((prev) =>
      prev.map((e) => (e.id === id ? { ...e, ...patch } : e)),
    );

  const deleteEvent = (id: string) =>
    setEvents((prev) => prev.filter((e) => e.id !== id));

  return (
    <EventsContext.Provider
      value={{ events, addEvent, updateEvent, deleteEvent }}
    >
      {children}
    </EventsContext.Provider>
  );
}

export function useEvents(): EventsContextValue {
  const ctx = useContext(EventsContext);
  if (!ctx) throw new Error("useEvents must be used inside EventsProvider");
  return ctx;
}
