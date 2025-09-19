// src/components/Layout.jsx
import Sidebar from "../pages/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { removeToken } from "../utils/auth";

export default function Layout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();        // clear token
    navigate("/login");   // redirect to login
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white">
        <Sidebar logout={handleLogout} />  {/* 👈 pass logout here */}
      </aside>

      {/* Main Content */}
      <main className="flex-1 h-screen flex justify-center bg-gray-50 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
