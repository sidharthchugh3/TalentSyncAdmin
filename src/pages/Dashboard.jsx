import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const Dashboard = () => {
  const jobsData = [
    { name: "Engineering", count: 40 },
    { name: "Marketing", count: 25 },
    { name: "Design", count: 15 },
    { name: "HR", count: 10 },
    { name: "Sales", count: 20 },
  ];

  const companiesData = [
    { name: "TechCorp", value: 30 },
    { name: "DesignHub", value: 20 },
    { name: "MarketGurus", value: 25 },
    { name: "HRWorks", value: 15 },
    { name: "SalesForce", value: 10 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28CF4"];

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition duration-300">
          <h2 className="text-gray-500 font-semibold">Total Jobs</h2>
          <p className="text-3xl font-bold text-blue-600 mt-2">110</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition duration-300">
          <h2 className="text-gray-500 font-semibold">Total Companies</h2>
          <p className="text-3xl font-bold text-green-600 mt-2">45</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition duration-300">
          <h2 className="text-gray-500 font-semibold">Open Positions</h2>
          <p className="text-3xl font-bold text-yellow-600 mt-2">72</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition duration-300">
          <h2 className="text-gray-500 font-semibold">Applications</h2>
          <p className="text-3xl font-bold text-red-600 mt-2">310</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Bar Chart for Jobs by Department */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-4">Jobs by Department</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={jobsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#0088FE" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart for Companies */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-4">Jobs Distribution by Company</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={companiesData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {companiesData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
