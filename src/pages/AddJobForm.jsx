// src/pages/AddJobPage.jsx
import { useState } from "react";
import axios from "axios";

export default function AddJobPage({ onAddJob }) {
  const [form, setForm] = useState({
    title: "",
    department: "",
    roleCategory: "",
    employmentType: "full_time",
    location: "",
    salaryMin: "",
    salaryMax: "",
    salaryCurrency: "INR",
    description: "",
    requirements: [""],
    status: "pending_review",
    verificationLevelRequired: "standard",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle form input
  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  // Handle dynamic requirements
  function handleRequirementChange(index, value) {
    const updated = [...form.requirements];
    updated[index] = value;
    setForm((prev) => ({ ...prev, requirements: updated }));
  }

  function addRequirement() {
    setForm((prev) => ({ ...prev, requirements: [...prev.requirements, ""] }));
  }

  function removeRequirement(index) {
    setForm((prev) => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index),
    }));
  }

  async function handleSave() {
    setLoading(true);
    setError("");
    setSuccess("");

    const jobData = {
      title: form.title,
      department: form.department,
      roleCategory: form.roleCategory,
      employmentType: form.employmentType,
      location: form.location,
      salaryRange: {
        min: Number(form.salaryMin),
        max: Number(form.salaryMax),
        currency: form.salaryCurrency,
      },
      description: form.description,
      requirements: form.requirements.filter((r) => r.trim() !== ""),
      status: form.status,
      verificationLevelRequired: form.verificationLevelRequired,
    };

    try {
      // Get token (assuming it's stored in localStorage after login)
      const res = await API.post("/jobs/create", jobData);


      setSuccess("Job created successfully!");
      onAddJob && onAddJob(res.data); // optional callback

      // Reset form
      setForm({
        title: "",
        department: "",
        roleCategory: "",
        employmentType: "full_time",
        location: "",
        salaryMin: "",
        salaryMax: "",
        salaryCurrency: "INR",
        description: "",
        requirements: [""],
        status: "pending_review",
        verificationLevelRequired: "standard",
      });
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-100 to-blue-50 flex flex-col items-center p-8 mt-4">
      <h1 className="text-4xl font-extrabold mb-10 text-blue-900 select-none">
        Add Job
      </h1>

      <div className="flex-grow w-full max-w-5xl bg-white rounded-3xl shadow-xl border border-blue-100 p-10 grid gap-8">
        {/* Title */}
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Job Title"
          className="w-full text-2xl font-semibold px-5 py-4 border rounded-xl bg-gray-50"
        />

        {/* Department + Role Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            name="department"
            value={form.department}
            onChange={handleChange}
            placeholder="Department"
            className="w-full px-5 py-4 border rounded-xl bg-gray-50"
          />
          <input
            name="roleCategory"
            value={form.roleCategory}
            onChange={handleChange}
            placeholder="Role Category"
            className="w-full px-5 py-4 border rounded-xl bg-gray-50"
          />
        </div>

        {/* Employment Type */}
        <select
          name="employmentType"
          value={form.employmentType}
          onChange={handleChange}
          className="w-full px-5 py-4 border rounded-xl bg-gray-50"
        >
          <option value="full_time">Full Time</option>
          <option value="part_time">Part Time</option>
          <option value="internship">Internship</option>
          <option value="contract">Contract</option>
        </select>

        {/* Location */}
        <input
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="Location"
          className="w-full px-5 py-4 border rounded-xl bg-gray-50"
        />

        {/* Salary Range */}
        <div className="grid grid-cols-3 gap-6">
          <input
            type="number"
            name="salaryMin"
            value={form.salaryMin}
            onChange={handleChange}
            placeholder="Salary Min"
            className="w-full px-5 py-4 border rounded-xl bg-gray-50"
          />
          <input
            type="number"
            name="salaryMax"
            value={form.salaryMax}
            onChange={handleChange}
            placeholder="Salary Max"
            className="w-full px-5 py-4 border rounded-xl bg-gray-50"
          />
          <select
            name="salaryCurrency"
            value={form.salaryCurrency}
            onChange={handleChange}
            className="w-full px-5 py-4 border rounded-xl bg-gray-50"
          >
            <option value="INR">INR</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>
        </div>

        {/* Description */}
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Job Description"
          rows={5}
          className="w-full px-5 py-4 border rounded-xl bg-gray-50 resize-none"
        />

        {/* Requirements */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Requirements</h2>
          {form.requirements.map((req, idx) => (
            <div key={idx} className="flex gap-4 mb-3">
              <input
                value={req}
                onChange={(e) => handleRequirementChange(idx, e.target.value)}
                placeholder={`Requirement ${idx + 1}`}
                className="flex-1 px-5 py-3 border rounded-xl bg-gray-50"
              />
              <button
                type="button"
                onClick={() => removeRequirement(idx)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addRequirement}
            className="mt-2 px-5 py-3 bg-green-600 text-white rounded-xl"
          >
            + Add Requirement
          </button>
        </div>

        {/* Status + Verification Level */}
        <div className="grid grid-cols-2 gap-6">
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full px-5 py-4 border rounded-xl bg-gray-50"
          >
            <option value="draft">Draft</option>
            <option value="pending_review">Pending Review</option>
            <option value="active">Active</option>
            <option value="closed">Closed</option>
            <option value="rejected">Rejected</option>
            <option value="expired">Expired</option>
          </select>

          <select
            name="verificationLevelRequired"
            value={form.verificationLevelRequired}
            onChange={handleChange}
            className="w-full px-5 py-4 border rounded-xl bg-gray-50"
          >
            <option value="standard">Standard Verification</option>
            <option value="strict">Strict Verification</option>
          </select>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          disabled={loading}
          className="w-full py-5 text-white font-extrabold text-xl rounded-3xl bg-blue-600 hover:bg-blue-700 transition disabled:bg-gray-400"
        >
          {loading ? "Saving..." : "Save Job"}
        </button>

        {/* Success/Error */}
        {error && <p className="text-red-600 font-semibold">{error}</p>}
        {success && <p className="text-green-600 font-semibold">{success}</p>}
      </div>
    </div>
  );
}
