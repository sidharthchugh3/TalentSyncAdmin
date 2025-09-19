import { useState } from "react";
import { PlusCircle, Building2, Globe, Mail, Phone, Linkedin, FileText, Users, MapPin, Info, Loader2, CheckCircle } from "lucide-react";
import { createCompany } from "../store/CompanySlice";
import { useAppDispatch } from "../store/hook/hook";
import { toast } from "react-toastify";


const industryOptions = [
  "Technology", "Healthcare", "Finance", "Manufacturing", "Retail",
  "Education", "Real Estate", "Automotive", "Energy", "Telecommunications",
  "Entertainment", "Hospitality", "Agriculture", "Construction", "Other"
];

const companySizeOptions = [
  "1-10 employees", "11-50 employees", "51-200 employees",
  "201-500 employees", "501-1000 employees", "1000+ employees"
];

export default function CreateCompany() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [company, setCompany] = useState(null);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    companyName: "",
    companyWebsite: "",
    companyEmail: "",
    companyPhone: "",
    companyLinkedIn: "",
    companyGstNumber: "",
    companyCinNumber: "",
    companyIndustry: "",
    companySize: "",
    companyHeadquarters: "",
    companyDescription: "",
    companyLogoUrl: "",
  });

  const validateForm = () => {
    const newErrors = {};

    if (!formData.companyName.trim()) {
      newErrors.companyName = "Company name is required";
    }
    if (!formData.companyIndustry.trim()) {
      newErrors.companyIndustry = "Industry is required";
    }
    if (formData.companyEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.companyEmail)) {
      newErrors.companyEmail = "Invalid email format";
    }
    if (formData.companyWebsite && !formData.companyWebsite.startsWith("http")) {
      newErrors.companyWebsite = "Website should start with http:// or https://";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreate = async () => {
    if (!validateForm()) return;
    setLoading(true);
    await dispatch(createCompany(formData))
      .unwrap()
      .then(() => {
        setCompany(formData);
        setFormData({
          companyName: "",
          companyWebsite: "",
          companyEmail: "",
          companyPhone: "",
          companyLinkedIn: "",
          companyGstNumber: "",
          companyCinNumber: "",
          companyIndustry: "",
          companySize: "",
          companyHeadquarters: "",
          companyDescription: "",
          companyLogoUrl: "",
        });
        setErrors({});
        toast.success("Company created successfully!");
      })
      .catch(() => {
        toast.error("Error creating the company");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getFieldIcon = (fieldName) => {
    const iconMap = {
      companyName: Building2,
      companyWebsite: Globe,
      companyEmail: Mail,
      companyPhone: Phone,
      companyLinkedIn: Linkedin,
      companyGstNumber: FileText,
      companyCinNumber: FileText,
      companyIndustry: Building2,
      companySize: Users,
      companyHeadquarters: MapPin,
      companyDescription: Info,
      companyLogoUrl: Globe,
    };

    const Icon = iconMap[fieldName];
    return Icon ? <Icon className="w-4 h-4 text-gray-500" /> : null;
  };

  const renderFormField = (key, value) => {
    const isRequired = key === "companyName" || key === "companyIndustry";
    const fieldName = key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase());

    if (key === "companyIndustry") {
      return (
        <div key={key} className="space-y-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {fieldName} {isRequired && <span className="text-red-500">*</span>}
          </label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2">{getFieldIcon(key)}</div>
            <select
              className={`w-full pl-10 pr-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
                errors[key] ? "border-red-500" : "border-gray-300"
              }`}
              value={value || ""}
              onChange={(e) => setFormData((prev) => ({ ...prev, [key]: e.target.value }))}
            >
              <option value="">Select industry</option>
              {industryOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          {errors[key] && <p className="text-red-500 text-xs">{errors[key]}</p>}
        </div>
      );
    }

    if (key === "companySize") {
      return (
        <div key={key} className="space-y-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">{fieldName}</label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2">{getFieldIcon(key)}</div>
            <select
              className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              value={value || ""}
              onChange={(e) => setFormData((prev) => ({ ...prev, [key]: e.target.value }))}
            >
              <option value="">Select company size</option>
              {companySizeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
      );
    }

    if (key === "companyDescription") {
      return (
        <div key={key} className="space-y-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">{fieldName}</label>
          <div className="relative">
            <div className="absolute left-3 top-3">{getFieldIcon(key)}</div>
            <textarea
              placeholder={`Enter ${fieldName.toLowerCase()}`}
              className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none h-24"
              value={value || ""}
              onChange={(e) => setFormData((prev) => ({ ...prev, [key]: e.target.value }))}
            />
          </div>
        </div>
      );
    }

    return (
      <div key={key} className="space-y-1">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {fieldName} {isRequired && <span className="text-red-500">*</span>}
        </label>
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2">{getFieldIcon(key)}</div>
          <input
            type={key === "companyEmail" ? "email" : key === "companyPhone" ? "tel" : "text"}
            placeholder={`Enter ${fieldName.toLowerCase()}`}
            className={`w-full pl-10 pr-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
              errors[key] ? "border-red-500" : "border-gray-300"
            }`}
            value={value || ""}
            onChange={(e) => setFormData((prev) => ({ ...prev, [key]: e.target.value }))}
          />
        </div>
        {errors[key] && <p className="text-red-500 text-xs">{errors[key]}</p>}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 md:p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-6 md:p-8">
        <div className="text-center mb-6">
          <PlusCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Create New Company</h2>
          <p className="text-gray-600">Add a new company to your database</p>
        </div>

        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {Object.entries(formData).map(([key, value]) => renderFormField(key, value))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              type="button"
              onClick={() => {
                setFormData({
                  companyName: "",
                  companyWebsite: "",
                  companyEmail: "",
                  companyPhone: "",
                  companyLinkedIn: "",
                  companyGstNumber: "",
                  companyCinNumber: "",
                  companyIndustry: "",
                  companySize: "",
                  companyHeadquarters: "",
                  companyDescription: "",
                  companyLogoUrl: "",
                });
                setErrors({});
              }}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Clear Form
            </button>
            <button
              onClick={handleCreate}
              disabled={loading}
              className="flex items-center justify-center gap-2 bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium min-w-[140px]"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <PlusCircle className="w-4 h-4" />}
              Create Company
            </button>
          </div>
        </div>

        {company && (
          <div className="mt-8 bg-green-50 border border-green-200 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-green-800 mb-1">Company Created Successfully!</h3>
                <p className="text-green-700">"{company.companyName}" has been added to your database.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
