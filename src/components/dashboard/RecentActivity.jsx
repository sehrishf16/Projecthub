import {
  Avatar,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";

const activities = [
  {
    id: 1,
    name: "John Doe",
    action: "created a new project",
    time: "10 min ago",
  },
  {
    id: 2,
    name: "Sarah Smith",
    action: "completed Task #24",
    time: "35 min ago",
  },
  {
    id: 3,
    name: "Alex Johnson",
    action: "added a new team member",
    time: "1 hour ago",
  },
  {
    id: 4,
    name: "Emily Brown",
    action: "updated project status",
    time: "2 hours ago",
  },
];

const RecentActivity = () => {
  return (
    <Card >
      <CardContent>
        <Typography variant="h6" fontWeight={600} mb={2}>
          Recent Activity
        </Typography>

        <List disablePadding>
          {activities.map((activity, index) => (
            <div key={activity.id}>
              <ListItem disableGutters>
                <ListItemAvatar>
                  <Avatar>{activity.name[0]}</Avatar>
                </ListItemAvatar>

                <ListItemText
                  primary={activity.name}
                  secondary={activity.action}
                />

                <Typography variant="caption" color="text.secondary">
                  {activity.time}
                </Typography>
              </ListItem>

              {index !== activities.length - 1 && <Divider />}
            </div>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;