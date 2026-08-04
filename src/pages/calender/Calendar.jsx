import { useState } from "react";

import {
  Box,
  Paper,
  Typography,
  Button,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

import {
  Calendar,
  dateFnsLocalizer,
  Views,
} from "react-big-calendar";

import "react-big-calendar/lib/css/react-big-calendar.css";

import {
  format,
  parse,
  startOfWeek,
  getDay,
} from "date-fns";

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

  const [dialogOpen, setDialogOpen] =
    useState(false);

  const [selectedDate, setSelectedDate] =
    useState("");

  const [editingEvent, setEditingEvent] =
    useState(null);

  const saveEvent = (event) => {
    if (editingEvent) {
      setEvents((prev) =>
        prev.map((item) =>
          item.id === event.id ? event : item
        )
      );
    } else {
      setEvents((prev) => [...prev, event]);
    }

    setEditingEvent(null);
  };

  

  const deleteEvent = (id) => {
    setEvents((prev) =>
      prev.filter((item) => item.id !== id)
    );

    setEditingEvent(null);

    setDialogOpen(false);
  };

  return (
    <Box>
      

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
  
        }}
      >
        <Box>
          <Typography
            variant="h4"
            fontWeight={700}
          >
            Team Calendar
          </Typography>

          <Typography
            color="text.secondary"
            mt={0.5}
          >
            Manage meetings, reviews,
            deadlines and events
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            setEditingEvent(null);
            setSelectedDate("");
            setDialogOpen(true);
          }}
          sx={{
            borderRadius: 1,
            px: 3,
            py: 1,
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          New Event
        </Button>
      </Box>

     

      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 2,
          border: "1px solid",
          borderColor: "divider",
          boxShadow: 2,
        }}
      >
        <Calendar
          localizer={localizer}
          events={events}
          selectable
          popup
          startAccessor="start"
          endAccessor="end"
          defaultView={Views.MONTH}
          views={[
            Views.MONTH,
            Views.WEEK,
            Views.DAY,
            Views.AGENDA,
          ]}
          style={{
            height: "80vh",
          }}
          components={{
            toolbar: CalendarToolbar,
            event: EventCard,
          }}
          eventPropGetter={(event) => ({
            style: {
              backgroundColor:
                event.color || "#1976d2",
              border: "none",
              borderRadius: 12,
              color: "#fff",
              padding: "2px",
              boxShadow:
                "0 4px 10px rgba(0,0,0,.15)",
            },
          })}
          tooltipAccessor={(event) =>
            `${event.title}
Category: ${event.category}
Assignee: ${event.assignee}
Location: ${event.location}`
          }
          onSelectSlot={(slotInfo) => {
            setEditingEvent(null);

            setSelectedDate(
              slotInfo.start
                .toISOString()
                .slice(0, 16)
            );

            setDialogOpen(true);
          }}
          onSelectEvent={(event) => {
            setEditingEvent(event);

            setDialogOpen(true);
          }}
        />
      </Paper>

    

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