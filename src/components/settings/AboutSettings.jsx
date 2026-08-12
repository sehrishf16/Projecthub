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
import StorageIcon from "@mui/icons-material/Storage";
import WebIcon from "@mui/icons-material/Web";
import GitHubIcon from "@mui/icons-material/GitHub";

const AboutSettings = () => {
  return (
    <Card elevation={2}>
      <CardContent>

        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          mb={3}
        >
          <Avatar
            sx={{
              bgcolor: "primary.main",
              width: 60,
              height: 60,
            }}
          >
            <InfoOutlinedIcon fontSize="large" />
          </Avatar>

          <Box>
            <Typography
              variant="h5"
              fontWeight={700}
            >
              ProjectHub
            </Typography>

            <Typography color="text.secondary">
              Project Management Dashboard
            </Typography>
          </Box>
        </Stack>

        <Divider sx={{ mb: 3 }} />

        <Stack spacing={2}>

          <Box>
            <Typography fontWeight={600}>
              Version
            </Typography>

            <Chip
              label="v1.0.0"
              color="primary"
              sx={{ mt: 1 }}
            />
          </Box>

          <Box>
            <Typography fontWeight={600}>
              Description
            </Typography>

            <Typography color="text.secondary">
              ProjectHub is a modern project
              management dashboard built with
              React, Material UI and Redux Toolkit.
              It helps teams manage projects,
              tasks, calendars and collaboration
              efficiently.
            </Typography>
          </Box>

          <Divider />

          <Typography
            variant="h6"
            fontWeight={700}
          >
            Technology Stack
          </Typography>

          <Stack
            direction="row"
            spacing={1}
            flexWrap="wrap"
            useFlexGap
          >
            <Chip icon={<WebIcon />} label="React 19" />
            <Chip label="Vite" />
            <Chip label="Material UI" />
            <Chip label="Redux Toolkit" />
            <Chip label="React Router" />
            <Chip label="React Big Calendar" />
            <Chip label="DnD Kit" />
          </Stack>

          <Divider />

          <Typography
            variant="h6"
            fontWeight={700}
          >
            Features
          </Typography>

          <Stack spacing={1}>

            <Chip
              icon={<CodeIcon />}
              label="Project Management"
            />

            <Chip
              icon={<StorageIcon />}
              label="Task Management"
            />

            <Chip
              icon={<StorageIcon />}
              label="Kanban Board"
            />

            <Chip
              icon={<StorageIcon />}
              label="Calendar"
            />

            <Chip
              icon={<StorageIcon />}
              label="Team Management"
            />

            <Chip
              icon={<StorageIcon />}
              label="Analytics Dashboard"
            />

          </Stack>

          <Divider />

          <Typography
            variant="body2"
            color="text.secondary"
          >
            © 2026 ProjectHub. All Rights Reserved.
          </Typography>

          <Stack
            direction="row"
            spacing={1}
          >
            <GitHubIcon color="action" />

            <Typography color="text.secondary">
              Built with ❤️ using React & Material UI
            </Typography>
          </Stack>

        </Stack>

      </CardContent>
    </Card>
  );
};

export default AboutSettings;