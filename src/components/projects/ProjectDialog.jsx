import { useState } from "react";
import { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Stack,
} from "@mui/material";

const ProjectDialog = ({
  open,
  handleClose,
  addProject,
  editingProject,
  updateProject,
}) => {
  const [form, setForm] = useState({
    id: null,
    name: "",
    manager: "",
    status: "Active",
    dueDate: "",
  });

  useEffect(() => {
    if (editingProject) {
      setForm(editingProject);
    }
  }, [editingProject]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    if (editingProject) {
      updateProject(form);
    } else {
      addProject(form);
    }

    setForm({
      id: null,
      name: "",
      manager: "",
      status: "Active",
      dueDate: "",
    });

    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {editingProject ? "Edit Project" : "Create New Project"}
      </DialogTitle>

      <DialogContent sx={{ mt: 2 }}>
        <Stack spacing={2}>
          <TextField
            label="Project Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Project Manager"
            name="manager"
            value={form.manager}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            select
            label="Status"
            name="status"
            value={form.status}
            onChange={handleChange}
            fullWidth
          >
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
          </TextField>

          <TextField
            type="date"
            label="Due Date"
            name="dueDate"
            value={form.dueDate}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>

        <Button variant="contained" onClick={handleSave}>
          {editingProject ? "Update Project" : "Save Project"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProjectDialog;
