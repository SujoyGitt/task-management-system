import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#22c55e", "#3b82f6", "#a855f7", "#ef4444"]; // Completed, In Progress, On Hold, Pending

const statusMapping = ["Closed", "In Progress", "Ready for test", "Ready for Development"];

const TasksStatusChart = () => {
  const [data, setData] = useState([
    { name: "Closed", value: 0 },
    { name: "In Progress", value: 0 },
    { name: "Ready for test", value: 0 },
    { name: "Ready for Development", value: 0 },
  ]);

  useEffect(() => {
    try {
      const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      const statusCount = statusMapping.map(
        (status) => ({
          name: status,
          value: tasks.filter((t) => t.status === status).length,
        })
      );
      setData(statusCount);
    } catch {
      setData([
        { name: "Closed", value: 0 },
        { name: "In Progress", value: 0 },
        { name: "Ready for test", value: 0 },
        { name: "Ready for Development", value: 0 },
      ]);
    }
  }, []);

  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie
          data={data}
          innerRadius={60}
          outerRadius={100}
          paddingAngle={0}
          dataKey="value"
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((_, index) => (
            <Cell key={index} fill={COLORS[index]} />
          ))}
        </Pie>

        <Tooltip />
        <Legend verticalAlign="bottom" height={36} />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default TasksStatusChart;
