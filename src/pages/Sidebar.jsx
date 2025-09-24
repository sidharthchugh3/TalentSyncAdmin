import { useState } from "react";
import { Link } from "react-router-dom";

export default function Sidebar({ logout }) {
  const [jobsOpen, setJobsOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false)

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-gray-800 text-white flex flex-col py-8">
      <ul className="flex flex-col space-y-2">
        {/* Dashboard */}
        <li>
          <Link
            to="/dashboard"
            className="flex items-center px-4 py-2 hover:bg-gray-700 rounded"
          >
            <span className="mr-3">📊</span>
            <span>Dashboard</span>
          </Link>
        </li>

        {/* Jobs */}
        <li>
          <button
            onClick={() => setJobsOpen(!jobsOpen)}
            className="w-full flex items-center justify-between px-4 py-2 hover:bg-gray-700 rounded"
          >
            <span className="flex items-center">
              <span className="mr-3">💼</span>
              <span>Jobs</span>
            </span>
            <span>{jobsOpen ? "▲" : "▼"}</span>
          </button>

          {jobsOpen && (
            <ul className="ml-6 mt-2 space-y-1">
              <li>
                <Link
                  to="/add-job"
                  className="flex items-center px-3 py-2 hover:bg-gray-700 rounded"
                >
                  <span className="mr-3">➕</span>
                  <span>Add Job</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/jobs"
                  className="flex items-center px-3 py-2 hover:bg-gray-700 rounded"
                >
                  <span className="mr-3">📋</span>
                  <span>Jobs List</span>
                </Link>
              </li>
            </ul>
          )}
          <button
            onClick={() => setCompanyOpen(!companyOpen)}
            className="w-full flex items-center justify-between px-4 py-2 hover:bg-gray-700 rounded"
          >
            <span className="flex items-center">
              <span className="mr-3">💼</span>
              <span>Company</span>
            </span>
            <span>{companyOpen ? "▲" : "▼"}</span>
          </button>
        </li>

        {/* Logout */}
        <li className="mt-auto">
          <button
            onClick={logout}
            className="w-full flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 rounded"
          >
            <span className="mr-3">🚪</span>
            <span>Logout</span>
          </button>
        </li>
      </ul>
    </div>
  );
}
