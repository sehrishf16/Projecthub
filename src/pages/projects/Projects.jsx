import { Box, Typography ,Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import ProjectToolbar from "../../components/projects/ProjectToolbar";
import ProjectTable from "../../components/projects/ProjectTable";
import ProjectDialog from "../../components/projects/ProjectDialog";
import DeleteProjectDialog from "../../components/projects/DeleteProjectDialog";

const initialProjects = [
  {
    id: 1,
    name: "ProjectHub",
    manager: "Rishab",
    status: "Active",
    tasks: 25,
    progress: 70,
    dueDate: "2026-08-10",
  },
  {
    id: 2,
    name: "Portfolio Website",
    manager: "John",
    status: "Completed",
    tasks: 18,
    progress: 100,
    dueDate: "2026-07-20",
  },
];

const Projects = () => {
  const [projects, setProjects] = useState(() => {
  const savedProjects = localStorage.getItem("projects");

  return savedProjects
    ? JSON.parse(savedProjects)
    : initialProjects;
});
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  const [page, setPage] = useState(1);

const rowsPerPage = 5;

  // Dialog State
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  // Delete Dialog State
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  // Add Project
 const addProject = (project) => {
  setProjects((prev) => [
    ...prev,
    {
      ...project,
      id: Date.now(),
      tasks: 0,
      progress: 0,
    },
  ]);

  setPage(1);
};

  // Update Project
  const updateProject = (updatedProject) => {
  setProjects((prev) =>
    prev.map((project) =>
      project.id === updatedProject.id
        ? updatedProject
        : project
    )
  );

  setPage(1);
};
  // Edit
  const editProject = (project) => {
    setEditingProject(project);
    setDialogOpen(true);
  };

  // Delete Button Click
  const deleteProject = (project) => {
    setSelectedProject(project);
    setDeleteOpen(true);
  };

  // Confirm Delete
  const confirmDelete = () => {
  setProjects((prev) =>
    prev.filter(
      (project) => project.id !== selectedProject.id
    )
  );

  setDeleteOpen(false);
  setSelectedProject(null);
  setPage(1);
};
  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(search.toLowerCase()) ||
      project.manager.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = status === "All" || project.status === status;

    return matchesSearch && matchesStatus;
  });
const paginatedProjects = filteredProjects.slice(
  (page - 1) * rowsPerPage,
  page * rowsPerPage
);

useEffect(() => {
  localStorage.setItem(
    "projects",
    JSON.stringify(projects)
  );
}, [projects]);


  return (
    <Box>
      <Typography variant="h4" fontWeight={700} mb={3}>
        Projects
      </Typography>

    <ProjectToolbar
  onAdd={() => {
    setEditingProject(null);
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
/>

      <ProjectTable
  projects={paginatedProjects}
  onEdit={editProject}
  onDelete={deleteProject}
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
    count={Math.ceil(filteredProjects.length / rowsPerPage)}
    onChange={(event, value) => setPage(value)}
    color="primary"
    shape="rounded"
  />
</Box>

      <ProjectDialog
        open={dialogOpen}
        handleClose={() => {
          setDialogOpen(false);
          setEditingProject(null);
        }}
        addProject={addProject}
        updateProject={updateProject}
        editingProject={editingProject}
      />

      <DeleteProjectDialog
        open={deleteOpen}
        handleClose={() => setDeleteOpen(false)}
        handleDelete={confirmDelete}
        projectName={selectedProject?.name}
      />
    </Box>
  );
};

export default Projects;
