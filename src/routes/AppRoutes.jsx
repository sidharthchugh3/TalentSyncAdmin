import { Routes, Route } from "react-router-dom";
import NotFound from "../pages/NotFound"
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import JobList from "../pages/JobList";
import AddJobPage from "../pages/AddJobForm";
import CreateCompany from "../pages/AddCompany";



function AppRoutes() {
    return (
        <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<NotFound />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="jobs" element={<JobList />} />
                <Route path="add-job" element={<AddJobPage />} />
                <Route path="create-company" element={<CreateCompany />} />
        </Routes>
    )
}

export default AppRoutes
