import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import FolderIcon from "@mui/icons-material/Folder";
import TaskIcon from "@mui/icons-material/Task";
import GroupIcon from "@mui/icons-material/Group";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import ViewKanbanIcon from "@mui/icons-material/ViewKanban";

import { NavLink, useNavigate } from "react-router-dom";

import Logo from "./Logo";

const drawerWidth = 260;

const menuItems = [
  {
    title: "Dashboard",
    icon: <DashboardIcon />,
    path: "/dashboard",
  },
  {
    title: "Projects",
    icon: <FolderIcon />,
    path: "/projects",
  },
  {
    title: "Tasks",
    icon: <TaskIcon />,
    path: "/tasks",
  },
  {
    title: "Kanban",
    icon: <ViewKanbanIcon />,
    path: "/kanban",
  },
  {
    title: "Team",
    icon: <GroupIcon />,
    path: "/team",
  },
  {
    title: "Calendar",
    icon: <CalendarMonthIcon />,
    path: "/calendar",
  },
  {
    title: "Settings",
    icon: <SettingsIcon />,
    path: "/settings",
  },
];

const Sidebar = ({
  mobileOpen,
  handleDrawerToggle,
}) => {
  const navigate = useNavigate();

  /* =====================================================
     LOGOUT
  ====================================================== */

  const handleLogout = () => {
    /*
     * Remove login/session data if you
     * are storing any authentication data.
     */

    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");

    /*
     * Redirect to Welcome screen
     */

    navigate("/", {
      replace: true,
    });
  };

  /* =====================================================
     DRAWER CONTENT
  ====================================================== */

  const drawerContent = (
    <>
      {/* Logo */}

      <Logo />

      {/* Navigation */}

      <List sx={{ mt: 2 }}>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.title}
            component={NavLink}
            to={item.path}
            onClick={() => {
              /*
               * Close mobile drawer after
               * selecting a page.
               */

              if (
                mobileOpen &&
                handleDrawerToggle
              ) {
                handleDrawerToggle();
              }
            }}
            sx={{
              mx: 1.5,
              mb: 1,
              borderRadius: 1,

              color: "#fff",

              "&.active": {
                bgcolor: "primary.main",
                color: "#fff",

                "& .MuiListItemIcon-root": {
                  color: "#fff",
                },
              },

              "&:hover": {
                bgcolor:
                  "rgba(255,138,61,0.12)",
              },
            }}
          >
            <ListItemIcon
              sx={{
                color:
                  "rgba(255,255,255,.8)",
                minWidth: 42,
              }}
            >
              {item.icon}
            </ListItemIcon>

            <ListItemText
              primary={item.title}
            />
          </ListItemButton>
        ))}
      </List>

      {/* Push Logout to bottom */}

      <Box sx={{ flexGrow: 1 }} />

      {/* Logout */}

      <List>
        <ListItemButton
          onClick={handleLogout}
          sx={{
            mx: 1.5,
            mb: 2,
            borderRadius: 1,

            color: "#fff",

            "&:hover": {
              bgcolor:
                "rgba(255,138,61,0.12)",
            },
          }}
        >
          <ListItemIcon
            sx={{
              color:
                "rgba(255,255,255,.8)",
              minWidth: 42,
            }}
          >
            <LogoutIcon />
          </ListItemIcon>

          <ListItemText
            primary="Logout"
          />
        </ListItemButton>
      </List>
    </>
  );

  return (
    <>
      {/* ===================================================
          MOBILE DRAWER
      ==================================================== */}

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: {
            xs: "block",
            md: "none",
          },

          "& .MuiDrawer-paper": {
            width: drawerWidth,
            bgcolor: "#1B1B1D",
            color: "#fff",
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* ===================================================
          DESKTOP DRAWER
      ==================================================== */}

      <Drawer
        variant="permanent"
        sx={{
          display: {
            xs: "none",
            md: "block",
          },

          "& .MuiDrawer-paper": {
            width: drawerWidth,
            bgcolor: "#1B1B1D",
            color: "#fff",
            border: "none",
          },
        }}
        open
      >
        <Toolbar />

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          {drawerContent}
        </Box>
      </Drawer>
    </>
  );
};

export default Sidebar;