import React from "react";
import TaskInput from "./TaskInput";
import TaskList from "./TaskList";

const Home = () => {
  return (
    <div>
      <TaskInput />
      <div className="w-full h-[2px] bg-slate-400 my-6"></div>
      <TaskList />
    </div>
  );
};

export default Home;
