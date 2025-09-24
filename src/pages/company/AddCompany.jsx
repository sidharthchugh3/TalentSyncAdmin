import { useState } from "react";
import { Search, PlusCircle, Building2, Globe, Mail, Phone, Linkedin, FileText, Users, MapPin, Info, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { createCompany, fetchAllCompanies, fetchRecruiterCompanies } from "../../store/slices/CompanySlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { joinCompany } from "../../store/slices/recruiterSlice";
import { useNavigate } from "react-router-dom";

const industryOptions = [
    "Technology", "Healthcare", "Finance", "Manufacturing", "Retail",
    "Education", "Real Estate", "Automotive", "Energy", "Telecommunications",
    "Entertainment", "Hospitality", "Agriculture", "Construction", "Other"
];

const companySizeOptions = [
    "1-10 employees", "11-50 employees", "51-200 employees",
    "201-500 employees", "501-1000 employees", "1000+ employees"
];

export default function AddCompany() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState('search');
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [company, setCompany] = useState(null);
    const [notFound, setNotFound] = useState(false);
    const [errors, setErrors] = useState({});
    const { allCompanies, associatedCompanies } = useSelector((state) => state.company);

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
        if (formData.companyWebsite && !formData.companyWebsite.startsWith('http')) {
            newErrors.companyWebsite = "Website should start with http:// or https://";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSearch = async () => {
        if (!query.trim()) return;
        setLoading(true);
        setCompany(null);
        setNotFound(false);

        try {
            await dispatch(fetchRecruiterCompanies(query)).unwrap();
            const foundCompany = allCompanies.find(c =>
                c.companyName.toLowerCase() === query.trim().toLowerCase()
            );

            if (foundCompany) {
                setCompany(foundCompany);
            }
        } catch (error) {
            setNotFound(true);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async () => {
        if (!validateForm()) return;
        setLoading(true);
        await dispatch(createCompany(formData)).unwrap().then(() => {
            setCompany(formData);
            setNotFound(false);
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
            setActiveTab('search')
            setErrors({});
        }).catch(() => {
            toast.error("Error creating the company")
        }).finally(() => {
            setLoading(false);
        })
    };

    const handleJoinCompany = async (companyId) => {
        await dispatch(joinCompany(companyId)).unwrap().then(() => {
            toast.success("Added to the company successfully")
            navigate('/add-new-jobs')
        }).catch((err) => {
            const errorMsg =
                err?.message ||
                err?.error ||
                err?.data?.message ||
                err ||
                "Something went wrong";

            if (errorMsg === "Recruiter already linked to company") {
                navigate('/add-new-jobs');
            }
            console.log(err)
        })
    }

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
            companyLogoUrl: Globe
        };

        const Icon = iconMap[fieldName];
        return Icon ? <Icon className="w-4 h-4 text-gray-500" /> : null;
    };

    const renderFormField = (key, value) => {
        const isRequired = key === 'companyName' || key === 'companyIndustry';
        const fieldName = key.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase());

        if (key === 'companyIndustry') {
            return (
                <div key={key} className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        {fieldName} {isRequired && <span className="text-red-500">*</span>}
                    </label>
                    <div className="relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2">
                            {getFieldIcon(key)}
                        </div>
                        <select
                            className={`w-full pl-10 pr-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${errors[key] ? 'border-red-500' : 'border-gray-300'}`}
                            value={value || ""}
                            onChange={(e) => setFormData(prev => ({ ...prev, [key]: e.target.value }))}
                        >
                            <option value="">Select industry</option>
                            {industryOptions.map(option => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                    </div>
                    {errors[key] && <p className="text-red-500 text-xs">{errors[key]}</p>}
                </div>
            );
        }

        if (key === 'companySize') {
            return (
                <div key={key} className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        {fieldName}
                    </label>
                    <div className="relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2">
                            {getFieldIcon(key)}
                        </div>
                        <select
                            className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                            value={value || ""}
                            onChange={(e) => setFormData(prev => ({ ...prev, [key]: e.target.value }))}
                        >
                            <option value="">Select company size</option>
                            {companySizeOptions.map(option => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                    </div>
                </div>
            );
        }

        if (key === 'companyDescription') {
            return (
                <div key={key} className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        {fieldName}
                    </label>
                    <div className="relative">
                        <div className="absolute left-3 top-3">
                            {getFieldIcon(key)}
                        </div>
                        <textarea
                            placeholder={`Enter ${fieldName.toLowerCase()}`}
                            className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none h-24"
                            value={value || ""}
                            onChange={(e) => setFormData(prev => ({ ...prev, [key]: e.target.value }))}
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
                    <div className="absolute left-3 top-1/2 -translate-y-1/2">
                        {getFieldIcon(key)}
                    </div>
                    <input
                        type={key === 'companyEmail' ? 'email' : key === 'companyPhone' ? 'tel' : 'text'}
                        placeholder={`Enter ${fieldName.toLowerCase()}`}
                        className={`w-full pl-10 pr-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${errors[key] ? 'border-red-500' : 'border-gray-300'}`}
                        value={value || ""}
                        onChange={(e) => setFormData(prev => ({ ...prev, [key]: e.target.value }))}
                    />
                </div>
                {errors[key] && <p className="text-red-500 text-xs">{errors[key]}</p>}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 md:p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                        Company Management
                    </h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Search for existing companies or create new company profiles with comprehensive details
                    </p>
                </div>

                {/* Tab Navigation */}
                <div className="flex justify-center mb-8">
                    <div className="flex bg-gray-100 rounded-lg p-1 shadow-sm">
                        <button
                            onClick={() => setActiveTab('search')}
                            className={`flex items-center gap-2 px-6 py-2 rounded-md font-medium transition-all ${activeTab === 'search'
                                ? 'bg-white text-blue-600 shadow-sm'
                                : 'text-gray-600 hover:text-gray-800'
                                }`}
                        >
                            <Search className="w-4 h-4" />
                            Search Company
                        </button>
                        <button
                            onClick={() => setActiveTab('create')}
                            className={`flex items-center gap-2 px-6 py-2 rounded-md font-medium transition-all ${activeTab === 'create'
                                ? 'bg-white text-green-600 shadow-sm'
                                : 'text-gray-600 hover:text-gray-800'
                                }`}
                        >
                            <PlusCircle className="w-4 h-4" />
                            Create Company
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="max-w-4xl mx-auto">
                    {activeTab === 'search' ? (
                        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                            <div className="text-center mb-6">
                                <Search className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                                <h2 className="text-2xl font-semibold text-gray-900 mb-2">Search Company</h2>
                                <p className="text-gray-600">Find existing allCompanies in your database</p>
                            </div>

                            <div className="max-w-md mx-auto mb-8">
                                <div className="flex gap-3">
                                    <div className="relative flex-1">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input
                                            type="text"
                                            placeholder="Enter company name..."
                                            className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                            value={query}
                                            onChange={(e) => setQuery(e.target.value)}
                                            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                                        />
                                    </div>
                                    <button
                                        onClick={handleSearch}
                                        disabled={loading || !query.trim()}
                                        className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
                                    >
                                        {loading ? (
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                        ) : (
                                            <Search className="w-4 h-4" />
                                        )}
                                        Search
                                    </button>
                                </div>
                            </div>

                            {/* Search Results */}
                            {loading && (
                                <div className="flex items-center justify-center py-8">
                                    <Loader2 className="w-6 h-6 animate-spin text-blue-600 mr-2" />
                                    <span className="text-gray-600">Searching...</span>
                                </div>
                            )}

                            {allCompanies.length > 0 && (
                                <div className="mt-6 space-y-4">
                                    {allCompanies.map((c) => (
                                        <div
                                            key={c._id}
                                            className="p-4 border rounded-lg shadow-sm bg-gray-50 flex items-center justify-between"
                                        >
                                            <div>
                                                <h4 className="font-semibold text-gray-800">{c.companyName}</h4>
                                                <p className="text-sm text-gray-600">{c.companyIndustry}</p>
                                                {c.companyWebsite && (
                                                    <a
                                                        href={c.companyWebsite}
                                                        className="text-blue-600 text-sm underline"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        {c.companyWebsite}
                                                    </a>
                                                )}
                                            </div>

                                            {/* Join Company Button */}
                                            <button
                                                onClick={() => handleJoinCompany(c._id)}
                                                className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg shadow hover:bg-green-700 transition cursor-pointer"
                                            >
                                                Join Company
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {notFound && (
                                <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                                    <div className="flex items-start gap-4">
                                        <XCircle className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
                                        <div>
                                            <h3 className="text-lg font-semibold text-red-800 mb-1">
                                                No Company Found
                                            </h3>
                                            <p className="text-red-700">
                                                No company found with the name "{query}". Would you like to create a new company instead?
                                            </p>
                                            <button
                                                onClick={() => {
                                                    setActiveTab('create');
                                                    setFormData(prev => ({ ...prev, companyName: query }));
                                                }}
                                                className="mt-3 text-red-600 hover:text-red-800 font-medium"
                                            >
                                                Create "{query}" →
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                            <div className="text-center mb-6">
                                <PlusCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
                                <h2 className="text-2xl font-semibold text-gray-900 mb-2">Create New Company</h2>
                                <p className="text-gray-600">Add a new company to your database</p>
                            </div>

                            <div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                    {Object.entries(formData).map(([key, value]) =>
                                        renderFormField(key, value)
                                    )}
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
                                        {loading ? (
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                        ) : (
                                            <PlusCircle className="w-4 h-4" />
                                        )}
                                        Create Company
                                    </button>
                                </div>
                            </div>

                            {/* Success Message */}
                            {company && activeTab === 'create' && (
                                <div className="mt-8 bg-green-50 border border-green-200 rounded-xl p-6">
                                    <div className="flex items-start gap-4">
                                        <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                                        <div>
                                            <h3 className="text-lg font-semibold text-green-800 mb-1">
                                                Company Created Successfully!
                                            </h3>
                                            <p className="text-green-700">
                                                "{company.companyName}" has been added to your database.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
