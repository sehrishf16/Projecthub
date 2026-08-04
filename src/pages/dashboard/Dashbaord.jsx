import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import FolderIcon from "@mui/icons-material/Folder";
import TaskIcon from "@mui/icons-material/Task";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import GroupIcon from "@mui/icons-material/Group";
import RecentActivity from "../../components/dashboard/RecentActivity";
import UpcomingDeadlines from "../../components/dashboard/UpcomingDeadlines";
import TaskStatusChart from "../../components/dashboard/TaskStatusChart";
import StatCard from "../../components/dashboard/StatCard";
import AnalyticsChart from "../../components/dashboard/AnalyticsChart";

const Dashboard = () => {
  return (
    <><><Box>
          <Typography variant="h4" fontWeight={700} >
              Welcome Back 👋
          </Typography>

          <Typography color="text.secondary" mb={4}>
              Here's an overview of your workspace.
          </Typography>

         
          <Grid container spacing={3}>
              <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                  <StatCard
                      title="Projects"
                      value="12"
                      icon={<FolderIcon />} />
              </Grid>

              <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                  <StatCard
                      title="Tasks"
                      value="156"
                      icon={<TaskIcon />}
                      color="warning.main" />
              </Grid>

              <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                  <StatCard
                      title="Completed"
                      value="120"
                      icon={<DoneAllIcon />}
                      color="success.main" />
              </Grid>

              <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                  <StatCard
                      title="Team Members"
                      value="18"
                      icon={<GroupIcon />}
                      color="secondary.main" />
              </Grid>
          </Grid>

          
          <Box mt={4}>
              <AnalyticsChart />
          </Box>
      </Box><Box mt={4}>
              <Grid container spacing={3}>
                  <Grid size={{ xs: 12, lg: 8 }}>
                      <RecentActivity />
                  </Grid>

                  <Grid size={{ xs: 12, lg: 4 }}>
                      <UpcomingDeadlines />
                  </Grid>
              </Grid>
          </Box></><Box mt={4}>
              <Grid container spacing={3}>
                  
                  <Grid size={{ xs: 12, lg: 4 }}>
                      <TaskStatusChart />
                  </Grid>
              </Grid>
          </Box></>
  );
};

export default Dashboard;