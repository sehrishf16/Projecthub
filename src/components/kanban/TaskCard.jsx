import {
  Avatar,
  Card,
  CardContent,
  Chip,
  Stack,
  Typography,
} from "@mui/material";

import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

const priorityColor = {
  High: "error",
  Medium: "warning",
  Low: "success",
};

const TaskCard = ({ task }) => {
  const { attributes, listeners, setNodeRef, transform } =
    useDraggable({
      id: task.id,
      data: task,
    });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <Card
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      sx={{
        mb: 2,
        borderRadius: 2,
        cursor: "grab",
        transition: ".2s",
        "&:hover": {
          transform: "translateY(-2px)",
        },
      }}
    >
      <CardContent>
        <Typography fontWeight={700}>
          {task.title}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          mt={1}
        >
          {task.description}
        </Typography>

        <Stack
          direction="row"
          justifyContent="space-between"
          mt={2}
        >
          <Chip
            label={task.priority}
            color={priorityColor[task.priority]}
            size="small"
          />

          <Avatar sx={{ width: 32, height: 32 }}>
            {task.assignee.charAt(0)}
          </Avatar>
        </Stack>

        <Typography
          variant="caption"
          mt={2}
          display="block"
        >
          Due: {task.dueDate}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TaskCard;