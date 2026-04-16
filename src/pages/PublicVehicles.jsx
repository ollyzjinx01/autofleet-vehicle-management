import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchVehicles } from "../api/api";
import { getUniqueYears } from "../utils/vehicleUtils";
import { notifyInfo } from "../utils/notifications";
import VehicleCard from "../components/VehicleCard";
import { Link } from "react-router-dom";

export default function PublicVehicles() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["vehicles"],
    queryFn: fetchVehicles,
  });

  const [search, setSearch] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [page, setPage] = useState(1);

  const itemsPerPage = 3;

  // ⭐ LOADING STATE (SKELETON UX - FINAL POLISH)
  if (isLoading) {
    return (
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-32 bg-gray-200 animate-pulse rounded-lg" />
        ))}
      </div>
    );
  }

  // ⭐ ERROR STATE (CLEAN UX)
  if (error) {
    return (
      <p className="p-6 text-red-500 font-medium">
        Error loading vehicles. Please try again.
      </p>
    );
  }

  // UNIQUE YEARS
  const uniqueYears = getUniqueYears(data || []);

  // FILTER
  const filtered = data?.filter((v) => {
    const matchesSearch = `${v.make} ${v.model} ${v.year}`
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesYear = yearFilter ? v.year.toString() === yearFilter : true;

    return matchesSearch && matchesYear;
  });

  // PAGINATION
  const totalPages = Math.ceil((filtered?.length || 0) / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedData = filtered?.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Public Vehicles</h1>

        <Link to="/" className="text-blue-600 underline">
          Back to Dashboard
        </Link>
      </div>

      {/* SEARCH + FILTER */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          className="border p-2 w-full max-w-md"
          placeholder="Search make, model, year..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);

            // UX FEEDBACK (optional polish)
            notifyInfo("Filtering vehicles...");
          }}
        />

        <select
          className="border p-2 w-full max-w-xs"
          value={yearFilter}
          onChange={(e) => {
            setYearFilter(e.target.value);
            setPage(1);

            notifyInfo("Year filter applied");
          }}>
          <option value="">All Years</option>
          {uniqueYears?.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {/* ⭐ EMPTY STATE INSIDE GRID (FIXED UX APPROACH) */}
        {paginatedData?.length === 0 ? (
          <div className="col-span-full text-center py-10 text-gray-500">
            🚘 No vehicles found matching your search
          </div>
        ) : (
          paginatedData?.map((v) => <VehicleCard key={v.id} vehicle={v} />)
        )}
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center items-center gap-3 mt-6">
        <button
          className="px-3 py-1 border disabled:opacity-50"
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}>
          Prev
        </button>

        <span>
          Page {page} of {totalPages || 1}
        </span>

        <button
          className="px-3 py-1 border disabled:opacity-50"
          disabled={page >= totalPages}
          onClick={() => setPage((p) => p + 1)}>
          Next
        </button>
      </div>
    </div>
  );
}
