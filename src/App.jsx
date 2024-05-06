import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "./redux/authSlice";
import { Toaster } from "react-hot-toast";
import Login from "./components/Login";
import { Route, Routes } from "react-router-dom";
import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./components/Home";
import { loadTasks } from './redux/todoSlice';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (isAuthenticated) {
      dispatch(login());
    }
    dispatch(loadTasks());
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen bg-green-50">
      <Toaster />
        <Header />
        <main className="container mx-auto px-4 py-8 flex-grow">
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
    </div>
  );
};

export default App;
