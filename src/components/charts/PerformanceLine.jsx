import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const months = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const PerformanceChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    try {
      const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

      // Count tasks by month
      const monthlyStats = months.map((month, index) => {
        // Filter tasks created in this month
        const tasksInMonth = tasks.filter((t) => {
          const taskDate = new Date(t.id); // using id as timestamp
          return taskDate.getMonth() === index;
        });

        // Count completed tasks (Closed)
        const achieved = tasksInMonth.filter((t) => t.status === "Closed").length;

        // Set a target (for example 5 tasks per month)
        const target = 5;

        return {
          month,
          achieved,
          target,
        };
      });

      setData(monthlyStats);
    } catch {
      setData([]);
    }
  }, []);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />

        <Line
          type="monotone"
          dataKey="achieved"
          stroke="#f97316"
          strokeWidth={3}
        />
        <Line
          type="monotone"
          dataKey="target"
          stroke="#6366f1"
          strokeDasharray="5 5"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default PerformanceChart;
