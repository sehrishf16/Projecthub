import { Grid } from "@mui/material";
import KanbanColumn from "./KanbanColumn";

const KanbanBoard = ({ tasks }) => {
  const todo = tasks.filter(
    (task) => task.status === "Todo"
  );

  const progress = tasks.filter(
    (task) => task.status === "In Progress"
  );

  const done = tasks.filter(
    (task) => task.status === "Done"
  );

  return (
    <Grid container spacing={3}>

      <Grid size={{ xs: 12, md: 4 }}>
        <KanbanColumn
          title="Todo"
          tasks={todo}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 4 }}>
        <KanbanColumn
          title="In Progress"
          tasks={progress}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 4 }}>
        <KanbanColumn
          title="Done"
          tasks={done}
        />
      </Grid>

    </Grid>
  );
};

export default KanbanBoard;