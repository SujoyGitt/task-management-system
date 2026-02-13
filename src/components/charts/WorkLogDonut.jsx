
import React, { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const WorkLogChart = () => {
  const [data, setData] = useState([]);
  const [stats, setStats] = useState({ totalHours: 0, avgHours: 0, mostProductiveDay: "" });
  const [isLoading, setIsLoading] = useState(true);

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
      const workWeekData = dailyHours.slice(1, 6);
      setData(workWeekData);

      // Calculate stats
      const totalHours = workWeekData.reduce((sum, d) => sum + d.hours, 0);
      const avgHours = workWeekData.length > 0 ? (totalHours / workWeekData.length).toFixed(1) : 0;
      const mostProductive = workWeekData.reduce((max, d) => d.hours > max.hours ? d : max, { day: "N/A", hours: 0 });

      setStats({
        totalHours,
        avgHours,
        mostProductiveDay: mostProductive.day,
      });

      setIsLoading(false);
    } catch {
      setData([]);
      setIsLoading(false);
    }
  }, []);

  // Custom Tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const hours = payload[0].value;
      const day = payload[0].payload.day;
      
      return (
        <div className="bg-[var(--card-bg)] border-2 border-cyan-500/30 rounded-xl shadow-2xl p-4 backdrop-blur-lg">
          <p className="text-sm font-bold text-[var(--text)] mb-2">
            {day}
          </p>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-cyan-400 to-cyan-600"></div>
            <span className="text-xs text-[var(--muted)]">Work Hours:</span>
            <span className="text-lg font-bold text-cyan-500">
              {hours}h
            </span>
          </div>
          <div className="mt-2 pt-2 border-t border-[var(--border)]">
            <p className="text-xs text-[var(--muted)]">
              {hours === 0 ? "No tasks logged" : `${hours} task${hours !== 1 ? 's' : ''} completed`}
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[360px] space-y-4">
        <div className="w-14 h-14 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin"></div>
        <p className="text-sm text-[var(--muted)] animate-pulse">Loading work log...</p>
      </div>
    );
  }

  return (
    <div className="space-y-5 animate-fadeIn">
      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="group p-3.5 rounded-xl bg-gradient-to-br from-cyan-500/10 to-cyan-600/5 border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 cursor-pointer">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-xs font-semibold text-cyan-500/80 uppercase tracking-wider">
                Total Hours
              </p>
              <p className="text-2xl font-bold text-[var(--text)] group-hover:scale-105 transition-transform duration-300">
                {stats.totalHours}h
              </p>
            </div>
          </div>
        </div>

        <div className="group p-3.5 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 cursor-pointer">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-xs font-semibold text-blue-500/80 uppercase tracking-wider">
                Daily Avg
              </p>
              <p className="text-2xl font-bold text-[var(--text)] group-hover:scale-105 transition-transform duration-300">
                {stats.avgHours}h
              </p>
            </div>
          </div>
        </div>

        <div className="group p-3.5 rounded-xl bg-gradient-to-br from-indigo-500/10 to-indigo-600/5 border border-indigo-500/20 hover:border-indigo-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10 cursor-pointer">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-xs font-semibold text-indigo-500/80 uppercase tracking-wider">
                Best Day
              </p>
              <p className="text-xl font-bold text-[var(--text)] group-hover:scale-105 transition-transform duration-300">
                {stats.mostProductiveDay}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Chart Container */}
      <div className="relative p-5 rounded-2xl bg-gradient-to-br from-[var(--card-bg)] to-[var(--bg)] border border-[var(--border)] shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-base font-bold text-[var(--text)] mb-1 flex items-center gap-2">
              Weekly Work Log
              <span className="text-xs px-2 py-1 rounded-full bg-cyan-500/10 text-cyan-500 font-semibold border border-cyan-500/20">
                Mon - Fri
              </span>
            </h3>
            <p className="text-xs text-[var(--muted)]">
              Track your productivity across the work week
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></div>
            <span className="text-xs font-medium text-cyan-500">Active</span>
          </div>
        </div>

        {/* Chart */}
        <div className="relative">
          {/* Decorative gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5 rounded-xl"></div>
          
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart 
              data={data}
              margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4} />
                  <stop offset="50%" stopColor="#0891b2" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#0e7490" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="strokeGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="50%" stopColor="#0891b2" />
                  <stop offset="100%" stopColor="#0e7490" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>

              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="var(--border)" 
                opacity={0.2}
                vertical={false}
              />

              <XAxis 
                dataKey="day" 
                stroke="var(--muted)"
                style={{
                  fontSize: '11px',
                  fontWeight: '600',
                }}
                tick={{ fill: 'var(--muted)' }}
                tickLine={false}
                axisLine={{ stroke: 'var(--border)', strokeWidth: 1 }}
              />

              <YAxis 
                stroke="var(--muted)"
                style={{
                  fontSize: '11px',
                  fontWeight: '600',
                }}
                tick={{ fill: 'var(--muted)' }}
                tickLine={false}
                axisLine={{ stroke: 'var(--border)', strokeWidth: 1 }}
                label={{ 
                  value: 'Hours', 
                  angle: -90, 
                  position: 'insideLeft',
                  style: { 
                    fill: 'var(--muted)', 
                    fontSize: '11px',
                    fontWeight: '600'
                  }
                }}
              />

              <Tooltip content={<CustomTooltip />} />

              <Area
                type="monotone"
                dataKey="hours"
                stroke="url(#strokeGradient)"
                strokeWidth={3}
                fill="url(#colorHours)"
                dot={{ 
                  fill: '#06b6d4', 
                  strokeWidth: 3, 
                  r: 5,
                  stroke: 'var(--card-bg)',
                  filter: 'url(#glow)'
                }}
                activeDot={{ 
                  r: 8, 
                  stroke: '#06b6d4',
                  strokeWidth: 4,
                  fill: '#06b6d4',
                  filter: 'url(#glow)'
                }}
                animationDuration={1500}
                animationEasing="ease-in-out"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Info Badge */}
        <div className="mt-4 p-3 rounded-lg bg-gradient-to-r from-cyan-500/5 via-blue-500/5 to-indigo-500/5 border border-cyan-500/10">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-xs text-[var(--muted)]">
              Each task contributes <span className="font-semibold text-cyan-500">1 hour</span> to your daily work log
            </p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-cyan-500/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-transparent rounded-full blur-3xl"></div>
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

export default WorkLogChart;