import { FiMenu } from "react-icons/fi";
import { useUserDetails } from "../context/AuthContext";
import Toggle from "./Toggle";

const Header = ({ onMenuClick }) => {
  const { user } = useUserDetails();

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-(--card-bg) border-b border-(--border) ">
      
      {/* Left */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="md:hidden text-xl"
        >
          <FiMenu />
        </button>

        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-(--primary) text-(--bg) flex items-center justify-center font-bold">
            TM
          </div>
          <span className="font-semibold hidden sm:block">
            TaskManager
          </span>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        <Toggle />

        {user && (
          <div className="flex items-center gap-2 cursor-pointer">
            <img
              src="https://i.pravatar.cc/40"
              alt="profile"
              className="w-9 h-9 rounded-full ring-2 ring-(--primary)/30"
            />
            <div className="hidden sm:block leading-tight">
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-xs text-(--text-muted)">
                {user.email}
              </p>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
