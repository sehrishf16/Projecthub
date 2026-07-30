import { Box, Button, MenuItem, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const TaskToolbar = ({
  onAdd,
  search,
  onSearch,
  status,
  onStatusChange,
  priority,
  onPriorityChange,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 2,
        mb: 3,
        flexWrap: "wrap",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexWrap: "wrap",
          flex: 1,
        }}
      >
        <TextField
          label="Search Tasks"
          size="small"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          sx={{ width: { xs: "100%", sm: 250 } }}
        />

        <TextField
          select
          label="Status"
          size="small"
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
          sx={{ width: 170 }}
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Todo">Todo</MenuItem>
          <MenuItem value="In Progress">In Progress</MenuItem>
          <MenuItem value="Done">Done</MenuItem>
        </TextField>

        <TextField
          select
          label="Priority"
          size="small"
          value={priority}
          onChange={(e) => onPriorityChange(e.target.value)}
          sx={{ width: 170 }}
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="High">High</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="Low">Low</MenuItem>
        </TextField>
      </Box>

      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={onAdd}
      >
        New Task
      </Button>
    </Box>
  );
};

export default TaskToolbar;