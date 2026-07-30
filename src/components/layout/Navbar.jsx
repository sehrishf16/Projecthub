import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  InputBase,
  Avatar,
  Badge,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";

const Navbar = ({ handleDrawerToggle }) => {
  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        bgcolor: "background.paper",
        color: "text.primary",
        borderBottom: "1px solid",
        borderColor: "divider",
        width: {
          md: "calc(100% - 260px)",
        },
        ml: {
          md: "260px",
        },
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        {/* Left Section */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <IconButton
            onClick={handleDrawerToggle}
            sx={{
              display: {
                xs: "flex",
                md: "none",
              },
            }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
            }}
          >
            Dashboard
          </Typography>
        </Box>

        {/* Search */}
        <Box
          sx={{
            display: {
              xs: "none",
              sm: "flex",
            },
            alignItems: "center",
            bgcolor: "#F7F7F7",
            px: 2,
            py: 0.8,
            borderRadius: 2,
            width: 320,
          }}
        >
          <SearchIcon
            sx={{
              color: "text.secondary",
            }}
          />

          <InputBase
            placeholder="Search..."
            sx={{
              ml: 1,
              flex: 1,
            }}
          />
        </Box>

        {/* Right Section */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <IconButton>
            <DarkModeOutlinedIcon />
          </IconButton>

          <IconButton>
            <Badge
              badgeContent={3}
              color="error"
            >
              <NotificationsNoneIcon />
            </Badge>
          </IconButton>

          <Avatar
            sx={{
              bgcolor: "primary.main",
              cursor: "pointer",
            }}
          >
            S
          </Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;