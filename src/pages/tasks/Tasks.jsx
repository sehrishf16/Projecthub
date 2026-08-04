import { Box, Typography, Pagination } from "@mui/material";
import { useEffect, useState } from "react";

import initialTasks from "../../data/tasks";

import TaskToolbar from "../../components/tasks/TaskToolbar";
import TaskTable from "../../components/tasks/TaskTable";
import TaskDialog from "../../components/tasks/TaskDialog";
import DeleteTaskDialog from "../../components/tasks/DeleteTaskDialog";

const Tasks = () => {
  // Load from Local Storage
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : initialTasks;
  });

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [priority, setPriority] = useState("All");

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  // Save to Local Storage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Add Task
  const addTask = (task) => {
    setTasks((prev) => [
      ...prev,
      {
        ...task,
        id: Date.now(),
      },
    ]);

    setPage(1);
  };

  // Update Task
  const updateTask = (updatedTask) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      )
    );

    setPage(1);
  };

  // Edit Task
  const editTask = (task) => {
    setEditingTask(task);
    setDialogOpen(true);
  };

  // Delete Click
  const deleteTask = (task) => {
    setSelectedTask(task);
    setDeleteOpen(true);
  };

  // Confirm Delete
  const confirmDelete = () => {
    setTasks((prev) =>
      prev.filter((task) => task.id !== selectedTask.id)
    );

    setDeleteOpen(false);
    setSelectedTask(null);
    setPage(1);
  };

  // Filter
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.assignee.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      status === "All" || task.status === status;

    const matchesPriority =
      priority === "All" || task.priority === priority;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  const paginatedTasks = filteredTasks.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <Box>
      <Typography variant="h4" fontWeight={700} >
        Tasks
      </Typography>

      <TaskToolbar
        onAdd={() => {
          setEditingTask(null);
          setDialogOpen(true);
        }}
        search={search}
        onSearch={(value) => {
          setSearch(value);
          setPage(1);
        }}
        status={status}
        onStatusChange={(value) => {
          setStatus(value);
          setPage(1);
        }}
        priority={priority}
        onPriorityChange={(value) => {
          setPriority(value);
          setPage(1);
        }}
      />

      <TaskTable
        tasks={paginatedTasks}
        onEdit={editTask}
        onDelete={deleteTask}
      />

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 3,
        }}
      >
        <Pagination
          page={page}
          count={Math.ceil(filteredTasks.length / rowsPerPage)}
          onChange={(event, value) => setPage(value)}
          color="primary"
        />
      </Box>

      <TaskDialog
        open={dialogOpen}
        handleClose={() => {
          setDialogOpen(false);
          setEditingTask(null);
        }}
        addTask={addTask}
        updateTask={updateTask}
        editingTask={editingTask}
      />

      <DeleteTaskDialog
        open={deleteOpen}
        handleClose={() => setDeleteOpen(false)}
        handleDelete={confirmDelete}
        taskTitle={selectedTask?.title}
      />
    </Box>
  );
};

export default Tasks;