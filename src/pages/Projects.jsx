import React, { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import ProjectCard from "../components/project-card/ProjectCard";

const Projects = () => {
  const [tasks, setTasks] = useState([]);

  // Load tasks from localStorage
  useEffect(() => {
    try {
      const data = JSON.parse(localStorage.getItem("tasks"));
      setTasks(Array.isArray(data) ? data : []);
    } catch {
      setTasks([]);
    }
  }, []);

  return (
    <DashboardLayout>
      <h2 className="text-xl font-semibold mb-6">Projects (Tasks)</h2>

      {tasks.length === 0 ? (
        <div className="empty_state">
          <div className="empty_icon">📁</div>
          <h2>No tasks yet</h2>
          <p>Create a new task to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <ProjectCard
              key={task.id}
              title={task.task} // using the task as title
              description={`Tags: ${task.tags.join(", ")}`} // show tags as description
              deadline="N/A" // you don’t have a deadline in task, so N/A
              status={task.status} // task status
              issues={task.tags.length} // maybe number of tags as placeholder
              members={[]} // you don’t have members yet
            />
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default Projects;
