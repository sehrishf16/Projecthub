import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const TaskTable = ({ tasks, onEdit, onDelete }) => {
  const priorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "error";
      case "Medium":
        return "warning";
      default:
        return "success";
    }
  };

  const statusColor = (status) => {
    switch (status) {
      case "Done":
        return "success";
      case "In Progress":
        return "warning";
      default:
        return "default";
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Project</TableCell>
            <TableCell>Assignee</TableCell>
            <TableCell>Priority</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Due Date</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell>{task.title}</TableCell>
              <TableCell>{task.project}</TableCell>
              <TableCell>{task.assignee}</TableCell>

              <TableCell>
                <Chip
                  label={task.priority}
                  color={priorityColor(task.priority)}
                  size="small"
                />
              </TableCell>

              <TableCell>
                <Chip
                  label={task.status}
                  color={statusColor(task.status)}
                  size="small"
                />
              </TableCell>

              <TableCell>{task.dueDate}</TableCell>

              <TableCell align="center">
                <IconButton onClick={() => onEdit(task)}>
                  <EditIcon />
                </IconButton>

                <IconButton
                  color="error"
                  onClick={() => onDelete(task)}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TaskTable;