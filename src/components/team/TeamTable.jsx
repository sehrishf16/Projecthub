import {
  Avatar,
  Chip,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const TeamTable = ({
  members,
  onEdit,
  onDelete,
}) => {
  return (
    <TableContainer component={Paper}>
      <Table>

        <TableHead>
          <TableRow>
            <TableCell>Member</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="center">
              Actions
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {members.map((member) => (
            <TableRow key={member.id} hover>

              <TableCell>
                <Avatar
                  sx={{
                    mr: 2,
                    display: "inline-flex",
                    width: 36,
                    height: 36,
                    fontSize: 14,
                  }}
                >
                  {member.name.charAt(0)}
                </Avatar>

                {member.name}
              </TableCell>

              <TableCell>
                {member.email}
              </TableCell>

              <TableCell>
                {member.role}
              </TableCell>

              <TableCell>
                <Chip
                  label={member.status}
                  color={
                    member.status === "Active"
                      ? "success"
                      : "default"
                  }
                  size="small"
                />
              </TableCell>

              <TableCell align="center">
                <IconButton
                  onClick={() => onEdit(member)}
                >
                  <EditIcon />
                </IconButton>

                <IconButton
                  color="error"
                  onClick={() => onDelete(member)}
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

export default TeamTable;