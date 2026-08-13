import { useEffect, useRef, useState } from "react";

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  InputBase,
  Avatar,
  Badge,
  Paper,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ClickAwayListener,
  Divider,
  Button,
  Stack,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";

import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import TaskOutlinedIcon from "@mui/icons-material/TaskOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import ViewKanbanOutlinedIcon from "@mui/icons-material/ViewKanbanOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";

import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import DoneAllIcon from "@mui/icons-material/DoneAll";

import { useNavigate } from "react-router-dom";

import { useThemeSettings } from "../../theme/ThemeProvider";
import { useNotifications } from "../../context/NotificationContext";

const Navbar = ({ handleDrawerToggle }) => {
  const navigate = useNavigate();

  const { mode, toggleMode } = useThemeSettings();

  const { notifications, unreadCount, markAsRead, markAllAsRead } =
    useNotifications();

  const [search, setSearch] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);

  const [notificationOpen, setNotificationOpen] = useState(false);

  const searchRef = useRef(null);

  const searchItems = [
    {
      title: "Dashboard",
      description: "Workspace overview",
      path: "/dashboard",
      icon: <DashboardOutlinedIcon />,
    },
    {
      title: "Projects",
      description: "Manage your projects",
      path: "/projects",
      icon: <FolderOutlinedIcon />,
    },
    {
      title: "Tasks",
      description: "Manage and track tasks",
      path: "/tasks",
      icon: <TaskOutlinedIcon />,
    },
    {
      title: "Team",
      description: "Manage team members",
      path: "/team",
      icon: <GroupsOutlinedIcon />,
    },
    {
      title: "Kanban",
      description: "Manage your Kanban board",
      path: "/kanban",
      icon: <ViewKanbanOutlinedIcon />,
    },
    {
      title: "Calendar",
      description: "View events and deadlines",
      path: "/calendar",
      icon: <CalendarMonthOutlinedIcon />,
    },
    {
      title: "Settings",
      description: "Manage your preferences",
      path: "/settings",
      icon: <SettingsOutlinedIcon />,
    },
  ];

  const filteredResults =
    search.trim().length === 0
      ? []
      : searchItems.filter((item) =>
          `${item.title} ${item.description}`
            .toLowerCase()
            .includes(search.toLowerCase()),
        );

  const handleSearchChange = (event) => {
    const value = event.target.value;

    setSearch(value);

    setSearchOpen(value.trim().length > 0);
  };

  const handleResultClick = (path) => {
    navigate(path);

    setSearch("");
    setSearchOpen(false);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();

        searchRef.current?.focus();

        setSearchOpen(true);
      }

      if (event.key === "Escape") {
        setSearchOpen(false);
        setNotificationOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleNotificationToggle = () => {
    setNotificationOpen((prev) => !prev);

    setSearchOpen(false);
  };

  const handleNotificationClick = (notification) => {
    markAsRead(notification.id);

    setNotificationOpen(false);
  };

  return (
    <>
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

          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
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

                color: "text.primary",
              }}
            >
              <MenuIcon />
            </IconButton>

            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,

                display: {
                  xs: "none",
                  sm: "block",
                },
              }}
            >
              Dashboard
            </Typography>
          </Box>

          <Box
            sx={{
              position: "relative",

              display: {
                xs: "none",
                sm: "block",
              },

              flex: {
                sm: 1,
                md: "unset",
              },

              mx: {
                sm: 2,
                md: 4,
              },

              maxWidth: {
                sm: 350,
                md: 420,
              },

              width: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",

                bgcolor: mode === "dark" ? "rgba(255,255,255,0.06)" : "#F7F7F7",

                px: 2,
                py: 0.8,

                borderRadius: 2,

                border: "1px solid",

                borderColor: searchOpen ? "primary.main" : "divider",

                transition: "0.2s",

                "&:focus-within": {
                  borderColor: "primary.main",

                  boxShadow: "0 0 0 3px rgba(255,138,61,0.12)",
                },
              }}
            >
              <SearchIcon
                sx={{
                  color: "text.secondary",
                }}
              />

              <InputBase
                inputRef={searchRef}
                placeholder="Search ProjectHub..."
                value={search}
                onChange={handleSearchChange}
                onFocus={() => {
                  if (search.trim()) {
                    setSearchOpen(true);
                  }
                }}
                sx={{
                  ml: 1,
                  flex: 1,
                  color: "text.primary",

                  "& input::placeholder": {
                    color: "text.secondary",
                    opacity: 1,
                  },
                }}
              />
            </Box>

            {searchOpen && (
              <ClickAwayListener onClickAway={() => setSearchOpen(false)}>
                <Paper
                  elevation={8}
                  sx={{
                    position: "absolute",

                    top: "calc(100% + 8px)",

                    left: 0,
                    right: 0,

                    borderRadius: 3,

                    overflow: "hidden",

                    border: "1px solid",
                    borderColor: "divider",

                    bgcolor: "background.paper",

                    zIndex: 2000,
                  }}
                >
                  {filteredResults.length > 0 ? (
                    <>
                      <Box
                        sx={{
                          px: 2,
                          py: 1.5,

                          borderBottom: "1px solid",

                          borderColor: "divider",
                        }}
                      >
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          fontWeight={700}
                        >
                          NAVIGATION
                        </Typography>
                      </Box>

                      <List disablePadding>
                        {filteredResults.map((item) => (
                          <ListItemButton
                            key={item.path}
                            onClick={() => handleResultClick(item.path)}
                            sx={{
                              px: 2,
                              py: 1.2,

                              "&:hover": {
                                bgcolor: "action.hover",
                              },
                            }}
                          >
                            <ListItemIcon
                              sx={{
                                minWidth: 42,
                                color: "primary.main",
                              }}
                            >
                              {item.icon}
                            </ListItemIcon>

                            <ListItemText
                              primary={item.title}
                              secondary={item.description}
                              primaryTypographyProps={{
                                fontWeight: 600,
                              }}
                            />
                          </ListItemButton>
                        ))}
                      </List>
                    </>
                  ) : (
                    <Box
                      sx={{
                        py: 4,
                        px: 2,
                        textAlign: "center",
                      }}
                    >
                      <SearchIcon
                        sx={{
                          fontSize: 36,
                          color: "text.disabled",
                          mb: 1,
                        }}
                      />

                      <Typography fontWeight={600}>No results found</Typography>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        mt={0.5}
                      >
                        Try searching for Projects, Tasks, Team or Calendar.
                      </Typography>
                    </Box>
                  )}
                </Paper>
              </ClickAwayListener>
            )}
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <IconButton
              onClick={toggleMode}
              title={
                mode === "dark" ? "Switch to light mode" : "Switch to dark mode"
              }
              sx={{
                color: "text.primary",
              }}
            >
              {mode === "dark" ? (
                <LightModeOutlinedIcon />
              ) : (
                <DarkModeOutlinedIcon />
              )}
            </IconButton>

            <Box
              sx={{
                position: "relative",
              }}
            >
              <IconButton
                onClick={handleNotificationToggle}
                sx={{
                  color: "text.primary",
                }}
              >
                <Badge badgeContent={unreadCount} color="error" max={99}>
                  <NotificationsNoneIcon />
                </Badge>
              </IconButton>

              {notificationOpen && (
                <ClickAwayListener
                  onClickAway={() => setNotificationOpen(false)}
                >
                  <Paper
                    elevation={10}
                    sx={{
                      position: "absolute",

                      top: "calc(100% + 12px)",

                      right: 0,

                      width: {
                        xs: "calc(100vw - 24px)",
                        sm: 390,
                      },

                      maxHeight: 540,

                      borderRadius: 3,

                      overflow: "hidden",

                      border: "1px solid",
                      borderColor: "divider",

                      bgcolor: "background.paper",

                      boxShadow: "0 16px 45px rgba(27,27,29,0.18)",

                      zIndex: 3000,
                    }}
                  >
                    <Box
                      sx={{
                        px: 2,
                        py: 1.8,

                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Box>
                        <Typography fontWeight={700} fontSize={16}>
                          Notifications
                        </Typography>

                        <Typography variant="caption" color="text.secondary">
                          {unreadCount > 0
                            ? `${unreadCount} unread`
                            : "You're all caught up"}
                        </Typography>
                      </Box>

                      {unreadCount > 0 && (
                        <Button
                          size="small"
                          startIcon={<DoneAllIcon />}
                          onClick={markAllAsRead}
                          sx={{
                            textTransform: "none",
                            fontWeight: 600,
                          }}
                        >
                          Mark all read
                        </Button>
                      )}
                    </Box>

                    <Divider />

                    {notifications.length === 0 ? (
                      <Box
                        sx={{
                          py: 6,
                          px: 3,
                          textAlign: "center",
                        }}
                      >
                        <NotificationsNoneIcon
                          sx={{
                            fontSize: 45,
                            color: "text.disabled",
                            mb: 1,
                          }}
                        />

                        <Typography fontWeight={600}>
                          No notifications
                        </Typography>

                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            mt: 0.5,
                          }}
                        >
                          New event notifications will appear here.
                        </Typography>
                      </Box>
                    ) : (
                      <Box
                        sx={{
                          maxHeight: 450,
                          overflowY: "auto",
                        }}
                      >
                        {notifications.map((notification) => (
                          <Box
                            key={notification.id}
                            onClick={() =>
                              handleNotificationClick(notification)
                            }
                            sx={{
                              px: 2,
                              py: 1.8,

                              cursor: "pointer",

                              bgcolor: notification.read
                                ? "transparent"
                                : "rgba(255,138,61,0.08)",

                              borderBottom: "1px solid",

                              borderColor: "divider",

                              "&:hover": {
                                bgcolor: "action.hover",
                              },
                            }}
                          >
                            <Stack
                              direction="row"
                              spacing={1.5}
                              alignItems="flex-start"
                            >
                              <Box
                                sx={{
                                  width: 40,
                                  height: 40,

                                  borderRadius: 2,

                                  bgcolor: "rgba(255,138,61,0.12)",

                                  color: "primary.main",

                                  display: "flex",

                                  alignItems: "center",

                                  justifyContent: "center",

                                  flexShrink: 0,
                                }}
                              >
                                <EventOutlinedIcon />
                              </Box>

                              <Box
                                sx={{
                                  flex: 1,
                                  minWidth: 0,
                                }}
                              >
                                <Typography
                                  fontWeight={notification.read ? 600 : 700}
                                  fontSize={14}
                                >
                                  {notification.title}
                                </Typography>

                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                  sx={{
                                    mt: 0.4,
                                    lineHeight: 1.5,
                                  }}
                                >
                                  {notification.message}
                                </Typography>

                                <Typography
                                  variant="caption"
                                  color="text.disabled"
                                  sx={{
                                    display: "block",
                                    mt: 0.7,
                                  }}
                                >
                                  {new Date(
                                    notification.createdAt,
                                  ).toLocaleString("en-IN", {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                </Typography>
                              </Box>
                            </Stack>
                          </Box>
                        ))}
                      </Box>
                    )}
                  </Paper>
                </ClickAwayListener>
              )}
            </Box>

            <Avatar
              sx={{
                bgcolor: "primary.main",

                color: "primary.contrastText",

                cursor: "pointer",

                width: 38,
                height: 38,

                fontWeight: 700,
              }}
            >
              S
            </Avatar>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
