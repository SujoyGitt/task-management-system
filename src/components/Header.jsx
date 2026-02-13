
import { FiMenu, FiBell, FiSearch } from "react-icons/fi";
import { useUserDetails } from "../context/AuthContext";
import Toggle from "./Toggle";
import { useState } from "react";

const Header = ({ onMenuClick }) => {
  const { user } = useUserDetails();
  const [showProfile, setShowProfile] = useState(false);

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-[var(--card-bg)]/80 backdrop-blur-xl border-b border-[var(--border)] shadow-sm">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="md:hidden text-xl text-[var(--text)] hover:text-[var(--primary)] transition-all duration-300 transform hover:scale-110 active:scale-95 p-2 rounded-lg hover:bg-[var(--primary)]/10"
        >
          <FiMenu />
        </button>

        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--primary)]/70 text-[var(--bg)] flex items-center justify-center font-bold shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
            <span className="relative z-10">TM</span>
            <div className="absolute inset-0 rounded-xl bg-[var(--primary)] opacity-50 blur-md group-hover:blur-lg transition-all duration-300"></div>
          </div>
          
          <div className="hidden sm:flex flex-col">
            <span className="font-bold text-base text-[var(--text)] tracking-tight group-hover:text-[var(--primary)] transition-colors duration-300">
              TaskManager
            </span>
            <span className="text-xs text-[var(--muted)] font-medium">
              Productivity Hub
            </span>
          </div>
        </div>
      </div>


      <div className="flex items-center gap-3">
        <div className="relative">
          <button className="p-2.5 rounded-xl hover:bg-[var(--primary)]/10 transition-all duration-300 transform hover:scale-110 active:scale-95 relative group">
            <FiBell className="text-xl text-[var(--text)] group-hover:text-[var(--primary)] transition-colors duration-300" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
          </button>
        </div>

        <div className="hidden sm:block">
          <Toggle />
        </div>

        {user && (
          <div className="relative">
            <div
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center gap-3 cursor-pointer p-2 pr-3 rounded-xl hover:bg-[var(--primary)]/10 transition-all duration-300 group"
            >
              <div className="relative">
                <img
                  src="https://i.pravatar.cc/40"
                  alt="profile"
                  className="w-10 h-10 rounded-xl ring-2 ring-[var(--primary)]/30 group-hover:ring-[var(--primary)]/60 transition-all duration-300 transform group-hover:scale-105"
                />
                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-[var(--card-bg)]"></div>
              </div>
              
              <div className="hidden md:block leading-tight">
                <p className="text-sm font-semibold text-[var(--text)] group-hover:text-[var(--primary)] transition-colors duration-300">
                  {user.name}
                </p>
                <p className="text-xs text-[var(--muted)]">
                  {user.email}
                </p>
              </div>

            </div>

          </div>
        )}

        {/* Mobile Theme Toggle */}
        <div className="sm:hidden">
          <Toggle />
        </div>
      </div>

      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slideDown {
          animation: slideDown 0.2s ease-out;
        }
      `}</style>
    </header>
  );
};

export default Header;