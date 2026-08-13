import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CodeIcon from "@mui/icons-material/Code";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import ViewKanbanOutlinedIcon from "@mui/icons-material/ViewKanbanOutlined";
import GitHubIcon from "@mui/icons-material/GitHub";
import StorageOutlinedIcon from "@mui/icons-material/StorageOutlined";

const AboutSettings = () => {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 2,
        border: "1px solid",
        borderColor: "divider",
        overflow: "hidden",
      }}
    >
      <CardContent
        sx={{
          p: {
            xs: 2.5,
            md: 4,
          },
        }}
      >
        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
          spacing={2}
          alignItems={{
            xs: "flex-start",
            sm: "center",
          }}
          mb={3}
        >
          <Avatar
            sx={{
              bgcolor: "primary.main",
              width: 64,
              height: 64,
              boxShadow: "0 6px 18px rgba(255,138,61,0.25)",
            }}
          >
            <InfoOutlinedIcon
              sx={{
                fontSize: 34,
              }}
            />
          </Avatar>

          <Box>
            <Typography variant="h5" fontWeight={700}>
              ProjectHub
            </Typography>

            <Typography
              color="text.secondary"
              sx={{
                mt: 0.5,
              }}
            >
              Project Management Dashboard
            </Typography>
          </Box>
        </Stack>

        <Divider sx={{ mb: 3 }} />

        <Stack spacing={3}>
          <Box>
            <Typography variant="body2" color="text.secondary" fontWeight={600}>
              Version
            </Typography>

            <Chip
              label="v1.0.0"
              color="primary"
              size="small"
              sx={{
                mt: 1,
                fontWeight: 600,
              }}
            />
          </Box>

          <Box>
            <Typography variant="h6" fontWeight={700} mb={1}>
              About ProjectHub
            </Typography>

            <Typography
              color="text.secondary"
              sx={{
                lineHeight: 1.8,
                maxWidth: 850,
              }}
            >
              ProjectHub is a modern project management dashboard designed to
              help teams organize projects, manage tasks, collaborate with team
              members, track deadlines, and monitor their overall workspace from
              one place.
            </Typography>
          </Box>

          <Divider />

          <Box>
            <Typography variant="h6" fontWeight={700} mb={2}>
              Technology Stack
            </Typography>

            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              <TechChip label="React 19" />

              <TechChip label="Vite" />

              <TechChip label="Material UI" />

              <TechChip label="React Router" />

              <TechChip label="React Big Calendar" />

              <TechChip label="DnD Kit" />

              <TechChip label="LocalStorage" />

              <TechChip label="JavaScript" />
            </Stack>
          </Box>

          <Divider />

          <Box>
            <Typography variant="h6" fontWeight={700} mb={2}>
              Features
            </Typography>

            <Stack
              direction="column"
              spacing={1.2}
              sx={{
                width: "100%",
                maxWidth: 700,
              }}
              flexWrap="wrap"
              useFlexGap
            >
              <FeatureChip icon={<DashboardOutlinedIcon />} label="Dashboard" />

              <FeatureChip icon={<CodeIcon />} label="Project Management" />

              <FeatureChip
                icon={<TaskAltOutlinedIcon />}
                label="Task Management"
              />

              <FeatureChip
                icon={<ViewKanbanOutlinedIcon />}
                label="Kanban Board"
              />

              <FeatureChip
                icon={<CalendarMonthOutlinedIcon />}
                label="Team Calendar"
              />

              <FeatureChip
                icon={<GroupsOutlinedIcon />}
                label="Team Management"
              />

              <FeatureChip icon={<StorageOutlinedIcon />} label="Analytics" />

              <FeatureChip icon={<InfoOutlinedIcon />} label="Notifications" />
            </Stack>
          </Box>

          <Divider />

          <Box
            sx={{
              p: 2.5,

              borderRadius: 2,

              bgcolor: "rgba(255,138,61,0.06)",

              border: "1px solid",

              borderColor: "rgba(255,138,61,0.15)",
            }}
          >
            <Typography fontWeight={700} mb={1}>
              Built for better teamwork
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                lineHeight: 1.7,
              }}
            >
              ProjectHub brings projects, tasks, team collaboration and
              scheduling together in a simple and organized workspace.
            </Typography>
          </Box>

          <Stack
            direction={{
              xs: "column",
              sm: "row",
            }}
            spacing={1}
            alignItems={{
              xs: "flex-start",
              sm: "center",
            }}
            justifyContent="space-between"
          >
            <Typography variant="body2" color="text.secondary">
              © 2026 ProjectHub. All Rights Reserved.
            </Typography>

            <Stack direction="row" spacing={1} alignItems="center">
              <GitHubIcon
                sx={{
                  fontSize: 20,
                  color: "text.secondary",
                }}
              />

              <Typography variant="body2" color="text.secondary">
                Built with React & Material UI
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

const TechChip = ({ label }) => {
  return (
    <Chip
      label={label}
      variant="outlined"
      sx={{
        borderRadius: 2,
        fontWeight: 600,
      }}
    />
  );
};

const FeatureChip = ({ icon, label }) => {
  return (
    <Chip
      icon={icon}
      label={label}
      variant="outlined"
      sx={{
        borderRadius: 2,
        fontWeight: 600,

        "& .MuiChip-icon": {
          color: "primary.main",
        },
      }}
    />
  );
};

export default AboutSettings;
