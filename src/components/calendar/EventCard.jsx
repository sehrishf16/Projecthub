import { Box, Chip, Typography } from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

import { format } from "date-fns";

const EventCard = ({ event }) => {
  return (
    <Box
      sx={{
        width: "100%",
        p: 0.5,
        overflow: "hidden",
      }}
    >
      <Typography
        variant="caption"
        fontWeight={700}
        sx={{
          display: "block",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {event.title}
      </Typography>

      {event.assignee && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            mt: 0.3,
          }}
        >
          <PersonIcon sx={{ fontSize: 12 }} />

          <Typography variant="caption">
            {event.assignee}
          </Typography>
        </Box>
      )}

      {event.location && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
          }}
        >
          <LocationOnIcon sx={{ fontSize: 12 }} />

          <Typography
            variant="caption"
            noWrap
          >
            {event.location}
          </Typography>
        </Box>
      )}

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.5,
        }}
      >
        <AccessTimeIcon sx={{ fontSize: 12 }} />

        <Typography variant="caption">
          {format(event.start, "hh:mm a")}
        </Typography>
      </Box>

      {event.category && (
        <Chip
          label={event.category}
          size="small"
          sx={{
            mt: 0.5,
            height: 18,
            fontSize: 10,
            bgcolor: "rgba(255,255,255,.18)",
            color: "#fff",
          }}
        />
      )}
    </Box>
  );
};

export default EventCard;