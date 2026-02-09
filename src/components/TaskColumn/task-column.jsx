import React from "react";
import TaskCard from "../TaskCard/task-card";
import DropArea from "../DropArea/DropArea";

const TaskColumn = ({
  icon,
  tasks,
  status,
  handleDelete,
  handleEdit,
  setActiveCard,
  onDrop,
}) => {
  const taskCount = tasks.filter((task) => task.status === status).length;

  return (
    <section
      className="
        flex flex-col rounded-xl
        bg-(--card-bg)
        border border-(--border)
        shadow-sm
      "
    >
      <h2
        className="
        flex items-center gap-2
        px-4 py-3
        text-sm font-semibold
        text-[var(--text)]
        border-b border-(--border)
      "
      >
        {icon && <img src={icon} alt="" className="h-4 w-4 opacity-70" />}
        {status}
        <span className="ml-auto text-xs text-[var(--muted)]">{taskCount}</span>
      </h2>

      <DropArea onDrop={() => onDrop(status, 0)} />

      <div className="flex flex-col px-4">
        {tasks.map(
          (data, index) =>
            data.status === status && (
              <React.Fragment key={data.id}>
                <TaskCard
                  id={data.id}
                  status={data.status}
                  tags={data.tags}
                  title={data.task}
                  handleDelete={handleDelete}
                  taskIndex={index}
                  setActiveCard={setActiveCard}
                  handleEdit={handleEdit}
                  selectedTags={data.tags} 
                />
                <DropArea onDrop={() => onDrop(status, index + 1)} />
              </React.Fragment>
            ),
        )}
      </div>
    </section>
  );
};

export default TaskColumn;
