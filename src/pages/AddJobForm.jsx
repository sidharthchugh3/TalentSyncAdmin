import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createJob } from "../store/slices/JobsSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const JobSchema = z.object({
  title: z.string().min(3, "Job title is required"),
  department: z.string().min(2, "Department is required"),
  roleCategory: z.string().min(2, "Role category is required"),
  employmentType: z.enum(["full_time", "part_time", "internship", "contract"])
    .refine((val) => !!val, { message: "Employment type is required" }),
  location: z.string().min(2, "Location is required"),
  salaryMin: z.string().min(1, "Minimum salary is required"),
  salaryMax: z.string().min(1, "Maximum salary is required"),
  currency: z.string().min(1, "Currency is required"),
  description: z.string().min(10, "Description is required"),
  requirements: z.string().min(5, "At least one requirement is required"),
});

const CreateJobs = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(JobSchema) });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const payload = {
        title: data.title,
        department: data.department,
        roleCategory: data.roleCategory,
        employmentType: data.employmentType,
        location: data.location,
        salaryRange: {
          min: Number(data.salaryMin),
          max: Number(data.salaryMax),
          currency: data.currency,
        },
        description: data.description,
        requirements: data.requirements.split(",").map(r => r.trim()),
      };

      await dispatch(createJob(payload)).unwrap();
      toast.success("Job created successfully!");
      navigate("/jobs");
    } catch (error) {
      toast.error(error.message || "Failed to create job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Create Job</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Job Title */}
        <div>
          <label className="block font-medium">Job Title *</label>
          <input {...register("title")} className="w-full border rounded p-2" />
          {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
        </div>

        {/* Department */}
        <div>
          <label className="block font-medium">Department *</label>
          <input {...register("department")} className="w-full border rounded p-2" />
          {errors.department && <p className="text-red-500 text-sm">{errors.department.message}</p>}
        </div>

        {/* Role Category */}
        <div>
          <label className="block font-medium">Role Category *</label>
          <input {...register("roleCategory")} className="w-full border rounded p-2" />
          {errors.roleCategory && <p className="text-red-500 text-sm">{errors.roleCategory.message}</p>}
        </div>

        {/* Employment Type */}
        <div>
          <label className="block font-medium">Employment Type *</label>
          <select {...register("employmentType")} className="w-full border rounded p-2">
            <option value="">Select...</option>
            <option value="full_time">Full-time</option>
            <option value="part_time">Part-time</option>
            <option value="internship">Internship</option>
            <option value="contract">Contract</option>
          </select>
          {errors.employmentType && <p className="text-red-500 text-sm">{errors.employmentType.message}</p>}
        </div>

        {/* Location */}
        <div>
          <label className="block font-medium">Location *</label>
          <input {...register("location")} className="w-full border rounded p-2" />
          {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
        </div>

        {/* Salary Range */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block font-medium">Min Salary *</label>
            <input type="number" {...register("salaryMin")} className="w-full border rounded p-2" />
            {errors.salaryMin && <p className="text-red-500 text-sm">{errors.salaryMin.message}</p>}
          </div>
          <div>
            <label className="block font-medium">Max Salary *</label>
            <input type="number" {...register("salaryMax")} className="w-full border rounded p-2" />
            {errors.salaryMax && <p className="text-red-500 text-sm">{errors.salaryMax.message}</p>}
          </div>
          <div>
            <label className="block font-medium">Currency *</label>
            <input {...register("currency")} className="w-full border rounded p-2" />
            {errors.currency && <p className="text-red-500 text-sm">{errors.currency.message}</p>}
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium">Description *</label>
          <textarea {...register("description")} rows={4} className="w-full border rounded p-2" />
          {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
        </div>

        {/* Requirements */}
        <div>
          <label className="block font-medium">Requirements *</label>
          <input
            {...register("requirements")}
            placeholder="Comma separated (e.g., React, Node.js, MongoDB)"
            className="w-full border rounded p-2"
          />
          {errors.requirements && <p className="text-red-500 text-sm">{errors.requirements.message}</p>}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Create Job"}
        </button>
      </form>
    </div>
  );
};

export default CreateJobs;
