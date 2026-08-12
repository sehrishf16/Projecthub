import {
  Box,
  Button,
  ButtonGroup,
  Typography,
} from "@mui/material";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TodayIcon from "@mui/icons-material/Today";

const CalendarToolbar = ({
  onNavigate,
  onView,
  label,
  view,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
        mb: 3,
        flexWrap: "wrap",
      }}
    >
    

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Button
          variant="outlined"
          startIcon={<TodayIcon />}
          onClick={() => onNavigate("TODAY")}
          sx={{
            height: 48,
            px: 2.5,
            borderRadius: 3,
            color: "primary.main",
            borderColor: "primary.main",
            fontWeight: 700,
            textTransform: "none",
          }}
        >
          Today
        </Button>

        <Button
          variant="outlined"
          onClick={() => onNavigate("PREV")}
          sx={{
            minWidth: 58,
            height: 48,
            borderRadius: 3,
            color: "primary.main",
            borderColor: "primary.main",
          }}
        >
          <ChevronLeftIcon />
        </Button>

        <Button
          variant="outlined"
          onClick={() => onNavigate("NEXT")}
          sx={{
            minWidth: 58,
            height: 48,
            borderRadius: 3,
            color: "primary.main",
            borderColor: "primary.main",
          }}
        >
          <ChevronRightIcon />
        </Button>
      </Box>

      

      <Typography
        variant="h6"
        fontWeight={700}
        sx={{
          color: "text.primary",
          textAlign: "center",
        }}
      >
        {label}
      </Typography>

      

      <ButtonGroup
        variant="outlined"
        sx={{
          "& .MuiButton-root": {
            textTransform: "none",
            fontWeight: 600,
            borderColor: "divider",
          },
        }}
      >
        {[
          ["month", "Month"],
          ["week", "Week"],
          ["day", "Day"],
          ["agenda", "Agenda"],
        ].map(([value, text]) => (
          <Button
            key={value}
            onClick={() => onView(value)}
            sx={{
              bgcolor:
                view === value
                  ? "primary.main"
                  : "transparent",

              color:
                view === value
                  ? "#fff"
                  : "text.secondary",

              "&:hover": {
                bgcolor:
                  view === value
                    ? "primary.dark"
                    : "action.hover",
              },
            }}
          >
            {text}
          </Button>
        ))}
      </ButtonGroup>
    </Box>
  );
};

export default CalendarToolbar;