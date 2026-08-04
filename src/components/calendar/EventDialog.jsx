import { useEffect, useState } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack,
  TextField,
  MenuItem,
  Grid,
} from "@mui/material";

const categories = [
  {
    label: "Meeting",
    color: "#1976d2",
  },
  {
    label: "Development",
    color: "#2e7d32",
  },
  {
    label: "Review",
    color: "#ed6c02",
  },
  {
    label: "Deadline",
    color: "#d32f2f",
  },
  {
    label: "Holiday",
    color: "#7b1fa2",
  },
];

const EventDialog = ({
  open,
  handleClose,
  addEvent,
  deleteEvent,
  editingEvent,
  selectedDate,
}) => {
  const [form, setForm] = useState({
    id: null,
    title: "",
    category: "Meeting",
    assignee: "",
    location: "",
    description: "",
    start: "",
    end: "",
  });

  useEffect(() => {
    if (editingEvent) {
      setForm({
        id: editingEvent.id,
        title: editingEvent.title,
        category:
          editingEvent.category || "Meeting",
        assignee:
          editingEvent.assignee || "",
        location:
          editingEvent.location || "",
        description:
          editingEvent.description || "",
        start: editingEvent.start
          .toISOString()
          .slice(0, 16),
        end: editingEvent.end
          .toISOString()
          .slice(0, 16),
      });

      return;
    }

    if (selectedDate) {
      setForm({
        id: null,
        title: "",
        category: "Meeting",
        assignee: "",
        location: "",
        description: "",
        start: selectedDate,
        end: selectedDate,
      });

      return;
    }

    setForm({
      id: null,
      title: "",
      category: "Meeting",
      assignee: "",
      location: "",
      description: "",
      start: "",
      end: "",
    });
  }, [editingEvent, selectedDate, open]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = () => {
    if (!form.title.trim()) return;

    const selectedCategory =
      categories.find(
        (item) =>
          item.label === form.category
      );

    addEvent({
      id: form.id ?? Date.now(),

      title: form.title,

      category: form.category,

      assignee: form.assignee,

      location: form.location,

      description: form.description,

      color: selectedCategory.color,

      start: new Date(form.start),

      end: new Date(form.end),
    });

    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>
        {editingEvent
          ? "Edit Event"
          : "Create New Event"}
      </DialogTitle>

      <DialogContent dividers>
        <Stack spacing={3}>
          <TextField
            label="Event Title"
            name="title"
            value={form.title}
            onChange={handleChange}
            fullWidth
          />

          <Grid
            container
            spacing={2}
          >
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                select
                fullWidth
                label="Category"
                name="category"
                value={form.category}
                onChange={handleChange}
              >
                {categories.map((item) => (
                  <MenuItem
                    key={item.label}
                    value={item.label}
                  >
                    {item.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Assignee"
                name="assignee"
                value={form.assignee}
                onChange={handleChange}
              />
            </Grid>
          </Grid>

          <TextField
            fullWidth
            label="Location"
            name="location"
            value={form.location}
            onChange={handleChange}
          />

          <TextField
            multiline
            rows={4}
            fullWidth
            label="Description"
            name="description"
            value={form.description}
            onChange={handleChange}
          />

          <Grid
            container
            spacing={2}
          >
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                type="datetime-local"
                fullWidth
                label="Start"
                name="start"
                value={form.start}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                type="datetime-local"
                fullWidth
                label="End"
                name="end"
                value={form.end}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
          </Grid>
        </Stack>
      </DialogContent>

      <DialogActions>
        {editingEvent && (
          <Button
            color="error"
            onClick={() =>
              deleteEvent(
                editingEvent.id
              )
            }
          >
            Delete
          </Button>
        )}

        <Button
          onClick={handleClose}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleSave}
        >
          {editingEvent
            ? "Update Event"
            : "Save Event"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EventDialog;