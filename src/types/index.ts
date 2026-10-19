export type RsvpStatus = "pending" | "yes" | "maybe" | "no";

export interface Guest {
  id: string;
  name: string;
  email: string;
  status: RsvpStatus;
  invited: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
}

export interface Task {
  id: string;
  text: string;
  assignee: string;
  done: boolean;
}

export interface Comment {
  id: string;
  author: string;
  text: string;
  at: string;
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  guests: Guest[];
  team: TeamMember[];
  tasks: Task[];
  comments: Comment[];
}

export type NewEvent = Pick<
  EventItem,
  "title" | "date" | "location" | "description"
>;
