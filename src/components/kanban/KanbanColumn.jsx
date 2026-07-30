import { Box, Typography } from "@mui/material";
import { useDroppable } from "@dnd-kit/core";

import TaskCard from "./TaskCard";

const KanbanColumn = ({
  title,
  tasks,
}) => {
  const { setNodeRef } = useDroppable({
    id: title,
  });

  return (
    <Box
      ref={setNodeRef}
      sx={{
        bgcolor: "background.paper",
        borderRadius: 3,
        p: 2,
        minHeight: 600,
      }}
    >
      <Typography
        variant="h6"
        fontWeight={700}
        mb={2}
      >
        {title} ({tasks.length})
      </Typography>

      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
        />
      ))}
    </Box>
  );
};

export default KanbanColumn;