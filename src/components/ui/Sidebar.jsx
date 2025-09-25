import { Link } from "react-router-dom";
import { useState } from "react";

const Sidebar = () => {
  const [openJobs, setOpenJobs] = useState(false);
  const [openCompany, setOpenCompany] = useState(false);

  return (
    <aside className="w-64 bg-gray-900 text-white fixed top-0 left-0 h-full p-5">
      <h2 className="text-2xl font-bold mb-6">TalentSync</h2>
      <ul className="space-y-4 text-xl">
        {/* Dashboard */}
        <li>
          <Link to="/" className="hover:text-gray-300">
            Dashboard
          </Link>
        </li>

        {/* Jobs Menu */}
        <li>
          <button
            className="w-full text-left flex justify-between items-center hover:text-gray-300"
            onClick={() => setOpenJobs(!openJobs)}
          >
            Jobs
            <span>{openJobs ? "▲" : "▼"}</span>
          </button>

          {openJobs && (
            <ul className="ml-4 mt-2 space-y-2 text-base">
              <li>
                <Link to="/jobs/add" className="hover:text-gray-300">
                  Add Job
                </Link>
              </li>
              <li>
                <Link to="/jobs/list" className="hover:text-gray-300">
                  Jobs List
                </Link>
              </li>
            </ul>
          )}
        </li>

        {/* Company Menu */}
        <li>
          <button
            className="w-full text-left flex justify-between items-center hover:text-gray-300"
            onClick={() => setOpenCompany(!openCompany)}
          >
            Company
            <span>{openCompany ? "▲" : "▼"}</span>
          </button>

          {openCompany && (
            <ul className="ml-4 mt-2 space-y-2 text-base">
              <li>
                <Link to="/recruiter/company" className="hover:text-gray-300">
                  Add Company
                </Link>
              </li>
            </ul>
          )}
        </li>

        {/* About */}
        <li>
          <Link to="/about" className="hover:text-gray-300">
            About
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
