import { Card, CardContent, Stack, Typography, Avatar } from "@mui/material";

const StatCard = ({
  title,
  value,
  icon,
  color = "primary.main",
}) => {
  return (
    <Card
      sx={{
        height: "100%",
        transition: ".3s",
        cursor: "pointer",

        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: 6,
        },
      }}
    >
      <CardContent>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack spacing={1}>
            <Typography
              variant="body2"
              color="text.secondary"
            >
              {title}
            </Typography>

            <Typography
              variant="h4"
              fontWeight={700}
            >
              {value}
            </Typography>
          </Stack>

          <Avatar
            sx={{
              bgcolor: color,
              width: 56,
              height: 56,
            }}
          >
            {icon}
          </Avatar>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default StatCard;