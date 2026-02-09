import React, { useReducer, useState } from "react";
import Tag from "../Tag/Tag";
import { Reducer } from "../../store/Reducer";
import { tagNameMap } from "../../constant/common";
import { useTasks } from "../../context/TaskContext";

const initialState = {
  id: Date.now(),
  task: "",
  status: "Ready for Development",
  tags: [],
};

const TaskForm = ({ tasks, setTasks }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  const getInitialTasks = () => {
    try {
      const data = localStorage.getItem("tasks");
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  };
  const [Tasks, setTask] = useState(() => getInitialTasks());

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!state.task || !state.status || state.tags.length === 0) {
      alert("Please fill all Required fields");
      return;
    }

    const newData = {
      id: state.id,
      task: state.task,                                           
      status: state.status,
      tags: state.tags,
    };

    const updatedTasks = [...Tasks, newData];
    console.log(updatedTasks)
    setTask(updatedTasks);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    dispatch({ type: "RESET" });
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({
      type: "FIELD_CHANGE",
      fieldName: name,
      value: value,
    });
  };

  const selectedTag = (tag) => {
    dispatch({ type: "SELECT_TAG", payload: tag });
  };

  const checkTag = (tag) => {
    return state.tags.some((item) => item === tag);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-(--card-bg) border border-(--border)    rounded-xl p-6 space-y-4 shadow-sm"
    >
      <input
        type="text"
        name="task"
        value={state.task}
        placeholder="Enter task details"
        onChange={handleChange}
        className="w-full rounded-lg border border-[var(--border)]  bg-transparent px-4 py-2 text-[var(--text)] placeholder-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] "
      />

      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex gap-2 flex-wrap">
          <Tag
            tagName={"DEV"}
            selectedTag={selectedTag}
            selected={checkTag("DEV")}
          />
          <Tag
            tagName={"QA"}
            selectedTag={selectedTag}
            selected={checkTag("QA")}
          />
          <Tag
            tagName="Product Owner"
            selectedTag={selectedTag}
            selected={checkTag(tagNameMap["Product Owner"])}
          />
        </div>

        <select
          name="status"
          value={state.status}
          onChange={handleChange}
          className="ml-auto rounded-lg border border-[var(--border)]
                 bg-transparent px-3 py-2 text-[var(--text)]
                 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
        >
          <option>Ready For Development</option>
          <option>In Progress</option>
          <option>Ready for test</option>
          <option>Closed</option>
        </select>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full rounded-lg bg-[var(--primary)] 
               text-[var(--bg)] font-medium py-2
               hover:opacity-90 transition"
      >
        + Add
      </button>
    </form>
  );
};

export default TaskForm;
