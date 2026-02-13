import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiFolder,
  FiCheckSquare,
  FiUser,
  FiX,
  FiLogOut,
  FiSettings,
  FiStar,
  FiTrendingUp,
} from "react-icons/fi";
import { useState } from "react";

const navItems = [
  { name: "Dashboard", path: "/", icon: <FiHome />, badge: null },
  { name: "Tasks", path: "/tasks", icon: <FiCheckSquare />, badge: "" },
  { name: "Projects", path: "/projects", icon: <FiFolder />, badge: "" },
  { name: "Profile", path: "/profile", icon: <FiUser />, badge: null },
];

const quickLinks = [
  { name: "Favorites", icon: <FiStar />, count: "8" },
  { name: "Analytics", icon: <FiTrendingUp />, count: null },
  { name: "Settings", icon: <FiSettings />, count: null },
];

const Sidebar = ({ isOpen, onClose, logout }) => {
  const [hoveredItem, setHoveredItem] = useState(null);

  return (
    <>
      {/* Backdrop with blur */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-20 md:hidden animate-fadeIn"
        />
      )}

      <aside
        className={`fixed md:static z-30
          top-0 left-0 h-screen w-72
          bg-[var(--card-bg)] border-r border-[var(--border)]
          transform transition-all duration-300 ease-out
          shadow-2xl md:shadow-none
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* Header */}
        <div className="flex lg:hidden items-center justify-between px-6 py-5 border-b border-[var(--border)] bg-gradient-to-r from-[var(--primary)]/5 to-transparent">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--primary)]/70 text-[var(--bg)] flex items-center justify-center font-bold shadow-lg">
              <span className="text-base">TM</span>
            </div>
            <span className="font-bold text-lg text-[var(--text)]">
              TaskManager
            </span>
          </div>
          <button
            onClick={onClose}
            className="md:hidden p-2 rounded-lg hover:bg-[var(--primary)]/10 transition-all duration-300 transform hover:scale-110 active:scale-95"
          >
            <FiX size={20} className="text-[var(--text)]" />
          </button>
        </div>

        {/* User Section */}
        <div className="px-4 py-5 border-b border-[var(--border)]">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-br from-[var(--primary)]/10 to-transparent hover:from-[var(--primary)]/15 transition-all duration-300 cursor-pointer group">
            <div className="relative">
              <img
                src="https://i.pravatar.cc/40"
                alt="profile"
                className="w-12 h-12 rounded-xl ring-2 ring-[var(--primary)]/30 group-hover:ring-[var(--primary)]/60 transition-all duration-300"
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-[var(--card-bg)]"></div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-[var(--text)] truncate">
                Welcome back! 👋
              </p>
              <p className="text-xs text-[var(--muted)]">Let's be productive</p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
          {/* Main Navigation */}
          <nav className="space-y-1">
            <p className="text-xs font-bold uppercase tracking-wider text-[var(--muted)] px-4 mb-3">
              Main Menu
            </p>
            {navItems.map((item, index) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={onClose}
                onMouseEnter={() => setHoveredItem(item.name)}
                onMouseLeave={() => setHoveredItem(null)}
                className={({ isActive }) =>
                  `relative flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium
                  transition-all duration-300 group overflow-hidden
                  ${
                    isActive
                      ? "bg-gradient-to-r from-[var(--primary)] to-[var(--primary)]/80 text-[var(--bg)] shadow-lg shadow-[var(--primary)]/20"
                      : "text-[var(--muted)] hover:text-[var(--primary)] hover:bg-[var(--primary)]/10"
                  }
                `
                }
              >
                {({ isActive }) => (
                  <>
                    {/* Animated background on hover */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-r from-[var(--primary)]/5 to-transparent transform transition-transform duration-300 ${
                        hoveredItem === item.name && !isActive
                          ? "translate-x-0"
                          : "-translate-x-full"
                      }`}
                    ></div>

                    <span
                      className={`relative text-lg transition-transform duration-300 ${
                        isActive
                          ? "scale-110"
                          : "group-hover:scale-110 group-hover:rotate-6"
                      }`}
                    >
                      {item.icon}
                    </span>
                    <span className="relative flex-1">{item.name}</span>

                    {/* Badge */}
                    {item.badge && (
                      <span
                        className={`relative px-2 py-0.5 rounded-full text-xs font-bold transition-all duration-300 ${
                          isActive
                            ? "bg-[var(--bg)]/20 text-[var(--bg)]"
                            : "bg-[var(--primary)]/10 text-[var(--primary)]"
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}

                    {/* Active indicator */}
                    {isActive && (
                      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-[var(--bg)] rounded-r-full"></div>
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Progress Card */}
          <div className="mt-4 mx-2 p-4 rounded-xl bg-gradient-to-br from-[var(--primary)]/10 via-[var(--primary)]/5 to-transparent border border-[var(--border)]">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-bold text-[var(--text)]">
                Daily Progress
              </p>
              <span className="text-xs font-bold text-[var(--primary)]">
                75%
              </span>
            </div>
            <div className="w-full h-2 bg-[var(--border)] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[var(--primary)] to-[var(--primary)]/70 rounded-full transition-all duration-500 relative"
                style={{ width: "75%" }}
              >
                <div className="absolute inset-0 bg-white/20 animate-shimmer"></div>
              </div>
            </div>

          </div>
        </div>

        {/* Logout Button */}
        <div className="px-4 py-4 border-t border-[var(--border)] bg-gradient-to-t from-[var(--bg)]/50 to-transparent">
          <button
            onClick={() => {
              logout();
              onClose();
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-[var(--muted)] hover:text-red-500 hover:bg-red-500/10 transition-all duration-300 group border border-transparent hover:border-red-500/20"
          >
            <span className="text-lg group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-300">
              <FiLogOut />
            </span>
            <span>Logout</span>
            <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </div>
          </button>

          {/* Footer */}
          <div className="mt-3 text-center">
            <p className="text-xs text-[var(--muted)]">
              Version 2.0.1
            </p>
          </div>
        </div>

        <style jsx>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          @keyframes shimmer {
            0% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(100%);
            }
          }

          .animate-fadeIn {
            animation: fadeIn 0.2s ease-out;
          }

          .animate-shimmer {
            animation: shimmer 2s infinite;
          }

          /* Custom Scrollbar */
          aside::-webkit-scrollbar {
            width: 4px;
          }

          aside::-webkit-scrollbar-track {
            background: transparent;
          }

          aside::-webkit-scrollbar-thumb {
            background: var(--border);
            border-radius: 4px;
          }

          aside::-webkit-scrollbar-thumb:hover {
            background: var(--primary);
          }
        `}</style>
      </aside>
    </>
  );
};

export default Sidebar;