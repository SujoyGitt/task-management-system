import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
  Area,
  AreaChart,
} from "recharts";

const months = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const PerformanceChart = () => {
  const [data, setData] = useState([]);
  const [stats, setStats] = useState({ totalAchieved: 0, totalTarget: 0, completion: 0 });
  const [isLoading, setIsLoading] = useState(true);

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

      // Calculate overall stats
      const totalAchieved = monthlyStats.reduce((sum, m) => sum + m.achieved, 0);
      const totalTarget = monthlyStats.reduce((sum, m) => sum + m.target, 0);
      const completion = totalTarget > 0 ? Math.round((totalAchieved / totalTarget) * 100) : 0;

      setStats({ totalAchieved, totalTarget, completion });
      setIsLoading(false);
    } catch {
      setData([]);
      setIsLoading(false);
    }
  }, []);

  // Custom Tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[var(--card-bg)] border-2 border-[var(--border)] rounded-xl shadow-2xl p-4 backdrop-blur-lg">
          <p className="text-sm font-bold text-[var(--text)] mb-2">
            {payload[0].payload.month}
          </p>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-orange-500 to-orange-600"></div>
              <span className="text-xs text-[var(--muted)]">Achieved:</span>
              <span className="text-sm font-bold text-orange-500">
                {payload[0].value}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-600"></div>
              <span className="text-xs text-[var(--muted)]">Target:</span>
              <span className="text-sm font-bold text-indigo-500">
                {payload[1].value}
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
      <div className="flex items-center justify-center gap-6 mt-4">
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2 group cursor-pointer">
            <div
              className={`w-4 h-4 rounded-full transition-transform duration-300 group-hover:scale-125 ${
                entry.value === "achieved"
                  ? "bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg shadow-orange-500/30"
                  : "bg-gradient-to-r from-indigo-500 to-indigo-600 shadow-lg shadow-indigo-500/30"
              }`}
            ></div>
            <span className="text-sm font-medium text-[var(--text)] capitalize group-hover:text-[var(--primary)] transition-colors duration-300">
              {entry.value}
            </span>
          </div>
        ))}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="relative">
        <div className="flex flex-col items-center justify-center h-[400px] space-y-4">
          <div className="w-16 h-16 border-4 border-[var(--primary)]/20 border-t-[var(--primary)] rounded-full animate-spin"></div>
          <p className="text-sm text-[var(--muted)] animate-pulse">Loading chart data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="group p-4 rounded-xl bg-gradient-to-br from-orange-500/10 to-orange-600/5 border border-orange-500/20 hover:border-orange-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/10 cursor-pointer">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-bold uppercase tracking-wider text-orange-500/80">
              Achieved
            </p>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <p className="text-3xl font-bold text-[var(--text)] group-hover:scale-105 transition-transform duration-300">
            {stats.totalAchieved}
          </p>
          <p className="text-xs text-[var(--muted)] mt-1">tasks completed</p>
        </div>

        <div className="group p-4 rounded-xl bg-gradient-to-br from-indigo-500/10 to-indigo-600/5 border border-indigo-500/20 hover:border-indigo-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10 cursor-pointer">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-bold uppercase tracking-wider text-indigo-500/80">
              Target
            </p>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
          <p className="text-3xl font-bold text-[var(--text)] group-hover:scale-105 transition-transform duration-300">
            {stats.totalTarget}
          </p>
          <p className="text-xs text-[var(--muted)] mt-1">total goals</p>
        </div>

        <div className="group p-4 rounded-xl bg-gradient-to-br from-[var(--primary)]/10 to-[var(--primary)]/5 border border-[var(--primary)]/20 hover:border-[var(--primary)]/40 transition-all duration-300 hover:shadow-lg hover:shadow-[var(--primary)]/10 cursor-pointer">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-bold uppercase tracking-wider text-[var(--primary)]/80">
              Completion
            </p>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--primary)] to-[var(--primary)]/80 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 text-[var(--bg)]">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
          </div>
          <div className="flex items-baseline gap-1">
            <p className="text-3xl font-bold text-[var(--text)] group-hover:scale-105 transition-transform duration-300">
              {stats.completion}
            </p>
            <span className="text-lg font-semibold text-[var(--muted)]">%</span>
          </div>
          <p className="text-xs text-[var(--muted)] mt-1">success rate</p>
        </div>
      </div>

      {/* Chart Container */}
      <div className="relative p-6 rounded-2xl bg-gradient-to-br from-[var(--card-bg)] to-[var(--bg)] border border-[var(--border)] shadow-lg hover:shadow-xl transition-all duration-300">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-[var(--text)] mb-1">
              Performance Overview
            </h3>
            <p className="text-sm text-[var(--muted)]">
              Monthly achievement vs target tracking
            </p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--primary)]/10 border border-[var(--primary)]/20">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-xs font-medium text-[var(--primary)]">Live Data</span>
          </div>
        </div>

        {/* Chart */}
        <div className="relative">
          {/* Background Grid Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="w-full h-full" style={{
              backgroundImage: `linear-gradient(var(--border) 1px, transparent 1px),
                                linear-gradient(90deg, var(--border) 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }}></div>
          </div>

          <ResponsiveContainer width="100%" height={320}>
            <LineChart 
              data={data}
              margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
            >
              <defs>
                <linearGradient id="achievedGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="achievedStroke" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#f97316"/>
                  <stop offset="100%" stopColor="#fb923c"/>
                </linearGradient>
                <linearGradient id="targetStroke" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#6366f1"/>
                  <stop offset="100%" stopColor="#818cf8"/>
                </linearGradient>
              </defs>

              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="var(--border)" 
                opacity={0.3}
              />
              
              <XAxis 
                dataKey="month" 
                stroke="var(--muted)"
                style={{
                  fontSize: '12px',
                  fontWeight: '500',
                }}
                tick={{ fill: 'var(--muted)' }}
              />
              
              <YAxis 
                stroke="var(--muted)"
                style={{
                  fontSize: '12px',
                  fontWeight: '500',
                }}
                tick={{ fill: 'var(--muted)' }}
              />
              
              <Tooltip content={<CustomTooltip />} />
              <Legend content={<CustomLegend />} />

              {/* Achieved Line with Area */}
              <Area
                type="monotone"
                dataKey="achieved"
                stroke="none"
                fill="url(#achievedGradient)"
                animationDuration={1500}
              />
              <Line
                type="monotone"
                dataKey="achieved"
                stroke="url(#achievedStroke)"
                strokeWidth={3}
                dot={{ 
                  fill: '#f97316', 
                  strokeWidth: 2, 
                  r: 5,
                  stroke: 'var(--card-bg)'
                }}
                activeDot={{ 
                  r: 7, 
                  stroke: '#f97316',
                  strokeWidth: 3,
                  fill: '#f97316'
                }}
                animationDuration={1500}
              />

              {/* Target Line */}
              <Line
                type="monotone"
                dataKey="target"
                stroke="url(#targetStroke)"
                strokeWidth={3}
                strokeDasharray="8 4"
                dot={{ 
                  fill: '#6366f1', 
                  strokeWidth: 2, 
                  r: 5,
                  stroke: 'var(--card-bg)'
                }}
                activeDot={{ 
                  r: 7, 
                  stroke: '#6366f1',
                  strokeWidth: 3,
                  fill: '#6366f1'
                }}
                animationDuration={1500}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-orange-500/10 to-transparent rounded-full blur-2xl"></div>
        <div className="absolute bottom-4 left-4 w-24 h-24 bg-gradient-to-br from-indigo-500/10 to-transparent rounded-full blur-2xl"></div>
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

export default PerformanceChart;