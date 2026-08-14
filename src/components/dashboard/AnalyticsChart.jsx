import { useEffect, useMemo, useState } from "react";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Card, CardContent, Typography, Box, Stack, Chip } from "@mui/material";

import TrendingUpIcon from "@mui/icons-material/TrendingUp";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const getTasks = () => {
  try {
    const savedTasks = localStorage.getItem("tasks");

    if (!savedTasks) {
      return [];
    }

    const parsedTasks = JSON.parse(savedTasks);

    return Array.isArray(parsedTasks) ? parsedTasks : [];
  } catch (error) {
    console.error("Unable to load tasks", error);

    return [];
  }
};

const getTaskDate = (task) => {
  const dateValue =
    task?.dueDate ||
    task?.date ||
    task?.startDate ||
    task?.createdAt ||
    task?.created_at;

  if (!dateValue) {
    return null;
  }

  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date;
};

const getStartOfWeek = (date) => {
  const result = new Date(date);

  const day = result.getDay();

  const difference = day === 0 ? -6 : 1 - day;

  result.setDate(result.getDate() + difference);

  result.setHours(0, 0, 0, 0);

  return result;
};

const getEndOfWeek = (date) => {
  const result = getStartOfWeek(date);

  result.setDate(result.getDate() + 6);

  result.setHours(23, 59, 59, 999);

  return result;
};

const formatDate = (date) => {
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  });
};

const AnalyticsChart = () => {
  const [tasks, setTasks] = useState([]);

  const [today, setToday] = useState(new Date());

  const loadTasks = () => {
    setTasks(getTasks());
  };

  useEffect(() => {
    loadTasks();

    const handleUpdate = () => {
      loadTasks();
    };

    window.addEventListener("projecthub:data-updated", handleUpdate);

    window.addEventListener("storage", handleUpdate);

    const taskInterval = setInterval(() => {
      loadTasks();
    }, 1000);

    const dateInterval = setInterval(() => {
      setToday(new Date());
    }, 60000);

    return () => {
      window.removeEventListener("projecthub:data-updated", handleUpdate);

      window.removeEventListener("storage", handleUpdate);

      clearInterval(taskInterval);

      clearInterval(dateInterval);
    };
  }, []);

  const weekStart = useMemo(() => getStartOfWeek(today), [today]);

  const weekEnd = useMemo(() => getEndOfWeek(today), [today]);

  const data = useMemo(() => {
    const weeklyData = DAYS.map((day) => ({
      day,
      tasks: 0,
    }));

    tasks.forEach((task) => {
      const taskDate = getTaskDate(task);

      if (!taskDate) {
        return;
      }

      if (taskDate < weekStart || taskDate > weekEnd) {
        return;
      }

      const jsDay = taskDate.getDay();

      const index = jsDay === 0 ? 6 : jsDay - 1;

      weeklyData[index].tasks += 1;
    });

    return weeklyData;
  }, [tasks, weekStart, weekEnd]);

  const totalTasks = data.reduce((total, item) => total + item.tasks, 0);

  const maxTasks = Math.max(...data.map((item) => item.tasks), 1);

  const weekLabel = `${formatDate(weekStart)} – ${formatDate(weekEnd)}`;

  return (
    <Card
      elevation={0}
      sx={{
        mt: 4,

        borderRadius: 3,

        border: "1px solid",

        borderColor: "divider",

        overflow: "hidden",
      }}
    >
      <CardContent
        sx={{
          p: {
            xs: 2,
            sm: 3,
          },
        }}
      >
        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
          spacing={2}
          justifyContent="space-between"
          alignItems={{
            xs: "flex-start",
            sm: "center",
          }}
          mb={3}
        >
          <Box>
            <Typography variant="h6" fontWeight={700}>
              Weekly Task Progress
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mt: 0.5,
              }}
            >
              {weekLabel}
            </Typography>
          </Box>

          <Chip
            icon={<TrendingUpIcon />}
            label={`${totalTasks} tasks this week`}
            color="primary"
            variant="outlined"
            sx={{
              fontWeight: 600,
            }}
          />
        </Stack>

        <Box
          sx={{
            width: "100%",
            height: {
              xs: 260,
              sm: 320,
            },
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{
                top: 10,
                right: 10,
                left: -10,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient id="taskGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FF8A3D" stopOpacity={0.35} />

                  <stop offset="100%" stopColor="#FFCF9A" stopOpacity={0.05} />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="rgba(120,120,120,0.15)"
              />

              <XAxis
                dataKey="day"
                tick={{
                  fontSize: 12,
                }}
                tickLine={false}
                axisLine={false}
              />

              <YAxis
                allowDecimals={false}
                domain={[0, Math.max(maxTasks, 5)]}
                tick={{
                  fontSize: 12,
                }}
                tickLine={false}
                axisLine={false}
              />

              <Tooltip
                cursor={{
                  stroke: "#FF8A3D",
                  strokeWidth: 1,
                  strokeDasharray: "4 4",
                }}
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid #F0E3D4",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                }}
                formatter={(value) => [
                  `${value} task${value === 1 ? "" : "s"}`,
                  "Tasks",
                ]}
              />

              <Area
                type="monotone"
                dataKey="tasks"
                stroke="#FF8A3D"
                strokeWidth={3}
                fill="url(#taskGradient)"
                activeDot={{
                  r: 6,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </Box>

        {totalTasks === 0 && (
          <Box
            sx={{
              mt: 2,

              p: 1.5,

              borderRadius: 2,

              bgcolor: "action.hover",

              textAlign: "center",
            }}
          >
            <Typography variant="body2" color="text.secondary">
              No tasks scheduled for this week yet.
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default AnalyticsChart;
