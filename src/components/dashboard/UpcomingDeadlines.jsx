import {
  Card,
  CardContent,
  Chip,
  Stack,
  Typography,
} from "@mui/material";

const deadlines = [
  {
    id: 1,
    title: "Project Proposal",
    due: "Today",
    color: "error",
  },
  {
    id: 2,
    title: "UI Design Review",
    due: "Tomorrow",
    color: "warning",
  },
  {
    id: 3,
    title: "Sprint Planning",
    due: "Jul 31",
    color: "success",
  },
];

const UpcomingDeadlines = () => {
  return (
    <Card >
      <CardContent>
        <Typography variant="h6" fontWeight={600} mb={2}>
          Upcoming Deadlines
        </Typography>

        <Stack spacing={2}>
          {deadlines.map((item) => (
            <Stack
              key={item.id}
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography>{item.title}</Typography>

              <Chip
                label={item.due}
                color={item.color}
                size="small"
              />
            </Stack>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default UpcomingDeadlines;