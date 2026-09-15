import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { logoutAdmin } from "../utils/admin";

const ContributorDashboard = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "null");

   const handleLogout = () => {
      logoutAdmin();
      navigate("/login");
    };

  return (
    <div className="min-h-screen bg-gray-950 text-white px-4 py-10">
      <div className="max-w-6xl mx-auto">

        <div className="mb-10">
          <h1 className="text-3xl font-bold">
            Welcome, {user?.name}
          </h1>

          <p className="text-gray-400 mt-2">
            Manage your articles and contributions.
          </p>
          <button
            onClick={handleLogout}
            className="glassy-icon px-4 py-2.5 border rounded-lg"
          >
            Logout
          </button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">

          <Link
            to="/dashboard/articles"
            className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition"
          >
            <h2 className="text-xl font-semibold">
              My Articles
            </h2>

            <p className="text-gray-400 mt-2">
              View and manage your articles.
            </p>
          </Link>

          <Link
            to="/dashboard/articles/create"
            className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition"
          >
            <h2 className="text-xl font-semibold">
              Create Article
            </h2>

            <p className="text-gray-400 mt-2">
              Write and publish a new article.
            </p>
          </Link>

          <Link
            to="/profile"
            className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition"
          >
            <h2 className="text-xl font-semibold">
              My Profile
            </h2>

            <p className="text-gray-400 mt-2">
              View your account information.
            </p>
          </Link>

        </div>
      </div>
    </div>
  );
};

export default ContributorDashboard;