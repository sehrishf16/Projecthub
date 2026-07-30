import { Typography } from "@mui/material";
import { useState } from "react";

import { DndContext } from "@dnd-kit/core";

import KanbanBoard from "../../components/kanban/KanbanBoard";
import initialKanbanTasks from "../../data/kanbanTasks";

const Kanban = () => {
  const [tasks, setTasks] =
    useState(initialKanbanTasks);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;

    setTasks((prev) =>
      prev.map((task) =>
        task.id === active.id
          ? {
              ...task,
              status: over.id,
            }
          : task
      )
    );
  };

  return (
    <>
      <Typography
        variant="h4"
        fontWeight={700}
        mb={3}
      >
        Kanban Board
      </Typography>

      <DndContext onDragEnd={handleDragEnd}>
        <KanbanBoard tasks={tasks} />
      </DndContext>
    </>
  );
};

export default Kanban;