import React, { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const WorkLogChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    try {
      const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

      // Create a map of weekdays
      const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const dailyHours = weekdays.map((day) => ({ day, hours: 0 }));

      // Count hours per day (assuming each task = 1h for simplicity)
      tasks.forEach((task) => {
        const date = new Date(task.id); // using id as timestamp
        const dayName = weekdays[date.getDay()];
        const dayIndex = dailyHours.findIndex((d) => d.day === dayName);
        if (dayIndex !== -1) {
          dailyHours[dayIndex].hours += 1; // 1 hour per task
        }
      });

      // Filter only Mon-Fri for chart
      setData(dailyHours.slice(1, 6));
    } catch {
      setData([]);
    }
  }, []);

  return (
    <ResponsiveContainer width="100%" height={260}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
          </linearGradient>
        </defs>

        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />

        <Area
          type="monotone"
          dataKey="hours"
          stroke="#0284c7"
          fill="url(#colorHours)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default WorkLogChart;
