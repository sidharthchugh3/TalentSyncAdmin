import { Routes, Route } from "react-router-dom";
import NotFound from "../pages/NotFound"
import JobList from "../pages/JobList";
import CreateCompany from "../pages/AddCompany";
import CreateJobs from "../pages/AddJobForm";
import RecruiterOnboarding from "../pages/recruiter/RecruiterOnboarding";
import AddCompany from "../pages/company/AddCompany";
import Jobs from "../pages/jobs/JobsPage";



function AppRoutes() {
    return (
        <Routes>
            <Route path="/jobs" element={<JobList />} />
            <Route path="/" element={<Jobs />} />
            <Route path="/recruiter" element={<RecruiterOnboarding />} />
            <Route path="/recruiter/company" element={<AddCompany />} />
            <Route path="/add-job" element={<CreateJobs />} />
            <Route path="/create-company" element={<CreateCompany />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}

export default AppRoutes
