import { createContext, useContext, useEffect, useReducer } from "react";

const TaskContext = createContext();

const getInitialTasks = () => {
  try {
    const data = JSON.parse(localStorage.getItem("tasks"));
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TASK":
      return [...state, action.payload];

    case "UPDATE_TASK":
      return state.map((task) =>
        task.id === action.payload.id ? action.payload : task
      );

    case "DELETE_TASK":
      return state.filter((task) => task.id !== action.payload);

    case "MOVE_TASK":
      return state.map((task) =>
        task.id === action.payload.id
          ? { ...task, status: action.payload.status }
          : task
      );

    default:
      return state;
  }
};

export const TaskProvider = ({ children }) => {
  const [tasks, dispatch] = useReducer(reducer, [], getInitialTasks);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    dispatch({ type: "ADD_TASK", payload: task });
  };

  const updateTask = (task) => {
    dispatch({ type: "UPDATE_TASK", payload: task });
  };

  const deleteTask = (id) => {
    dispatch({ type: "DELETE_TASK", payload: id });
  };

  const moveTask = (id, status) => {
    dispatch({
      type: "MOVE_TASK",
      payload: { id, status },
    });
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        updateTask,
        deleteTask,
        moveTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);
