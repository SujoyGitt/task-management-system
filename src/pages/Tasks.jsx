import React, { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import TaskForm from "../components/TaskForm/task-form";
import SearchTask from "../components/Search/SearchTask";
import TaskColumn from "../components/TaskColumn/task-column";
import closeIcon from "../assets/delete-icon.png";
import { useTasks } from "../context/TaskContext";

const Tasks = ({ tasksdata, setTasks }) => {
  const [searchText, setSearchText] = useState("");
  const [activeTag, setActiveTag] = useState("ALL");
  const [ActiveCard, setActiveCard] = useState(null);
  const { tasks, deleteTask, updateTask, moveTask } = useTasks();

  // search functionlity start here
  const filteredTasks = tasksdata.filter((task) => {
    const matchesSearch = task.task
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const matchesTag = activeTag === "ALL" || task.tags.includes(activeTag);
    return matchesSearch && matchesTag;
  });

  // delete functionali start here
  const handleDelete = (id) => {
    const updateTasks = tasksdata.filter((task) => task.id !== id);
    setTasks(updateTasks);
    localStorage.setItem("tasks", JSON.stringify(updateTasks));
  };


  // edit functionality start here
  const handleEdit = (id, updatedTask) => {
    const updateTasks = tasksdata.map((task) =>
      task.id === id ? { ...task, task: updatedTask } : task,
    );
    setTasks(updateTasks);
    localStorage.setItem("tasks", JSON.stringify(updateTasks));
  };
  // drag and drop functionality start here
  const onDrop = (status, index) => {
    if (ActiveCard === null || activeTag === undefined) return;
    const taskToMove = tasksdata[ActiveCard];
    const updatedTasks = tasksdata.filter((_, index) => index !== ActiveCard);
    updatedTasks.splice(index, 0, { ...taskToMove, status });
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setActiveCard(null);
  };

  return (
    <DashboardLayout>
      <h2 className="text-xl font-semibold mb-6">Tasks</h2>
      <TaskForm tasks={tasksdata} setTasks={setTasks} />
      <SearchTask
        searchText={searchText}
        setSearchText={setSearchText}
        setActiveTag={setActiveTag}
        activeTag={activeTag}
      />

      {tasksdata && tasksdata.length === 0 ? (
        <div className="empty_state">
          <div className="empty_icon">📋</div>
          <h2>No tasks yet</h2>
          <p>
            Your board is empty. Start by creating a new task to track progress.
          </p>
        </div>
      ) : (
        <main
          className="app_main grid gap-4 py-4  sm:grid-cols-2  lg:grid-cols-4  bg-(--bg)"
        >
          <TaskColumn
            title="Ready for Development"
            tasks={filteredTasks}
            status="Ready for Development"
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            setActiveCard={setActiveCard}
            onDrop={onDrop}
          />

          <TaskColumn
            title="In Progress"
            tasks={filteredTasks}
            status="In Progress"
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            setActiveCard={setActiveCard}
            onDrop={onDrop}
          />

          <TaskColumn
            title="Ready for test"
            tasks={filteredTasks}
            status="Ready for test"
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            setActiveCard={setActiveCard}
            onDrop={onDrop}
          />

          <TaskColumn
            title="Closed"
            icon={closeIcon}
            tasks={filteredTasks}
            status="Closed"
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            setActiveCard={setActiveCard}
            onDrop={onDrop}
          />
        </main>
      )}
    </DashboardLayout>
  );
};

export default Tasks;
