// Dashboard.js
import { useState, useEffect } from "react";
import API from "../utils/api";
import { useNavigate } from "react-router-dom";
import { removeToken } from "../utils/auth";
import Sidebar from "./Sidebar";
import AddJobForm from "./AddJobForm";
import { DashboardContent, JobsList } from "./DashboardContent";

export default function Dashboard() {
  const [view, setView] = useState("dashboard");
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  // useEffect(() => {
  //   API.get("/admin/jobs").then(res => setJobs(res.data.data || []));
  // }, []);

  function logout() {
    removeToken();
    navigate("/");
  }

  const onAddJob = async job => {
    await API.post("/admin/jobs", job);
    API.get("/admin/jobs").then(res => setJobs(res.data.data || []));
    setView("jobs");
  };

  let content;
  if (view === "dashboard") content = <DashboardContent />;
  else if (view === "addJob") content = <AddJobForm onAddJob={onAddJob} />;
  else if (view === "jobs") content = <JobsList jobs={jobs} />;

  return (
    <div className="flex min-h-screen">
      <Sidebar setView={setView} logout={logout} />
      <div className="ml-64 flex-1 p-8 bg-gray-50">
        {content}
      </div>
    </div>
  );
}
