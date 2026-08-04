import {
  Box,
  Typography,
  Button,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

import TodayIcon from "@mui/icons-material/Today";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const CalendarToolbar = (toolbar) => {
  const goToBack = () => {
    toolbar.onNavigate("PREV");
  };

  const goToNext = () => {
    toolbar.onNavigate("NEXT");
  };

  const goToToday = () => {
    toolbar.onNavigate("TODAY");
  };

  const changeView = (event, view) => {
    if (view) {
      toolbar.onView(view);
    }
  };

  return (
    <Box
      sx={{
        mb: 3,
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 2,
      }}
    >


      <Box>
        <Typography variant="h5" fontWeight={700}>
          {toolbar.label}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
        >
          Manage your meetings and deadlines
        </Typography>
      </Box>

     

      <Box
        sx={{
          display: "flex",
          gap: 1,
          alignItems: "center"
        }}
      >
        <Button
          variant="outlined"
          startIcon={<TodayIcon />}
          onClick={goToToday}
          sx={{
            borderRadius: 3,
            textTransform: "none",
          }}
        >
          Today
        </Button>

        <Button
          variant="outlined"
          onClick={goToBack}
          sx={{
            minWidth: 42,
            borderRadius: 3,
          }}
        >
          <ChevronLeftIcon />
        </Button>

        <Button
          variant="outlined"
          onClick={goToNext}
          sx={{
            minWidth: 42,
            borderRadius: 3,
          }}
        >
          <ChevronRightIcon />
        </Button>
      </Box>



      <ToggleButtonGroup
        exclusive
        value={toolbar.view}
        onChange={changeView}
        size="small"
      >
        
      </ToggleButtonGroup>
    </Box>
  );
};

export default CalendarToolbar;