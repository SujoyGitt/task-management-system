import { BrowserRouter, HashRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import { ContextProvider } from "./context/AuthContext";
import { useEffect, useState } from "react";
import Projects from "./pages/Projects";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import Profile from "./pages/Profile";
import { TaskProvider } from "./context/TaskContext";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const getInitialTasks = () => {
    try {
      const data = localStorage.getItem("tasks");
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Error retrieving tasks from localStorage:", error);
      return [];
    }
  };
  const [Tasksdata, setTasksdata] = useState(getInitialTasks);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <h3>Loading...</h3>;
  }
  return (
    <>
      <ContextProvider data={{ user, setUser }}>
       <TaskProvider>
        <HashRouter>
          <Routes>
            <Route path="/" element={user ? <Dashboard /> : <Navigate to="/login" />}/>
            <Route path="/login" element={user ? <Navigate to="/tasks" /> : <Login />}/>
            <Route path="/projects" element={user ? <Projects /> : <Navigate to="/login" />}/>
            <Route path="/tasks" element={user ? <Tasks tasksdata={Tasksdata} setTasks={setTasksdata} /> : <Navigate to="/login" />} />
            <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
          </Routes>
        </HashRouter>
        </TaskProvider>
      </ContextProvider>
    </>
  );
}

export default App;
