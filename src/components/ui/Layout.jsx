import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="ml-64 flex-1 bg-white text-black p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
