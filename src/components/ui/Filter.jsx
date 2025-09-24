import { useState } from "react";

function Section({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="rounded-lg border border-gray-200 bg-white">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between px-3 py-2 text-left text-sm font-medium text-gray-800"
      >
        <span>{title}</span>
        <svg
          className={`h-4 w-4 text-gray-500 transition-transform ${
            open ? "rotate-180" : ""
          }`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.25 8.29a.75.75 0 01-.02-1.08z" />
        </svg>
      </button>
      {open && <div className="px-3 pb-3">{children}</div>}
    </div>
  );
}

export default function Filters({
  query,
  setQuery,
  filters,
  setFilters,
  resetFilters,
}) {
  const categories = [
    "Healthcare & Trainers",
    "Media",
    "Construction",
    "Commerce",
    "Finance",
  ];
  const types = ["Full-time", "Part-time", "Contract", "Internship"];
  const tags = ["Hot Job", "Urgent", "Remote Friendly"];

  const toggleIn = (key, value) =>
    setFilters((f) => {
      const arr = new Set(f[key]);
      arr.has(value) ? arr.delete(value) : arr.add(value);
      return { ...f, [key]: Array.from(arr) };
    });

  return (
    <div className="space-y-3">
      {/* Search */}
      <div className="rounded-lg border border-gray-200 bg-white p-3">
        <label className="mb-1 block text-xs font-medium text-gray-700">
          Search by Job Title
        </label>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g. Backend Developer"
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-800 placeholder:text-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-300"
        />
      </div>

      <Section title="Location">
        <input
          value={filters.location}
          onChange={(e) => setFilters((f) => ({ ...f, location: e.target.value }))}
          placeholder="Choose city"
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-800 placeholder:text-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-300"
        />
      </Section>

      <Section title="Category">
        <ul className="space-y-2">
          {categories.map((c) => (
            <li key={c} className="flex items-center gap-2">
              <input
                id={`cat-${c}`}
                type="checkbox"
                checked={filters.categories.includes(c)}
                onChange={() => toggleIn("categories", c)}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-400"
              />
              <label htmlFor={`cat-${c}`} className="text-sm text-gray-700">
                {c}
              </label>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Job Type">
        <ul className="space-y-2">
          {types.map((t) => (
            <li key={t} className="flex items-center gap-2">
              <input
                id={`type-${t}`}
                type="checkbox"
                checked={filters.types.includes(t)}
                onChange={() => toggleIn("types", t)}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-400"
              />
              <label htmlFor={`type-${t}`} className="text-sm text-gray-700">
                {t}
              </label>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Tags" defaultOpen={false}>
        <div className="flex flex-wrap gap-2">
          {tags.map((t) => {
            const active = filters.tags.includes(t);
            return (
              <button
                key={t}
                onClick={() => toggleIn("tags", t)}
                className={`rounded-full px-3 py-1 text-xs ${
                  active
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {t}
              </button>
            );
          })}
        </div>
      </Section>

      <button
        onClick={resetFilters}
        className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 hover:bg-gray-50"
      >
        Reset filters
      </button>

      {/* Promo card placeholder */}
      <div className="hidden lg:block rounded-xl border border-gray-200 bg-gray-100 p-5 text-center text-gray-600">
        <div className="mb-2 text-sm font-semibold text-gray-800">We’re hiring</div>
        <p className="text-xs">Apply today!</p>
      </div>
    </div>
  );
}
