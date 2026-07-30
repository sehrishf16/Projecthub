import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";

const TaskDialog = ({
  open,
  handleClose,
  addTask,
  updateTask,
  editingTask,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    project: "",
    assignee: "",
    priority: "Medium",
    status: "Todo",
    dueDate: "",
  });

  useEffect(() => {
    if (editingTask) {
      setFormData(editingTask);
    } else {
      setFormData({
        title: "",
        project: "",
        assignee: "",
        priority: "Medium",
        status: "Todo",
        dueDate: "",
      });
    }
  }, [editingTask]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = () => {
    if (
      !formData.title ||
      !formData.project ||
      !formData.assignee ||
      !formData.dueDate
    ) {
      alert("Please fill all fields.");
      return;
    }

    if (editingTask) {
      updateTask(formData);
    } else {
      addTask(formData);
    }

    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {editingTask ? "Edit Task" : "New Task"}
      </DialogTitle>

      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          mt: 1,
        }}
      >
        <TextField
          label="Task Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          fullWidth
        />

        <TextField
          label="Project"
          name="project"
          value={formData.project}
          onChange={handleChange}
          fullWidth
        />

        <TextField
          label="Assignee"
          name="assignee"
          value={formData.assignee}
          onChange={handleChange}
          fullWidth
        />

        <TextField
          select
          label="Priority"
          name="priority"
          value={formData.priority}
          onChange={handleChange}
        >
          <MenuItem value="High">High</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="Low">Low</MenuItem>
        </TextField>

        <TextField
          select
          label="Status"
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <MenuItem value="Todo">Todo</MenuItem>
          <MenuItem value="In Progress">
            In Progress
          </MenuItem>
          <MenuItem value="Done">Done</MenuItem>
        </TextField>

        <TextField
          type="date"
          label="Due Date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>

        <Button
          variant="contained"
          onClick={handleSave}
        >
          {editingTask ? "Update" : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskDialog;