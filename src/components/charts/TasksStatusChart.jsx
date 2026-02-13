import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = {
  "Closed": { main: "#22c55e", light: "#4ade80", gradient: "from-green-500 to-emerald-600" },
  "In Progress": { main: "#3b82f6", light: "#60a5fa", gradient: "from-blue-500 to-blue-600" },
  "Ready for test": { main: "#a855f7", light: "#c084fc", gradient: "from-purple-500 to-purple-600" },
  "Ready for Development": { main: "#ef4444", light: "#f87171", gradient: "from-red-500 to-red-600" },
};

const statusMapping = ["Closed", "In Progress", "Ready for test", "Ready for Development"];

const TasksStatusChart = () => {
  const [data, setData] = useState([
    { name: "Closed", value: 0 },
    { name: "In Progress", value: 0 },
    { name: "Ready for test", value: 0 },
    { name: "Ready for Development", value: 0 },
  ]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [totalTasks, setTotalTasks] = useState(0);

  useEffect(() => {
    try {
      const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      const statusCount = statusMapping.map((status) => ({
        name: status,
        value: tasks.filter((t) => t.status === status).length,
      }));
      setData(statusCount);
      setTotalTasks(tasks.length);
      setIsLoading(false);
    } catch {
      setData([
        { name: "Closed", value: 0 },
        { name: "In Progress", value: 0 },
        { name: "Ready for test", value: 0 },
        { name: "Ready for Development", value: 0 },
      ]);
      setIsLoading(false);
    }
  }, []);

  // Custom Tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      const percentage = totalTasks > 0 ? ((data.value / totalTasks) * 100).toFixed(1) : 0;
      
      return (
        <div className="bg-[var(--card-bg)] border-2 border-[var(--border)] rounded-xl shadow-2xl p-4 backdrop-blur-lg">
          <div className="flex items-center gap-2 mb-2">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: COLORS[data.name].main }}
            ></div>
            <p className="text-sm font-bold text-[var(--text)]">
              {data.name}
            </p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs text-[var(--muted)]">Tasks:</span>
              <span className="text-lg font-bold" style={{ color: COLORS[data.name].main }}>
                {data.value}
              </span>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs text-[var(--muted)]">Percentage:</span>
              <span className="text-sm font-semibold" style={{ color: COLORS[data.name].main }}>
                {percentage}%
              </span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  // Custom Legend
  const CustomLegend = ({ payload }) => {
    return (
      <div className="grid grid-cols-2 gap-3 mt-6 px-4">
        {payload.map((entry, index) => {
          const statusData = data.find(d => d.name === entry.value);
          const percentage = totalTasks > 0 ? ((statusData.value / totalTasks) * 100).toFixed(0) : 0;
          
          return (
            <div
              key={index}
              className="group flex items-center gap-2 p-2.5 rounded-lg bg-[var(--card-bg)] border border-[var(--border)] hover:border-[var(--primary)]/30 transition-all duration-300 cursor-pointer hover:shadow-md"
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              <div
                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  activeIndex === index ? 'scale-125 shadow-lg' : ''
                }`}
                style={{ 
                  backgroundColor: COLORS[entry.value].main,
                  boxShadow: activeIndex === index ? `0 0 12px ${COLORS[entry.value].main}` : 'none'
                }}
              ></div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-[var(--text)] truncate group-hover:text-[var(--primary)] transition-colors duration-300">
                  {entry.value}
                </p>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold" style={{ color: COLORS[entry.value].main }}>
                    {statusData.value}
                  </span>
                  <span className="text-xs text-[var(--muted)]">
                    ({percentage}%)
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  // Custom Label
  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    if (percent === 0) return null;
    
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        className="font-bold text-sm"
        style={{ 
          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))',
          pointerEvents: 'none'
        }}
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[400px] space-y-4">
        <div className="w-14 h-14 border-4 border-[var(--primary)]/20 border-t-[var(--primary)] rounded-full animate-spin"></div>
        <p className="text-sm text-[var(--muted)] animate-pulse">Loading status data...</p>
      </div>
    );
  }

  return (
    <div className="space-y-5 animate-fadeIn">
      {/* Stats Header */}
      <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-[var(--primary)]/10 via-[var(--primary)]/5 to-transparent border border-[var(--border)]">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-[var(--muted)] mb-1">
            Total Tasks
          </p>
          <p className="text-3xl font-bold text-[var(--text)]">
            {totalTasks}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-xs font-medium text-[var(--primary)]">Live Status</span>
        </div>
      </div>

      {/* Chart Container */}
      <div className="relative p-5 rounded-2xl bg-gradient-to-br from-[var(--card-bg)] to-[var(--bg)] border border-[var(--border)] shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-[var(--text)] mb-1">
              Task Status Distribution
            </h3>
            <p className="text-xs text-[var(--muted)]">
              Overview of all tasks by current status
            </p>
          </div>
        </div>

        {/* Chart */}
        <div className="relative">
          {/* Center Label */}
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none z-10">
            <p className="text-xs font-semibold text-[var(--muted)] uppercase tracking-wider mb-1">
              Status
            </p>
            <p className="text-2xl font-bold text-[var(--text)]">
              {totalTasks}
            </p>
            <p className="text-xs text-[var(--muted)]">
              Total
            </p>
          </div>

          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <defs>
                {statusMapping.map((status, index) => (
                  <linearGradient key={status} id={`gradient-${index}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={COLORS[status].main} stopOpacity={1} />
                    <stop offset="100%" stopColor={COLORS[status].light} stopOpacity={0.8} />
                  </linearGradient>
                ))}
              </defs>
              
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={110}
                paddingAngle={3}
                dataKey="value"
                label={renderCustomLabel}
                labelLine={false}
                animationBegin={0}
                animationDuration={1500}
                animationEasing="ease-out"
                onMouseEnter={(_, index) => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={`url(#gradient-${index})`}
                    stroke="var(--card-bg)"
                    strokeWidth={3}
                    style={{
                      filter: activeIndex === index ? `drop-shadow(0 0 12px ${COLORS[entry.name].main})` : 'none',
                      transform: activeIndex === index ? 'scale(1.05)' : 'scale(1)',
                      transformOrigin: 'center',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer'
                    }}
                  />
                ))}
              </Pie>

              <Tooltip content={<CustomTooltip />} />
              <Legend content={<CustomLegend />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-4 gap-2 mt-4 pt-4 border-t border-[var(--border)]">
          {data.map((item, index) => {
            const percentage = totalTasks > 0 ? ((item.value / totalTasks) * 100).toFixed(0) : 0;
            return (
              <div
                key={item.name}
                className="text-center p-2 rounded-lg hover:bg-[var(--primary)]/5 transition-all duration-300 cursor-pointer group"
              >
                <div
                  className="w-8 h-2 mx-auto mb-1 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: `${COLORS[item.name].main}20` }}
                >
                  <span className="text-xs font-bold" style={{ color: COLORS[item.name].main }}>
                    {percentage}%
                  </span>
                </div>
                <p className="text-xs font-semibold text-[var(--text)] truncate">
                  {item.value}
                </p>
              </div>
            );
          })}
        </div>

        {/* Decorative Elements */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-green-500/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full blur-3xl"></div>
      </div>

      {/* Status Info Cards */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 rounded-xl bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-500/20">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <p className="text-xs font-semibold text-green-600 dark:text-green-400">
              Completed Tasks
            </p>
          </div>
          <p className="text-2xl font-bold text-[var(--text)]">
            {data.find(d => d.name === "Closed")?.value || 0}
          </p>
        </div>

        <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
            <p className="text-xs font-semibold text-blue-600 dark:text-blue-400">
              Active Tasks
            </p>
          </div>
          <p className="text-2xl font-bold text-[var(--text)]">
            {data.find(d => d.name === "In Progress")?.value || 0}
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default TasksStatusChart;