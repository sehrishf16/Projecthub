  import {
    Card,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip,
    LinearProgress,
    Typography,
  } from "@mui/material";
  import { IconButton, Tooltip } from "@mui/material";

  import EditIcon from "@mui/icons-material/Edit";
  import DeleteIcon from "@mui/icons-material/Delete";

  const getChipColor = (status) => {
    switch (status) {
      case "Active":
        return "primary";
      case "Completed":
        return "success";
      case "Pending":
        return "warning";
      default:
        return "default";
    }
  };
  const ProjectTable = ({ projects, onDelete, onEdit }) => {
    return (
      <TableContainer component={Card}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Project</strong>
              </TableCell>
              <TableCell>
                <strong>Manager</strong>
              </TableCell>
              <TableCell>
                <strong>Status</strong>
              </TableCell>
              <TableCell>
                <strong>Tasks</strong>
              </TableCell>
              <TableCell>
                <strong>Progress</strong>
              </TableCell>
              <TableCell>
                <strong>Due Date</strong>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {projects.length > 0 ? (
              projects.map((project) => (
                <TableRow key={project.id} hover>
                  <TableCell>{project.name}</TableCell>

                  <TableCell>{project.manager}</TableCell>

                  <TableCell>
                    <Chip
                      label={project.status}
                      color={getChipColor(project.status)}
                      size="small"
                    />
                  </TableCell>

                  <TableCell>{project.tasks}</TableCell>

                  
                  <TableCell>{project.dueDate}</TableCell>
                  <TableCell>
                    <strong>Actions</strong>
                  </TableCell>
                  <TableCell>
                    <Tooltip title="Edit">
                      <IconButton color="primary" onClick={() => onEdit(project)}>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Delete">
                      <IconButton
                        color="error"
                        onClick={() => onDelete(project)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No Projects Found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  export default ProjectTable;
