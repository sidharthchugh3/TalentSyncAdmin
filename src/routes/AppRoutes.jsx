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
import ProtectedRoute from "./ProtectedRoutes";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<ProtectedRoute />}>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="jobs">
                        <Route path="add" element={<CreateJobs />} />
                        <Route path="list" element={<JobList />} />
                    </Route>
                    <Route path="recruiter" element={<RecruiterOnboarding />} />
                    <Route path="recruiter/company" element={<AddCompany />} />
                </Route>
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default AppRoutes;
