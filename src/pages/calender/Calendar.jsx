import { useState } from "react";

import {
  Box,
  Paper,
  Typography,
  Button,
  Stack,
  Chip,
  Divider,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined";
import { useNotifications } from "../../context/NotificationContext";

import { Calendar, dateFnsLocalizer, Views } from "react-big-calendar";

import "react-big-calendar/lib/css/react-big-calendar.css";

import { format, parse, startOfWeek, getDay, isToday } from "date-fns";

import { enUS } from "date-fns/locale";

import calendarEvents from "../../data/calendarEvents";

import EventDialog from "../../components/calendar/EventDialog";
import CalendarToolbar from "../../components/calendar/CalendarToolbar";
import EventCard from "../../components/calendar/EventCard";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const CalendarPage = () => {
  const [events, setEvents] = useState(calendarEvents);

  const [dialogOpen, setDialogOpen] = useState(false);

  const [selectedDate, setSelectedDate] = useState("");

  const [editingEvent, setEditingEvent] = useState(null);

  const { addNotification } = useNotifications();

  const saveEvent = (event) => {
    if (editingEvent) {
      setEvents((prev) =>
        prev.map((item) => (item.id === event.id ? event : item)),
      );

      setEditingEvent(null);
      return;
    }

    setEvents((prev) => [...prev, event]);

    const eventDate = new Date(event.start);

    const formattedDate = eventDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

    const formattedTime = eventDate.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });

    addNotification({
      title: "New Event Pinned",

      message: `Sehrish pinned "${event.title}" on ${formattedDate} at ${formattedTime}.`,

      type: "event",

      eventId: event.id,
    });

    setEditingEvent(null);
  };

  const deleteEvent = (id) => {
    setEvents((prev) => prev.filter((item) => item.id !== id));

    setEditingEvent(null);
    setDialogOpen(false);
  };

  const openNewEventDialog = () => {
    setEditingEvent(null);
    setSelectedDate("");
    setDialogOpen(true);
  };

  const openDateDialog = (slotInfo) => {
    setEditingEvent(null);

    setSelectedDate(slotInfo.start.toISOString().slice(0, 16));

    setDialogOpen(true);
  };

  const openEventDialog = (event) => {
    setEditingEvent(event);
    setSelectedDate("");
    setDialogOpen(true);
  };

  return (
    <Box
      sx={{
        width: "100%",
        pb: 4,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: {
            xs: "flex-start",
            sm: "center",
          },
          gap: 2,
          mb: 3,
          flexDirection: {
            xs: "column",
            sm: "row",
          },
        }}
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <Box
            sx={{
              width: 54,
              height: 54,
              borderRadius: 2,
              bgcolor: "primary.main",
              color: "primary.contrastText",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 8px 20px rgba(255,138,61,0.25)",
              flexShrink: 0,
            }}
          >
            <CalendarMonthOutlinedIcon
              sx={{
                fontSize: 29,
              }}
            />
          </Box>

          <Box>
            <Typography
              variant="h4"
              fontWeight={700}
              sx={{
                fontSize: {
                  xs: "1.7rem",
                  md: "2rem",
                },
              }}
            >
              Team Calendar
            </Typography>

            <Typography
              color="text.secondary"
              sx={{
                mt: 0.4,
                fontSize: 14,
              }}
            >
              Manage meetings, reviews, deadlines and events
            </Typography>
          </Box>
        </Stack>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={openNewEventDialog}
          sx={{
            borderRadius: 2.5,
            px: 2.5,
            py: 1.2,
            minWidth: 140,
            textTransform: "none",
            fontWeight: 700,
            boxShadow: "0 7px 18px rgba(255,138,61,0.25)",
            "&:hover": {
              boxShadow: "0 9px 22px rgba(255,138,61,0.35)",
            },
          }}
        >
          New Event
        </Button>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          mb: 2.5,
          flexWrap: "wrap",
        }}
      >
        <Chip
          icon={<EventAvailableOutlinedIcon />}
          label={`${events.length} Events`}
          size="small"
          sx={{
            bgcolor: "primary.light",
            color: "text.primary",
            fontWeight: 600,
            "& .MuiChip-icon": {
              color: "primary.main",
            },
          }}
        />

        <Typography variant="body2" color="text.secondary">
          Select a date to create an event
        </Typography>
      </Box>

      <Paper
        elevation={0}
        sx={{
          position: "relative",
          overflow: "hidden",

          borderRadius: 4,

          border: "1px solid",
          borderColor: "divider",

          bgcolor: "background.paper",

          boxShadow: "0 8px 30px rgba(27,27,29,0.06)",

          p: {
            xs: 1.5,
            sm: 2,
            md: 3,
          },

          "& .rbc-calendar": {
            color: "text.primary",
            fontFamily: "Poppins, sans-serif",
          },

          "& .rbc-header": {
            padding: "12px 6px",
            borderBottom: "1px solid",
            borderColor: "divider",
            fontWeight: 700,
            fontSize: "0.8rem",
            color: "text.secondary",
            textTransform: "uppercase",
            letterSpacing: "0.04em",
          },

          "& .rbc-month-view": {
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 3,
            overflow: "hidden",
          },

          "& .rbc-day-bg": {
            backgroundColor: "background.paper",
          },

          "& .rbc-off-range-bg": {
            backgroundColor: "action.hover",
          },

          "& .rbc-off-range": {
            color: "text.disabled",
          },

          "& .rbc-date-cell": {
            padding: "8px 8px 4px",
            fontSize: "0.85rem",
            fontWeight: 600,
          },

          "& .rbc-today": {
            backgroundColor: "rgba(255,138,61,0.08)",
          },

          "& .rbc-now": {
            color: "primary.main",
            fontWeight: 800,
          },

          "& .rbc-month-row": {
            minHeight: {
              xs: 90,
              sm: 105,
              md: 115,
            },
          },

          "& .rbc-event": {
            borderRadius: "8px !important",
            padding: "3px 6px !important",
            marginBottom: "2px",
            fontWeight: 600,
            fontSize: "0.75rem",
          },

          "& .rbc-event-content": {
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          },

          "& .rbc-slot-selection": {
            backgroundColor: "rgba(255,138,61,0.16)",
          },

          "& .rbc-time-view": {
            borderRadius: 3,
            border: "1px solid",
            borderColor: "divider",
            overflow: "hidden",
          },

          "& .rbc-time-header": {
            borderBottom: "1px solid",
            borderColor: "divider",
          },

          "& .rbc-time-content": {
            borderTop: "1px solid",
            borderColor: "divider",
          },

          "& .rbc-timeslot-group": {
            borderBottom: "1px solid",
            borderColor: "divider",
          },

          "& .rbc-time-slot": {
            color: "text.secondary",
          },

          "& .rbc-agenda-view": {
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 3,
            overflow: "hidden",
          },

          "& .rbc-agenda-table": {
            border: "none",
          },

          "& .rbc-agenda-date-cell, & .rbc-agenda-time-cell": {
            padding: "12px",
          },

          "@media (max-width: 600px)": {
            "& .rbc-toolbar": {
              flexDirection: "column",
              gap: "10px",
              alignItems: "stretch",
            },

            "& .rbc-toolbar-label": {
              order: -1,
              textAlign: "center",
            },

            "& .rbc-btn-group": {
              display: "flex",
              justifyContent: "center",
            },

            "& .rbc-btn-group button": {
              padding: "6px 10px",
              fontSize: "0.75rem",
            },
          },
        }}
      >
        <Box
          sx={{
            height: 4,
            bgcolor: "primary.main",
            borderRadius: "4px 4px 0 0",
            mb: 2,
          }}
        />

        <Calendar
          localizer={localizer}
          events={events}
          selectable
          popup
          startAccessor="start"
          endAccessor="end"
          defaultView={Views.MONTH}
          views={[Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA]}
          style={{
            height: "76vh",
            minHeight: 600,
          }}
          components={{
            toolbar: CalendarToolbar,
            event: EventCard,
          }}
          eventPropGetter={(event) => ({
            style: {
              backgroundColor: event.color || "#FF8A3D",

              border: "none",

              borderRadius: 8,

              color: "#FFFFFF",

              padding: "3px 6px",

              boxShadow: "0 3px 8px rgba(27,27,29,0.12)",
            },
          })}
          tooltipAccessor={(event) =>
            `${event.title}
Category: ${event.category}
Assignee: ${event.assignee}
Location: ${event.location}`
          }
          onSelectSlot={openDateDialog}
          onSelectEvent={openEventDialog}
        />
      </Paper>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 2,
        }}
      >
        <Typography variant="caption" color="text.secondary">
          Tip: Click an existing event to edit or delete it.
        </Typography>
      </Box>

      <EventDialog
        open={dialogOpen}
        handleClose={() => {
          setDialogOpen(false);
          setEditingEvent(null);
          setSelectedDate("");
        }}
        addEvent={saveEvent}
        deleteEvent={deleteEvent}
        editingEvent={editingEvent}
        selectedDate={selectedDate}
      />
    </Box>
  );
};

export default CalendarPage;
