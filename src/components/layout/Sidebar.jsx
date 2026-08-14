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
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");

    navigate("/", {
      replace: true,
    });
  };

  /* =====================================================
     MOBILE MENU ITEM CLICK
  ====================================================== */

  const handleMenuClick = () => {
    if (mobileOpen) {
      handleDrawerToggle();
    }
  };

  /* =====================================================
     DRAWER CONTENT
  ====================================================== */

  const drawerContent = (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: "#1B1B1D",
        color: "#fff",
      }}
    >
      {/* LOGO */}

      <Box
        sx={{
          flexShrink: 0,
        }}
      >
        <Logo />
      </Box>

      {/* MENU */}

      <List
        sx={{
          mt: 2,
          px: 0.5,
          flex: 1,
          overflowY: "auto",

          "&::-webkit-scrollbar": {
            width: 4,
          },

          "&::-webkit-scrollbar-thumb": {
            backgroundColor:
              "rgba(255,255,255,0.15)",
            borderRadius: 10,
          },
        }}
      >
        {menuItems.map((item) => (
          <ListItemButton
            key={item.title}
            component={NavLink}
            to={item.path}
            onClick={handleMenuClick}
            sx={{
              mx: 1,
              mb: 1,
              borderRadius: 1.5,

              color: "rgba(255,255,255,0.85)",

              minHeight: 48,

              "& .MuiListItemIcon-root": {
                color:
                  "rgba(255,255,255,0.75)",
              },

              "&:hover": {
                bgcolor:
                  "rgba(255,138,61,0.12)",
                color: "#fff",

                "& .MuiListItemIcon-root": {
                  color: "#fff",
                },
              },

              "&.active": {
                bgcolor: "primary.main",
                color: "#fff",

                "& .MuiListItemIcon-root": {
                  color: "#fff",
                },

                "&:hover": {
                  bgcolor: "primary.dark",
                },
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 42,
              }}
            >
              {item.icon}
            </ListItemIcon>

            <ListItemText
              primary={item.title}
              primaryTypographyProps={{
                fontWeight: 500,
              }}
            />
          </ListItemButton>
        ))}
      </List>

      {/* LOGOUT */}

      <Box
        sx={{
          flexShrink: 0,
          pb: 1,
        }}
      >
        <List>
          <ListItemButton
            onClick={handleLogout}
            sx={{
              mx: 1,
              borderRadius: 1.5,

              minHeight: 48,

              color:
                "rgba(255,255,255,0.85)",

              "& .MuiListItemIcon-root": {
                color:
                  "rgba(255,255,255,0.75)",
              },

              "&:hover": {
                bgcolor:
                  "rgba(255,138,61,0.12)",
                color: "#fff",

                "& .MuiListItemIcon-root": {
                  color: "#fff",
                },
              },
            }}
          >
            <ListItemIcon
              sx={{
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
      </Box>
    </Box>
  );

  return (
    <>
      {/* ===================================================
          MOBILE DRAWER
      ==================================================== */}

      <Drawer
        variant="temporary"
        anchor="left"
        open={Boolean(mobileOpen)}
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
            boxSizing: "border-box",
            bgcolor: "#1B1B1D",
            color: "#fff",
            border: "none",
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
        open
        sx={{
          display: {
            xs: "none",
            md: "block",
          },

          width: drawerWidth,

          flexShrink: 0,

          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            bgcolor: "#1B1B1D",
            color: "#fff",
            border: "none",
          },
        }}
      >
        <Toolbar />

        {drawerContent}
      </Drawer>
    </>
  );
};

export default Sidebar;