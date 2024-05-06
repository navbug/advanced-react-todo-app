import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteTask, prioritizeTask } from "../redux/todoSlice";
import { FaTrash } from "react-icons/fa6";
import {
  FcHighPriority,
  FcMediumPriority,
  FcLowPriority,
} from "react-icons/fc";
import toast from "react-hot-toast";

const TaskList = () => {
  const tasks = useSelector((state) => state.todo.tasks);
  const dispatch = useDispatch();

  const handleDeleteTask = (id) => {
    dispatch(deleteTask(id));

    toast.success("Task deleted successfully", {
      icon: <FaTrash color="red" />,
      duration: 3000,
      position: "top-right",
      style: {
        borderRadius: "10px",
      },
    });
  };

  const handlePrioritizeTask = (id, priority) => {
    dispatch(prioritizeTask({ id, priority }));

    toast.success("Priority changed", {
      duration: 3000,
      position: "top-right",
      style: {
        borderRadius: "10px",
      },
    });
  };

  const sortedTasks = tasks.slice().sort((a, b) => {
    const priorityOrder = { high: 1, medium: 2, low: 3 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  const highPriorityTasks = sortedTasks.filter(
    (task) => task.priority === "high"
  );
  const mediumPriorityTasks = sortedTasks.filter(
    (task) => task.priority === "medium"
  );
  const lowPriorityTasks = sortedTasks.filter(
    (task) => task.priority === "low"
  );

  return (
    <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
      <div className="mb-4">
        <h2 className="text-lg font-bold mb-2 text-red-500 flex justify-start items-center gap-2">
          <FcHighPriority /> High Priority
        </h2>
        <ul>
          {highPriorityTasks.length === 0 ? (
            <p className="text-gray-500">No high priority tasks.</p>
          ) : (
            highPriorityTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onDelete={handleDeleteTask}
                onPrioritize={handlePrioritizeTask}
                excludePriority="high"
              />
            ))
          )}
        </ul>
      </div>
      <div className="mb-4">
        <h2 className="text-lg font-bold mb-2 text-yellow-500 flex justify-start items-center gap-2">
          <FcMediumPriority /> Medium Priority
        </h2>
        <ul>
          {mediumPriorityTasks.length === 0 ? (
            <p className="text-gray-500">No medium priority tasks.</p>
          ) : (
            mediumPriorityTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onDelete={handleDeleteTask}
                onPrioritize={handlePrioritizeTask}
                excludePriority="medium"
              />
            ))
          )}
        </ul>
      </div>
      <div className="mb-4">
        <h2 className="text-lg font-bold mb-2 text-green-500 flex justify-start items-center gap-2">
          <FcLowPriority /> Low Priority
        </h2>
        <ul>
          {lowPriorityTasks.length === 0 ? (
            <p className="text-gray-500">No low priority tasks.</p>
          ) : (
            lowPriorityTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onDelete={handleDeleteTask}
                onPrioritize={handlePrioritizeTask}
                excludePriority="low"
              />
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

const TaskItem = ({ task, onDelete, onPrioritize, excludePriority }) => (
  <li className="flex flex-col justify-start py-2 px-4 bg-green-200 rounded-md mb-4 shadow-md">
    <div className="flex items-stretch mb-2 ">
      {task.imageUrl && (
        <img
          src={task.imageUrl}
          alt="Task"
          className="min-w-40 w-auto h-28 object-cover rounded-md mr-4"
        />
      )}
      <div className="flex flex-col justify-between w-full ">
        <span
          className={`text-lg md:text-lg font-semibold ${
            task.priority === "high"
              ? "text-red-500"
              : task.priority === "medium"
              ? "text-yellow-500"
              : "text-green-500"
          }`}
        >
          {task.text}
        </span>
        <div className="w-full flex items-center justify-between">
          <div className="flex justify-center gap-2">
            {excludePriority !== "high" && (
              <button
                onClick={() => onPrioritize(task.id, "high")}
                className="px-2 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 mr-2"
              >
                <FcHighPriority />
              </button>
            )}
            {excludePriority !== "medium" && (
              <button
                onClick={() => onPrioritize(task.id, "medium")}
                className="px-2 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 mr-2"
              >
                <FcMediumPriority />
              </button>
            )}
            {excludePriority !== "low" && (
              <button
                onClick={() => onPrioritize(task.id, "low")}
                className="px-2 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 mr-2"
              >
                <FcLowPriority />
              </button>
            )}
          </div>
          <button
            onClick={() => onDelete(task.id)}
            className="px-2 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  </li>
);

export default TaskList;