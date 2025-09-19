// src/pages/DashboardContent.jsx

export function DashboardContent() {
  return (
<div className="text-center">
      <h1 className="text-4xl font-extrabold text-blue-900">
        Welcome to TalentSync Admin Panel
      </h1>
    </div>

  );
}

export function JobsList({ jobs }) {
  if (!jobs || jobs.length === 0) {
    return <p className="text-gray-600">No jobs available</p>;
  }

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-6">Jobs List</h2>
      <ul className="space-y-4">
        {jobs.map((job) => (
          <li
            key={job._id}
            className="p-5 bg-white rounded-lg shadow border border-gray-200"
          >
            <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
            <p className="text-gray-700 mt-1">{job.description}</p>
            <p className="text-sm text-gray-500 mt-2">
              📍 {job.location} — 💰 {job.salary || "N/A"}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
