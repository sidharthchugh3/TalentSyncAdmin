// src/pages/JobList.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllJobs } from "../store/slices/JobsSlice";
import { toast } from "react-toastify";

function JobList() {
  const dispatch = useDispatch();
  const { jobs, loading, error } = useSelector((state) => state.jobs);

  useEffect(() => {
    dispatch(fetchAllJobs());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Job List</h1>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : jobs.length === 0 ? (
        <p className="text-gray-600 text-center">No jobs found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="py-3 px-4 text-left">Title</th>
                <th className="py-3 px-4 text-left">Department</th>
                <th className="py-3 px-4 text-left">Role Category</th>
                <th className="py-3 px-4 text-left">Employment Type</th>
                <th className="py-3 px-4 text-left">Location</th>
                <th className="py-3 px-4 text-left">Salary</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job._id || job.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{job.title}</td>
                  <td className="py-3 px-4">{job.department}</td>
                  <td className="py-3 px-4">{job.roleCategory}</td>
                  <td className="py-3 px-4">{job.employmentType.replace("_", " ")}</td>
                  <td className="py-3 px-4">{job.location}</td>
                  <td className="py-3 px-4">
                    ₹{job.salaryRange?.min} - ₹{job.salaryRange?.max} {job.salaryRange?.currency}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default JobList;
