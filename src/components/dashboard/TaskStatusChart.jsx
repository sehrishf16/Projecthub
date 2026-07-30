import {
  Card,
  CardContent,
  Typography,
} from "@mui/material";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  { name: "Completed", value: 65 },
  { name: "In Progress", value: 20 },
  { name: "Pending", value: 10 },
  { name: "Overdue", value: 5 },
];

const COLORS = [
  "#4CAF50",
  "#FF9800",
  "#2196F3",
  "#F44336",
];

const TaskStatusChart = () => {
  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Typography
          variant="h6"
          fontWeight={600}
          mb={2}
        >
          Task Status
        </Typography>

        <ResponsiveContainer
          width="100%"
          height={300}
        >
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={100}
              paddingAngle={3}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index]}
                />
              ))}
            </Pie>

            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default TaskStatusChart;