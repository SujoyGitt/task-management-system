import { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import { useUserDetails } from "../context/AuthContext";

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { user, setUser } = useUserDetails();

  function logout() {
    localStorage.removeItem("user");
    setUser(null); 
    alert("Logged out successfully.");
    navigate("/login");
  }

  return (
    <div className="min-h-screen bg-var(--bg) text-(--text)">
      <Header onMenuClick={() => setSidebarOpen(true)}/>
      <div className="flex bg-(--bg)">
        <Sidebar isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)} logout={logout}/>
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;