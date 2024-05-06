import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";
import toast from "react-hot-toast";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    // Mock authentication process
    if (!username || !password) {
      toast.error("Enter username and password", {
        duration: 3000,
        position: "top-right",
        style: {
          borderRadius: "10px",
        },
      });
      return;
    }
    if (username === "admin" && password === "password") {
      dispatch(login());
      // Store authentication status in local storage
      localStorage.setItem("isAuthenticated", true);

      toast.success("Logged In successfully", {
        duration: 3000,
        position: "top-right",
        style: {
          borderRadius: "10px",
        },
      });
    } else {
      toast.error("Invalid credentials", {
        duration: 3000,
        position: "top-right",
        style: {
          borderRadius: "10px",
        },
      });
      setPassword("");
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-green-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label
                htmlFor="username"
                className="block text-md font-bold leading-6 text-green-900"
              >
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-md ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-md sm:leading-6 pl-2"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-md font-bold leading-6 text-green-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-md ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-md sm:leading-6 pl-2"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center items-center rounded-md bg-green-600 px-3 py-1.5 text-lg leading-6 text-white font-bold  duration-150 hover:bg-green-700 hover:text-white hover:shadow-md hover:scale-[102%] active:scale-[98%] h-10"
              >
                <span>Login</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
