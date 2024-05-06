import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTaskWithImage } from "../redux/todoSlice";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";

const TaskInput = () => {
  const [taskText, setTaskText] = useState("");
  const [priority, setPriority] = useState("low");
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.todo.isLoading);
  const error = useSelector((state) => state.todo.error);

  const handleInputChange = (e) => {
    setTaskText(e.target.value);
  };

  const handlePriorityChange = (e) => {
    setPriority(e.target.value);
  };

  const handleAddTask = async () => {
    if (taskText.trim().length === 0) {
      toast.error("Please enter a task", {
        duration: 3000,
        position: "top-right",
        style: {
          borderRadius: "10px",
        },
      });
      return;
    }
    if (taskText.trim()) {
      dispatch(addTaskWithImage({ text: taskText, priority }));
      setTaskText("");
      setPriority("low");

      if (error) {
        toast.error(error, {
          duration: 3000,
          position: "top-right",
          style: {
            borderRadius: "10px",
          },
        });
      } else {
        toast.success("Task added successfully", {
          duration: 3000,
          position: "top-right",
          style: {
            borderRadius: "10px",
          },
        });
      }
    }
  };

  return (
    <form
      className="flex justify-center items-center flex-wrap gap-2"
      onSubmit={handleAddTask}
    >
      <div>
        <input
          id="task"
          name="task"
          value={taskText}
          onChange={handleInputChange}
          type="text"
          required
          className="block w-full rounded-md border-0 py-1.5 text-green-950 text-md shadow-md ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 outline-none sm:text-md sm:leading-6 px-2 h-10"
          placeholder="Enter a new task"
        />
      </div>
      <select
  value={priority}
  onChange={handlePriorityChange}
  className="mx-2 px-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-green-500 text-md text-gray-900 bg-white hover:border-gray-400 focus:border-green-500"
>
  <option value="low" className="text-red-700">Low</option>
  <option value="medium" className="text-yellow-700">Medium</option>
  <option value="high" className="text-green-700">High</option>
</select>
      <button
        onClick={handleAddTask}
        disabled={isLoading}
        className={`flex w-[120px] justify-center items-center rounded-md bg-green-600 px-3 py-1.5 text-lg leading-6 text-white font-semibold duration-150 hover:bg-green-700 hover:text-white hover:shadow-md hover:scale-[102%] active:scale-[98%] h-10 ${
          isLoading ? "cursor-not-allowed opacity-50" : ""
        }`}
      >
        {isLoading ? <ClipLoader size={20} color="white"/> : "+ Add Task"}
      </button>
      {error && <p className="ml-4 text-red-500">{error}</p>}
    </form>
  );
};

export default TaskInput;
