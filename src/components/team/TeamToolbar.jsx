import { Box, Button, MenuItem, TextField } from "@mui/material";
import GroupAddIcon from "@mui/icons-material/GroupAdd";

const TeamToolbar = ({
  onAdd,
  search,
  onSearch,
  status,
  onStatusChange,
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
          label="Search Members"
          size="small"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          sx={{
            width: {
              xs: "100%",
              sm: 300,
            },
          }}
        />

        <TextField
          select
          label="Status"
          size="small"
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
          sx={{ width: 180 }}
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Active">Active</MenuItem>
          <MenuItem value="Inactive">Inactive</MenuItem>
        </TextField>
      </Box>

      <Button
        variant="contained"
        startIcon={<GroupAddIcon />}
        onClick={onAdd}
      >
        Add Member
      </Button>
    </Box>
  );
};

export default TeamToolbar;