import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createJob } from "../store/slices/JobsSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Briefcase, MapPin, ClipboardList, CheckCircle } from "lucide-react";

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
      requirements: data.requirements.split(",").map((r) => r.trim()),
    };

    await dispatch(createJob(payload)).unwrap();
    
    toast.success("Job Created Successfully!", {
        autoClose: 5000,
        onClose: () => {
            window.location.replace("/jobs/list"); // full page redirect
        },
    });

  } catch (error) {
    toast.error(error.message || "Failed to create job");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Create Job</h1>
      <div className="bg-gradient-to-r from-blue-50 to-white p-8 rounded-2xl shadow-lg">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

          {/* Job Title */}
          <div>
            <label className="block font-medium mb-1">Job Title *</label>
            <div className="flex items-center border rounded-lg p-2 focus-within:ring-2 focus-within:ring-blue-500 bg-white">
              <Briefcase className="w-5 h-5 mr-2 text-gray-400" />
              <input {...register("title")} placeholder="Enter job title" className="w-full outline-none" />
            </div>
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
          </div>

          {/* Department */}
          <div>
            <label className="block font-medium mb-1">Department *</label>
            <input {...register("department")} placeholder="Enter department" className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500" />
            {errors.department && <p className="text-red-500 text-sm mt-1">{errors.department.message}</p>}
          </div>

          {/* Role Category */}
          <div>
            <label className="block font-medium mb-1">Role Category *</label>
            <input {...register("roleCategory")} placeholder="Enter role category" className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500" />
            {errors.roleCategory && <p className="text-red-500 text-sm mt-1">{errors.roleCategory.message}</p>}
          </div>

          {/* Employment Type */}
          <div>
            <label className="block font-medium mb-1">Employment Type *</label>
            <select {...register("employmentType")} className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500">
              <option value="">Select...</option>
              <option value="full_time">Full-time</option>
              <option value="part_time">Part-time</option>
              <option value="internship">Internship</option>
              <option value="contract">Contract</option>
            </select>
            {errors.employmentType && <p className="text-red-500 text-sm mt-1">{errors.employmentType.message}</p>}
          </div>

          {/* Location */}
          <div>
            <label className="block font-medium mb-1">Location *</label>
            <div className="flex items-center border rounded-lg p-2 focus-within:ring-2 focus-within:ring-blue-500 bg-white">
              <MapPin className="w-5 h-5 mr-2 text-gray-400" />
              <input {...register("location")} placeholder="Enter location" className="w-full outline-none" />
            </div>
            {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>}
          </div>

          {/* Salary Range */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block font-medium mb-1">Min Salary *</label>
              <div className="flex items-center border rounded-lg p-2 focus-within:ring-2 focus-within:ring-blue-500 bg-white">
                <span className="mr-2 text-gray-400 text-lg">₹</span>
                <input type="number" {...register("salaryMin")} placeholder="0" className="w-full outline-none" />
              </div>
              {errors.salaryMin && <p className="text-red-500 text-sm mt-1">{errors.salaryMin.message}</p>}
            </div>
            <div>
              <label className="block font-medium mb-1">Max Salary *</label>
              <div className="flex items-center border rounded-lg p-2 focus-within:ring-2 focus-within:ring-blue-500 bg-white">
                <span className="mr-2 text-gray-400 text-lg">₹</span>
                <input type="number" {...register("salaryMax")} placeholder="0" className="w-full outline-none" />
              </div>
              {errors.salaryMax && <p className="text-red-500 text-sm mt-1">{errors.salaryMax.message}</p>}
            </div>
            <div>
              <label className="block font-medium mb-1">Currency *</label>
              <input {...register("currency")} placeholder="INR" className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500" />
              {errors.currency && <p className="text-red-500 text-sm mt-1">{errors.currency.message}</p>}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block font-medium mb-1">Description *</label>
            <div className="flex items-start border rounded-lg p-2 focus-within:ring-2 focus-within:ring-blue-500 bg-white">
              <ClipboardList className="w-5 h-5 mr-2 text-gray-400 mt-1" />
              <textarea {...register("description")} rows={4} placeholder="Enter job description" className="w-full outline-none" />
            </div>
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
          </div>

          {/* Requirements */}
          <div>
            <label className="block font-medium mb-1">Requirements *</label>
            <div className="flex items-center border rounded-lg p-2 focus-within:ring-2 focus-within:ring-blue-500 bg-white">
              <CheckCircle className="w-5 h-5 mr-2 text-gray-400" />
              <input {...register("requirements")} placeholder="Comma separated (e.g., React, Node.js)" className="w-full outline-none" />
            </div>
            {errors.requirements && <p className="text-red-500 text-sm mt-1">{errors.requirements.message}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl shadow-lg transition-all duration-300 disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Create Job"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default CreateJobs;
