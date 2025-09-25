import { Routes, Route } from "react-router-dom";
import NotFound from "../pages/NotFound";
import JobList from "../pages/JobList";
import CreateCompany from "../pages/AddCompany";
import CreateJobs from "../pages/AddJobForm";
import RecruiterOnboarding from "../pages/recruiter/RecruiterOnboarding";
import AddCompany from "../pages/company/AddCompany";
import Jobs from "../pages/jobs/JobsPage";
import Layout from "../components/ui/Layout";
import Login from "../pages/auth/Login";
import Dashboard from "../pages/Dashboard";

function AppRoutes() {
  return (
    <Routes>
      {/* Routes that use the Layout with sidebar */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} /> {/* Default page inside Layout */}
        
        <Route path="jobs">
          <Route path="add" element={<CreateJobs />} />
          <Route path="list" element={<JobList />} />
        </Route>

        <Route path="recruiter" element={<RecruiterOnboarding />} />
        <Route path="recruiter/company" element={<AddCompany />} />
        {/* <Route path="create-company" element={<CreateCompany />} /> */}
      </Route>

      {/* Auth and fallback routes (no sidebar) */}
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
