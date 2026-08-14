import { useEffect, useMemo, useState } from "react";

import { Box, Grid, Typography, Avatar, Paper, Stack } from "@mui/material";

import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import TaskOutlinedIcon from "@mui/icons-material/TaskOutlined";
import DoneAllOutlinedIcon from "@mui/icons-material/DoneAllOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

// import RecentActivity from "../../components/dashboard/RecentActivity";
// import UpcomingDeadlines from "../../components/dashboard/UpcomingDeadlines";
// import TaskStatusChart from "../../components/dashboard/TaskStatusChart";
// import StatCard from "../../components/dashboard/StatCard";
import AnalyticsChart from "../../components/dashboard/AnalyticsChart";

import { useNotifications } from "../../context/NotificationContext";

const getStoredArray = (key) => {
  try {
    const storedData = localStorage.getItem(key);

    if (!storedData) {
      return [];
    }

    const parsedData = JSON.parse(storedData);

    return Array.isArray(parsedData) ? parsedData : [];
  } catch (error) {
    console.error(`Unable to read ${key} from localStorage`, error);

    return [];
  }
};

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  const [profile, setProfile] = useState({
    firstName: "Sehrish",
    lastName: "Fatema",
    avatar: "",
  });

  const [dashboardStats, setDashboardStats] = useState({
    projects: 0,
    tasks: 0,
    completed: 0,
    teamMembers: 0,
  });

  const { unreadCount } = useNotifications();

  const loadProfile = () => {
    const savedProfile = localStorage.getItem("profile");

    if (!savedProfile) {
      return;
    }

    try {
      const parsedProfile = JSON.parse(savedProfile);

      setProfile((prev) => ({
        ...prev,
        ...parsedProfile,
      }));
    } catch (error) {
      console.error("Unable to load profile", error);
    }
  };

  const loadDashboardStats = () => {
    const projects = getStoredArray("projects");

    const tasks = getStoredArray("tasks");

    const teamMembers = getStoredArray("members");

    const completedTasks = tasks.filter((task) => {
      const status = String(task?.status || "").toLowerCase();

      return (
        status === "completed" ||
        status === "complete" ||
        status === "done" ||
        task?.completed === true ||
        task?.isCompleted === true
      );
    });

    setDashboardStats({
      projects: projects.length,

      tasks: tasks.length,

      completed: completedTasks.length,

      teamMembers: teamMembers.length,
    });
  };

  useEffect(() => {
    loadProfile();
    loadDashboardStats();

    const clockInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    const handleDashboardUpdate = () => {
      loadDashboardStats();
      loadProfile();
    };

    window.addEventListener("projecthub:data-updated", handleDashboardUpdate);

    window.addEventListener("storage", handleDashboardUpdate);

    const statsInterval = setInterval(() => {
      loadDashboardStats();
    }, 1000);

    return () => {
      clearInterval(clockInterval);

      clearInterval(statsInterval);

      window.removeEventListener(
        "projecthub:data-updated",
        handleDashboardUpdate,
      );

      window.removeEventListener("storage", handleDashboardUpdate);
    };
  }, []);

  const greeting = useMemo(() => {
    const hour = currentTime.getHours();

    if (hour >= 5 && hour < 12) {
      return {
        text: "Good Morning",
        emoji: "🌅",
        message: "Start your day by planning your work and priorities.",
      };
    }

    if (hour >= 12 && hour < 17) {
      return {
        text: "Good Afternoon",
        emoji: "☀️",
        message: "Keep the momentum going and stay focused on your goals.",
      };
    }

    if (hour >= 17 && hour < 21) {
      return {
        text: "Good Evening",
        emoji: "🌇",
        message: "Take a moment to review your progress for today.",
      };
    }

    return {
      text: "Good Night",
      emoji: "🌙",
      message: "Great work today. Here's a quick look at your workspace.",
    };
  }, [currentTime]);

  const formattedTime = currentTime.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const formattedDate = currentTime.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const firstName = profile.firstName || "there";

  const stats = [
    {
      title: "Projects",

      value: dashboardStats.projects,

      icon: <FolderOutlinedIcon />,

      color: "primary.main",

      change: `${dashboardStats.projects} created`,
    },

    {
      title: "Tasks",

      value: dashboardStats.tasks,

      icon: <TaskOutlinedIcon />,

      color: "warning.main",

      change: `${dashboardStats.tasks} total tasks`,
    },

    {
      title: "Completed",

      value: dashboardStats.completed,

      icon: <DoneAllOutlinedIcon />,

      color: "success.main",

      change: `${dashboardStats.completed} completed`,
    },

    {
      title: "Team Members",

      value: dashboardStats.teamMembers,

      icon: <GroupsOutlinedIcon />,

      color: "secondary.main",

      change: `${dashboardStats.teamMembers} members`,
    },
  ];

  return (
    <Box
      sx={{
        pb: 4,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          position: "relative",

          overflow: "hidden",

          borderRadius: 4,

          p: {
            xs: 2.5,
            sm: 3.5,
            md: 4,
          },

          mb: 4,

          background:
            "linear-gradient(135deg, rgba(255,138,61,0.16), rgba(255,207,154,0.22))",

          border: "1px solid",

          borderColor: "rgba(255,138,61,0.18)",
        }}
      >
        <Box
          sx={{
            position: "absolute",

            width: 260,
            height: 260,

            borderRadius: "50%",

            bgcolor: "rgba(255,138,61,0.10)",

            right: -80,
            top: -120,
          }}
        />

        <Box
          sx={{
            position: "absolute",

            width: 160,
            height: 160,

            borderRadius: "50%",

            bgcolor: "rgba(255,138,61,0.08)",

            right: 100,
            bottom: -100,
          }}
        />

        <Grid container spacing={3} alignItems="center">
          <Grid
            size={{
              xs: 12,
              md: 8,
            }}
          >
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar
                src={profile.avatar}
                alt={firstName}
                sx={{
                  width: {
                    xs: 52,
                    sm: 64,
                  },

                  height: {
                    xs: 52,
                    sm: 64,
                  },

                  bgcolor: "primary.main",

                  fontSize: {
                    xs: 20,
                    sm: 26,
                  },

                  fontWeight: 700,

                  boxShadow: "0 8px 24px rgba(255,138,61,0.25)",
                }}
              >
                {!profile.avatar && firstName[0]}
              </Avatar>

              <Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  fontWeight={600}
                  sx={{
                    mb: 0.4,
                  }}
                >
                  {formattedDate}
                </Typography>

                <Typography
                  variant="h4"
                  fontWeight={800}
                  sx={{
                    fontSize: {
                      xs: "1.65rem",
                      sm: "2.2rem",
                      md: "2.5rem",
                    },
                  }}
                >
                  {greeting.text},{" "}
                  <Box
                    component="span"
                    sx={{
                      color: "primary.main",
                    }}
                  >
                    {firstName}
                  </Box>{" "}
                  {greeting.emoji}
                </Typography>

                <Typography
                  color="text.secondary"
                  sx={{
                    mt: 0.8,

                    maxWidth: 650,

                    lineHeight: 1.6,
                  }}
                >
                  {greeting.message}
                </Typography>
              </Box>
            </Stack>
          </Grid>

          <Grid
            size={{
              xs: 12,
              md: 4,
            }}
          >
            <Box
              sx={{
                display: "flex",

                justifyContent: {
                  xs: "flex-start",
                  md: "flex-end",
                },
              }}
            >
              <Paper
                elevation={0}
                sx={{
                  px: 2.5,
                  py: 1.5,

                  borderRadius: 3,

                  bgcolor: "background.paper",

                  border: "1px solid",

                  borderColor: "divider",

                  display: "inline-flex",

                  alignItems: "center",

                  gap: 1.5,
                }}
              >
                <AccessTimeOutlinedIcon
                  sx={{
                    color: "primary.main",
                  }}
                />

                <Box>
                  <Typography fontWeight={800} fontSize={18}>
                    {formattedTime}
                  </Typography>

                  <Typography variant="caption" color="text.secondary">
                    Live local time
                  </Typography>
                </Box>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={3}>
        {stats.map((stat) => (
          <Grid
            key={stat.title}
            size={{
              xs: 12,
              sm: 6,
              lg: 3,
            }}
          >
            <StatCard
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              color={stat.color}
            />

            <Typography
              variant="caption"
              color="text.secondary"
              sx={{
                display: "block",

                mt: 0.8,

                ml: 1,
              }}
            >
              {stat.change}
            </Typography>
          </Grid>
        ))}
      </Grid>

      <Box mt={4}>
        <Grid container spacing={3}>
          {/* TODAY */}

          <Grid
            size={{
              xs: 12,
              md: 4,
            }}
          >
            <Paper
              elevation={0}
              sx={{
                p: 2.5,

                borderRadius: 3,

                border: "1px solid",

                borderColor: "divider",

                height: "100%",
              }}
            >
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Box
                  sx={{
                    width: 44,
                    height: 44,

                    borderRadius: 2,

                    display: "flex",

                    alignItems: "center",

                    justifyContent: "center",

                    bgcolor: "rgba(255,138,61,0.12)",

                    color: "primary.main",
                  }}
                >
                  <CalendarMonthOutlinedIcon />
                </Box>

                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Today's focus
                  </Typography>

                  <Typography fontWeight={700}>
                    Keep your projects moving
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          </Grid>

          <Grid
            size={{
              xs: 12,
              md: 4,
            }}
          >
            <Paper
              elevation={0}
              sx={{
                p: 2.5,

                borderRadius: 3,

                border: "1px solid",

                borderColor: "divider",

                height: "100%",
              }}
            >
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Box
                  sx={{
                    width: 44,
                    height: 44,

                    borderRadius: 2,

                    display: "flex",

                    alignItems: "center",

                    justifyContent: "center",

                    bgcolor: "rgba(255,138,61,0.12)",

                    color: "primary.main",
                  }}
                >
                  <TrendingUpIcon />
                </Box>

                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Notifications
                  </Typography>

                  <Typography fontWeight={700}>
                    {unreadCount} unread notification
                    {unreadCount === 1 ? "" : "s"}
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          </Grid>

          <Grid
            size={{
              xs: 12,
              md: 4,
            }}
          >
            <Paper
              elevation={0}
              sx={{
                p: 2.5,

                borderRadius: 3,

                border: "1px solid",

                borderColor: "divider",

                height: "100%",
              }}
            >
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Box
                  sx={{
                    width: 44,
                    height: 44,

                    borderRadius: 2,

                    display: "flex",

                    alignItems: "center",

                    justifyContent: "center",

                    bgcolor: "rgba(76,175,80,0.12)",

                    color: "success.main",
                  }}
                >
                  <DoneAllOutlinedIcon />
                </Box>

                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Workspace status
                  </Typography>

                  <Typography fontWeight={700}>
                    Everything is running
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      <Box mt={4}>
        <AnalyticsChart />
      </Box>
    </Box>
  );
};

export default Dashboard;
