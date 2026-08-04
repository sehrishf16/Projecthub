const calendarEvents = [
  {
    id: 1,
    title: "Sprint Planning",
    category: "Meeting",
    assignee: "Sehrish",
    location: "Conference Room A",
    description: "Sprint planning with development team.",
    color: "#1976d2",

    start: new Date(2026, 7, 5, 10, 0),
    end: new Date(2026, 7, 5, 11, 30),
  },

  {
    id: 2,
    title: "UI Development",
    category: "Development",
    assignee: "John",
    location: "Workspace",
    description: "Develop dashboard UI components.",
    color: "#2e7d32",

    start: new Date(2026, 7, 7, 13, 0),
    end: new Date(2026, 7, 7, 17, 0),
  },

  {
    id: 3,
    title: "Client Demo",
    category: "Review",
    assignee: "Alex",
    location: "Google Meet",
    description: "Demo ProjectHub to the client.",
    color: "#ed6c02",

    start: new Date(2026, 7, 10, 15, 0),
    end: new Date(2026, 7, 10, 16, 0),
  },

  {
    id: 4,
    title: "Project Deadline",
    category: "Deadline",
    assignee: "Team",
    location: "Remote",
    description: "Final project submission.",
    color: "#d32f2f",

    start: new Date(2026, 7, 15, 9, 0),
    end: new Date(2026, 7, 15, 18, 0),
  },

  {
    id: 5,
    title: "Independence Day",
    category: "Holiday",
    assignee: "",
    location: "",
    description: "Public Holiday",
    color: "#7b1fa2",

    start: new Date(2026, 7, 15),
    end: new Date(2026, 7, 15),
    allDay: true,
  },
];

export default calendarEvents;
