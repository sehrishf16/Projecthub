import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Card, CardContent, Typography } from "@mui/material";

const data = [
  { day: "Mon", tasks: 12 },
  { day: "Tue", tasks: 18 },
  { day: "Wed", tasks: 10 },
  { day: "Thu", tasks: 25 },
  { day: "Fri", tasks: 22 },
  { day: "Sat", tasks: 28 },
  { day: "Sun", tasks: 20 },
];

const AnalyticsChart = () => {
  return (
    <Card sx={{ mt: 4 }}>
      <CardContent>
        <Typography variant="h6" fontWeight={600} mb={2}>
          Weekly Task Progress
        </Typography>

        <ResponsiveContainer width="100%" height={320}>
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="day" />

            <YAxis />

            <Tooltip />

            <Area
              type="monotone"
              dataKey="tasks"
              stroke="#FF8A3D"
              fill="#FFCF9A"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default AnalyticsChart;