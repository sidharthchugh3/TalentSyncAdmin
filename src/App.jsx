import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import JobList from "./pages/JobList";
import AddJobPage from "./pages/AddJobForm";
import ProtectedRoute from "./components/PrivateRoute";
import Layout from "./components/Layout";
import CreateCompany from "./pages/AddCompany";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes with Layout */}
        <Route
          path="/"
          element={
            // <ProtectedRoute>
              <Layout />
            // </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="jobs" element={<JobList />} />
          <Route path="add-job" element={<AddJobPage />} />
          <Route path="create-company" element={<CreateCompany />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
