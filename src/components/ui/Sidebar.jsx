import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import {
  LayoutDashboard,
  Briefcase,
  List,
  PlusCircle,
  Building2,
  Info,
} from "lucide-react";

const Sidebar = () => {
  const [openJobs, setOpenJobs] = useState(false);
  const [openCompany, setOpenCompany] = useState(false);
  const location = useLocation();

  // Function to highlight active route
  const isActive = (path) => location.pathname === path;

  return (
    <aside className="w-64 bg-gray-900 text-white fixed top-0 left-0 h-full p-6 shadow-lg">
      {/* Logo / Title */}
      <h2 className="text-2xl font-bold mb-8 tracking-wide">TalentSync</h2>

      {/* Menu */}
      <ul className="space-y-2 text-lg">
        {/* Dashboard */}
        <li>
          <Link
            to="/"
            className={`flex items-center px-4 py-2 rounded-md transition-all duration-200 ${
              isActive("/") ? "bg-blue-700" : "hover:bg-gray-800"
            }`}
          >
            <LayoutDashboard className="w-5 h-5 mr-3" />
            Dashboard
          </Link>
        </li>

        {/* Jobs Menu */}
        <li>
          <button
            className="w-full flex items-center justify-between px-4 py-2 rounded-md hover:bg-gray-800 transition-all duration-200"
            onClick={() => setOpenJobs(!openJobs)}
          >
            <span className="flex items-center">
              <Briefcase className="w-5 h-5 mr-3" />
              Jobs
            </span>
            <span className="text-sm">{openJobs ? "▼" : "▶"}</span>
          </button>

          {openJobs && (
            <ul className="ml-6 mt-2 space-y-1 text-base">
              <li>
                <Link
                  to="/jobs/add"
                  className={`flex items-center px-3 py-2 rounded-md transition-all duration-200 ${
                    isActive("/jobs/add") ? "bg-blue-700" : "hover:bg-gray-800"
                  }`}
                >
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Add Job
                </Link>
              </li>
              <li>
                <Link
                  to="/jobs/list"
                  className={`flex items-center px-3 py-2 rounded-md transition-all duration-200 ${
                    isActive("/jobs/list")
                      ? "bg-blue-700"
                      : "hover:bg-gray-800"
                  }`}
                >
                  <List className="w-4 h-4 mr-2" />
                  Jobs List
                </Link>
              </li>
            </ul>
          )}
        </li>

        {/* Company Menu */}
        <li>
          <button
            className="w-full flex items-center justify-between px-4 py-2 rounded-md hover:bg-gray-800 transition-all duration-200"
            onClick={() => setOpenCompany(!openCompany)}
          >
            <span className="flex items-center">
              <Building2 className="w-5 h-5 mr-3" />
              Company
            </span>
            <span className="text-sm">{openCompany ? "▼" : "▶"}</span>
          </button>

          {openCompany && (
            <ul className="ml-6 mt-2 space-y-1 text-base">
              <li>
                <Link
                  to="/recruiter/company"
                  className={`flex items-center px-3 py-2 rounded-md transition-all duration-200 ${
                    isActive("/recruiter/company")
                      ? "bg-blue-700"
                      : "hover:bg-gray-800"
                  }`}
                >
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Add Company
                </Link>
              </li>
            </ul>
          )}
        </li>

        {/* About */}
        <li>
          <Link
            to="/about"
            className={`flex items-center px-4 py-2 rounded-md transition-all duration-200 ${
              isActive("/about") ? "bg-blue-700" : "hover:bg-gray-800"
            }`}
          >
            <Info className="w-5 h-5 mr-3" />
            About
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
