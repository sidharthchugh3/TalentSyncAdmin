import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar"; // ✅ import Sidebar

const Layout = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="ml-64 flex-1 bg-white text-black p-6 overflow-y-auto">
        <Outlet /> {/* This will render child routes */}
      </main>
    </div>
  );
};

export default Layout;
