import React from "react";
import { logout } from "../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { IoIosPaper } from "react-icons/io";

const Header = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("isAuthenticated");

    toast.success("Logged out successfully", {
      duration: 3000,
      position: "top-right",
      style: {
        borderRadius: "10px",
      },
    });
  };

  return (
    <header className="bg-green-500 py-4">
      <div className="container mx-auto px-4 flex justify-between">
        <h1 className="logo text-2xl text-white font-bold flex justify-center items-center gap-2 cursor-pointer"><IoIosPaper size={27}/>Todo App</h1>
        {isAuthenticated && (
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-white text-green-500 rounded-md focus:outline-none font-bold  duration-150 hover:bg-green-700 hover:text-white hover:shadow-md hover:scale-105 active:scale-95"
          >
            Logout
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
