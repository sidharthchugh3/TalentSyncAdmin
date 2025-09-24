import { useEffect, useMemo, useState } from "react";
import JobCard from "../../components/ui/JobsCard";
import Filters from "../../components/ui/Filter.jsx";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllJobs } from "../../store/slices/JobsSlice";

const SORTS = [
    { label: "Latest", value: "latest" },
    { label: "Salary: High to Low", value: "salary_desc" },
    { label: "Salary: Low to High", value: "salary_asc" },
    { label: "A–Z", value: "az" },
];

export default function Jobs() {
    const dispatch = useDispatch();
    const JOBS = useSelector((state) => state.jobs.jobs) || [];

    useEffect(() => {
        dispatch(fetchAllJobs()).then((res) =>
            console.log("Thunk result:", res)
        );
    }, [dispatch]);

    console.log("Before fetch:", JOBS);

    useEffect(() => {
        dispatch(fetchAllJobs());
    }, [dispatch]);

    const [query, setQuery] = useState("");
    const [sort, setSort] = useState("latest");
    const [filters, setFilters] = useState({
        location: "",
        categories: [],
        types: [],
        experience: [],
        datePosted: "",
        salary: [0, 250000],
        tags: [],
    });

    const filtered = useMemo(() => {
        let list = JOBS.filter((j) =>
            [j.title, j.department, j.roleCategory, j.location]
                .join(" ")
                .toLowerCase()
                .includes(query.trim().toLowerCase())
        );

        if (filters.location) {
            list = list.filter((j) =>
                j.location.toLowerCase().includes(filters.location.toLowerCase())
            );
        }

        if (filters.categories.length) {
            list = list.filter((j) => filters.categories.includes(j.roleCategory));
        }

        if (filters.types.length) {
            list = list.filter((j) => filters.types.includes(j.employmentType));
        }

        list = list.filter((j) => {
            if (!j.salaryRange) return true;
            const min = j.salaryRange.min || 0;
            const max = j.salaryRange.max || 0;
            return (
                min >= filters.salary[0] &&
                (filters.salary[1] === 0 || max <= filters.salary[1])
            );
        });

        // Sorting
        switch (sort) {
            case "az":
                list.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case "salary_desc":
                list.sort(
                    (a, b) => (b.salaryRange?.max || 0) - (a.salaryRange?.max || 0)
                );
                break;
            case "salary_asc":
                list.sort(
                    (a, b) => (a.salaryRange?.min || 0) - (b.salaryRange?.min || 0)
                );
                break;
            default:
                break;
        }

        return list;
    }, [query, sort, filters, JOBS]);

    // Pagination
    const [page, setPage] = useState(1);
    const perPage = 5;
    const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
    const pageItems = filtered.slice((page - 1) * perPage, page * perPage);

    const resetFilters = () =>
        setFilters({
            location: "",
            categories: [],
            types: [],
            experience: [],
            datePosted: "",
            salary: [0, 250000],
            tags: [],
        });

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Banner */}
            <header className="relative bg-gradient-to-r from-blue-900 via-blue-700 to-blue-600 py-10 text-center text-white">
                <div className="absolute inset-0 bg-black opacity-30"></div>
                <div className="relative z-10 max-w-4xl mx-auto mt-13 px-4">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold drop-shadow-lg">
                        Available Jobs
                    </h1>
                    <p className="mt-4 text-lg text-indigo-100 max-w-2xl mx-auto">
                        Explore thousands of opportunities across industries and locations.
                        Start your journey today!
                    </p>
                </div>
            </header>

            {/* Main */}
            <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
                <div className="grid gap-6 lg:grid-cols-12">
                    {/* Filters */}
                    <aside className="lg:col-span-3">
                        <Filters
                            query={query}
                            setQuery={setQuery}
                            filters={filters}
                            setFilters={setFilters}
                            resetFilters={resetFilters}
                        />
                    </aside>

                    {/* Job Results */}
                    <section className="lg:col-span-9">
                        {/* Toolbar */}
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-6">
                            <p className="text-sm text-gray-600">
                                Showing {pageItems.length} of {filtered.length} results
                            </p>
                            <div className="flex items-center gap-2">
                                <label htmlFor="sort" className="text-sm text-gray-600">
                                    Sort by
                                </label>
                                <select
                                    id="sort"
                                    value={sort}
                                    onChange={(e) => setSort(e.target.value)}
                                    className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 focus:border-blue-400 focus:ring-2 focus:ring-blue-300"
                                >
                                    {SORTS.map((s) => (
                                        <option key={s.value} value={s.value}>
                                            {s.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Job List */}
                        <div className="space-y-4">
                            {pageItems.map((job) => (
                                <JobCard key={job.id} job={job} />
                            ))}
                            {pageItems.length === 0 && (
                                <div className="rounded-xl border border-gray-200 bg-white p-6 text-gray-600 text-center">
                                    No jobs found with the current filters.
                                </div>
                            )}
                        </div>

                        {/* Pagination */}
                        <div className="mt-8 flex items-center justify-between">
                            <button
                                className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                                disabled={page <= 1}
                                onClick={() => setPage((p) => Math.max(1, p - 1))}
                            >
                                Prev
                            </button>
                            <div className="flex items-center gap-2">
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                                    (n) => (
                                        <button
                                            key={n}
                                            onClick={() => setPage(n)}
                                            className={`h-8 w-8 rounded-md border px-2 text-sm ${n === page
                                                ? "border-blue-600 bg-blue-50 text-blue-700"
                                                : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                                                }`}
                                        >
                                            {n}
                                        </button>
                                    )
                                )}
                            </div>
                            <button
                                className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                                disabled={page >= totalPages}
                                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                            >
                                Next
                            </button>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}
