
const Badge = ({ children, tone = "blue" }) => {
    const tones = {
        blue: "bg-blue-50 text-blue-700",
        gray: "bg-gray-100 text-gray-700",
        green: "bg-green-50 text-green-700",
    };
    return (
        <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs ${tones[tone]}`}
        >
            {children}
        </span>
    );
};

const JobCard = ({ job }) => {
    // Format salary
    const salary = job.salaryRange
        ? `${job.salaryRange.currency} ${job.salaryRange.min} - ${job.salaryRange.max}`
        : "Not disclosed";

    const postedDate = job.createdAt
        ? new Date(job.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        })
        : "Unknown";

    return (
        <article className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="flex items-start gap-4">
                {/* Logo placeholder (replace when company has logo) */}
                <div className="grid h-12 w-12 place-items-center rounded-lg border border-gray-200 bg-gray-50">
                    <span className="text-xs text-gray-500">Logo</span>
                </div>

                {/* Main */}
                <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-base font-semibold text-gray-900">
                            {job.title}
                        </h3>
                        <Badge tone="blue">{job.department}</Badge>
                        <Badge tone="gray">{job.roleCategory}</Badge>
                    </div>

                    <div className="grid h-12 w-12 place-items-center rounded-lg border border-gray-200 bg-gray-50">
                        {job.company?.companyLogoUrl ? (
                            <img
                                src={job.company.companyLogoUrl}
                                alt={job.company.companyName}
                                className="h-10 w-10 object-contain"
                            />
                        ) : (
                            <span className="text-xs text-gray-500">Logo</span>
                        )}
                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-gray-600">
                        <Badge tone="gray">
                            {job.employmentType.replace("_", " ")}
                        </Badge>
                        <span className="rounded-md bg-gray-100 px-2 py-0.5">{salary}</span>
                        <span className="rounded-md bg-gray-100 px-2 py-0.5">
                            {job.location}
                        </span>
                        <span
                            className={`rounded-md px-2 py-0.5 ${job.status === "active"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-gray-200 text-gray-600"
                                }`}
                        >
                            {job.status}
                        </span>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col items-end gap-2">
                    <span className="text-xs text-gray-500">{postedDate}</span>
                    <button className="rounded-md border border-blue-600 bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-blue-700">
                        Job Details
                    </button>
                </div>
            </div>
        </article>
    );
};

export default JobCard;
