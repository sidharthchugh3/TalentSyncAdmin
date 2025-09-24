import { Users, CheckCircle } from "lucide-react";

export default function RecruiterOnboardingForm({ register, errors, handleSubmit, onSubmit, loading, }) {
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="border-l-4 border-blue-600 bg-blue-50 px-6 py-4">
                <div className="flex items-center">
                    <Users className="w-6 h-6 text-blue-600 mr-3" />
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900">
                            Complete Your Recruiter Profile
                        </h2>
                        <p className="text-sm text-gray-600 mt-1">
                            Fill in your professional details to start recruiting
                        </p>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="p-8">
                <div className="mb-8">
                    <h3 className="text-lg font-medium text-gray-900 mb-6 pb-2 border-b border-gray-200">
                        Personal & Contact Details
                    </h3>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Job Title <span className="text-red-600">*</span>
                            </label>
                            <input
                                type="text"
                                {...register("jobTitle")}
                                placeholder="Senior HR Manager"
                                className={`w-full px-3 py-3 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${errors.jobTitle
                                    ? "border-red-300 bg-red-50"
                                    : "border-gray-300 hover:border-gray-400"
                                    }`}
                            />
                            {errors.jobTitle && (
                                <p className="text-red-600 text-xs mt-1">
                                    {errors.jobTitle.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Work Email <span className="text-red-600">*</span>
                            </label>
                            <input
                                type="email"
                                {...register("workEmail")}
                                placeholder="recruiter@company.com"
                                className={`w-full px-3 py-3 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${errors.workEmail
                                    ? "border-red-300 bg-red-50"
                                    : "border-gray-300 hover:border-gray-400"
                                    }`}
                            />
                            {errors.workEmail && (
                                <p className="text-red-600 text-xs mt-1">
                                    {errors.workEmail.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                LinkedIn Profile
                            </label>
                            <input
                                type="url"
                                {...register("linkedIn")}
                                placeholder="https://linkedin.com/in/username"
                                className="w-full px-3 py-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 transition-colors"
                            />
                            {errors.linkedIn && (
                                <p className="text-red-600 text-xs mt-1">{errors.linkedIn.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Department
                            </label>
                            <input
                                type="text"
                                {...register("department")}
                                placeholder="Human Resources / Talent Acquisition"
                                className="w-full px-3 py-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 transition-colors"
                            />
                        </div>
                    </div>
                </div>

                <div className="mb-8">
                    <h3 className="text-lg font-medium text-gray-900 mb-6 pb-2 border-b border-gray-200">
                        Recruitment Preferences
                    </h3>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Recruitment Type <span className="text-red-600">*</span>
                            </label>
                            <select
                                {...register("recruitmentType")}
                                className={`w-full px-3 py-3 border rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${errors.recruitmentType
                                    ? "border-red-300 bg-red-50"
                                    : "border-gray-300 hover:border-gray-400"
                                    }`}
                            >
                                <option value="">Select recruitment type</option>
                                <option value="occasional">Occasional - Sporadic hiring</option>
                                <option value="mass">Mass - High volume hiring</option>
                                <option value="regular">Regular - Ongoing recruitment</option>
                            </select>
                            {errors.recruitmentType && (
                                <p className="text-red-600 text-xs mt-1">{errors.recruitmentType.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Interview Mode <span className="text-red-600">*</span>
                            </label>
                            <select
                                {...register("interviewMode")}
                                className={`w-full px-3 py-3 border rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${errors.interviewMode
                                    ? "border-red-300 bg-red-50"
                                    : "border-gray-300 hover:border-gray-400"
                                    }`}
                            >
                                <option value="">Select interview mode</option>
                                <option value="online">Online - Virtual interviews</option>
                                <option value="offline">Offline - In-person interviews</option>
                                <option value="hybrid">Hybrid - Mix of both</option>
                            </select>
                            {errors.interviewMode && (
                                <p className="text-red-600 text-xs mt-1">{errors.interviewMode.message}</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="mb-8">
                    <h3 className="text-lg font-medium text-gray-900 mb-6 pb-2 border-b border-gray-200">
                        Verification Documents
                    </h3>

                    <div className="grid grid-cols-1 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Company ID Card (URL)
                            </label>
                            <input
                                type="url"
                                {...register("idCardUrl")}
                                placeholder="https://cdn.company.com/id-card.jpg"
                                className="w-full px-3 py-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 transition-colors"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                Provide a URL to your company ID card for verification (optional)
                            </p>
                            {errors.idCardUrl && (
                                <p className="text-red-600 text-xs mt-1">{errors.idCardUrl.message}</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                    <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full sm:w-auto bg-blue-600 text-white font-medium py-3 px-8 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors min-w-[200px]"
                        >
                            {loading ? (
                                <div className="flex items-center justify-center">
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                    Submitting...
                                </div>
                            ) : (
                                <div className="flex items-center justify-center">
                                    <CheckCircle className="w-4 h-4 mr-2" />
                                    Complete Onboarding
                                </div>
                            )}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

