import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import { notifySuccess } from "../utils/notifications";

export default function Dashboard() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    notifySuccess("Logged out successfully");
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-500 text-sm">
            Welcome back, <span className="font-medium">{user?.email}</span>
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow">
          Logout
        </button>
      </div>

      {/* MAIN GRID (SAAS STYLE) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* CARD 1 - MANAGE VEHICLES */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
          <h2 className="text-xl font-semibold mb-2">Manage Vehicles</h2>
          <p className="text-gray-500 mb-4">
            Add, edit, and manage your vehicle fleet and service records.
          </p>

          <Link
            to="/dashboard/vehicles"
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
            Go to Vehicle Manager
          </Link>
        </div>

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
          <h2 className="text-xl font-semibold mb-2">Public Vehicles</h2>
          <p className="text-gray-500 mb-4">
            Browse all available vehicles with search and filters.
          </p>

          <Link
            to="/vehicles"
            className="inline-block bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
            View Public Listing
          </Link>
        </div>

        <div className="bg-white p-6 rounded-xl shadow md:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Quick Overview</h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-gray-50 rounded">
              <p className="text-2xl font-bold">🚗</p>
              <p className="text-gray-500 text-sm">Vehicle System Active</p>
            </div>

            <div className="p-4 bg-gray-50 rounded">
              <p className="text-2xl font-bold">🔧</p>
              <p className="text-gray-500 text-sm">Service Tracking Enabled</p>
            </div>

            <div className="p-4 bg-gray-50 rounded">
              <p className="text-2xl font-bold">⚡</p>
              <p className="text-gray-500 text-sm">System Ready</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
