import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiFolder,
  FiCheckSquare,
  FiUser,
  FiX,
  FiLogOut
} from "react-icons/fi";


const navItems = [
  { name: "Dashboard", path: "/", icon: <FiHome /> },
  { name: "Tasks", path: "/tasks", icon: <FiCheckSquare /> },
  { name: "Projects", path: "/projects", icon: <FiFolder /> },
  { name: "Profile", path: "/profile", icon: <FiUser /> },
  { name: "Logout", path: "", icon: <FiLogOut /> },
];

const Sidebar = ({ isOpen, onClose,logout }) => {
  return (
    <>
      {isOpen && (
        <div onClick={onClose}  className="fixed inset-0 bg-black/40 z-20 md:hidden"  /> )}

      <aside
        className={`fixed md:static z-30
          top-0 left-0 h-screen w-64
          bg-(--card-bg) border-r border-(--border)
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
       {/* Header */}
        <div className="flex lg:hidden items-center justify-between px-6 py-4 border-b border-(--border)">
          <span className="font-bold text-lg">📋 TaskManager</span>
          <button onClick={onClose} className="md:hidden">
            <FiX size={20} />
          </button>
        </div>

        {/* Nav */}
        <nav className="px-4 py-6 space-y-2">
          {navItems.map((item) =>
            item.name === "Logout" ? (
              <button
                key={item.name}
                onClick={() => {
                  logout();
                  onClose();
                }}
                className="flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium text-(--text-muted) hover:bg-(--primary)/10 hover:text-(--primary) transition-all"
              >
                <span className="text-lg">{item.icon}</span>
                {item.name}
              </button>
            ) : (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `
                  flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium
                  transition-all
                  ${
                    isActive
                      ? "bg-(--primary)/10 text-(--primary)"
                      : "text-(--text-muted) hover:bg-(--primary)/10 hover:text-(--primary)"
                  }
                `
                }
              >
                <span className="text-lg">{item.icon}</span>
                {item.name}
              </NavLink>
            )
          )}

        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
