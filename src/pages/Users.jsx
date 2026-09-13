import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Users = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users`,
        {
          headers: {
            Authorization: `Bearer ${token} `,
          },
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to load users");
      }

      setUsers(data.users || []);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/${id} `,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token} `,
          },
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete user");
      }

      setUsers((prev) => prev.filter((user) => user._id !== id));
    } catch (error) {
      alert(error.message);
    }
  };

  const getRoleClass = (role) => {
    switch (role?.toLowerCase()) {
      case "admin":
        return "text-red-400 bg-red-500/10 border-red-500/20";

      case "contributor":
        return "text-blue-400 bg-blue-500/10 border-blue-500/20";

      case "viewer":
        return "text-gray-400 bg-gray-500/10 border-gray-500/20";

      default:
        return "text-gray-400 bg-gray-500/10 border-gray-500/20";
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white px-4 py-6 sm:px-6 sm:py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col gap-5 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Users</h1>

            <p className="text-gray-400 text-sm sm:text-base mt-1">
              Manage users and their roles
            </p>
          </div>

          {/* Header buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/admin/users/create"
              className="
                glassy-icon
                border border-gray-700
                rounded-lg
                px-5
                py-3
                text-center
                text-sm
                sm:text-base
                transition
              "
            >
              Create User
            </Link>

            <button
              onClick={() => navigate("/admin")}
              className="
                glassy-icon
                px-5
                py-3
                border
                border-gray-700
                rounded-lg
                text-sm
                sm:text-base
                transition
              "
            >
              ← Back
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div
            className="
            mb-5
            bg-red-500/10
            border
            border-red-500/30
            text-red-400
            rounded-lg
            px-4
            py-3
            text-sm
          "
          >
            {error}
          </div>
        )}

        {/* Loading */}
        {loading ? (
          <div className="flex justify-center py-16">
            <div className="loader-container">
              <div className="custom-loader"></div>
            </div>
          </div>
        ) : users.length === 0 ? (
          <div
            className="
            text-center
            text-gray-400
            py-16
            border
            border-gray-800
            rounded-xl
            bg-gray-900/40
          "
          >
            No users found.
          </div>
        ) : (
          <>
            {/* ================= DESKTOP TABLE ================= */}

            <div className="hidden md:block overflow-x-auto border border-gray-800 rounded-xl bg-gray-900">
              <table className="w-full text-left">
                <thead className="bg-gray-900 border-b border-gray-800">
                  <tr>
                    <th className="px-5 py-4 text-sm font-medium text-gray-300">
                      Name
                    </th>

                    <th className="px-5 py-4 text-sm font-medium text-gray-300">
                      Username
                    </th>

                    <th className="px-5 py-4 text-sm font-medium text-gray-300">
                      Email
                    </th>

                    <th className="px-5 py-4 text-sm font-medium text-gray-300">
                      Role
                    </th>

                    <th className="px-5 py-4 text-sm font-medium text-gray-300">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {users.map((user) => (
                    <tr
                      key={user._id}
                      className="
                        border-b
                        border-gray-800
                        last:border-0
                        hover:bg-gray-800/40
                        transition
                      "
                    >
                      <td className="px-5 py-4">
                        <span className="font-medium text-white">
                          {user.name}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-gray-400">
                        @{user.username}
                      </td>

                      <td className="px-5 py-4 text-gray-400">{user.email}</td>

                      <td className="px-5 py-4">
                        <span
                          className={`
inline - flex
items - center
px - 3
py - 1
rounded - full
border
text - xs
font - medium
capitalize
                            ${getRoleClass(user.role)}
`}
                        >
                          {user.role}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-4">
                          <Link
                            to={`/admin/users/edit/${user._id} `}
                            className="
                              flex-1
                        glassy-icon
                        border
                        border-gray-700
                        rounded-lg
                        px-4
                        py-2.5
                        text-sm
                        text-red-400
                            "
                          >
                            Edit
                          </Link>

                          <button
                            onClick={() => deleteUser(user._id)}
                            className="
                              flex-1
                        glassy-icon
                        border
                        border-gray-700
                        rounded-lg
                        px-4
                        py-2.5
                        text-sm
                        text-red-400
                            "
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* ================= MOBILE CARDS ================= */}

            <div className="md:hidden space-y-4">
              {users.map((user) => (
                <div
                  key={user._id}
                  className="
                    bg-gray-900
                    border
                    border-gray-800
                    rounded-2xl
                    p-5
                    hover:border-gray-700
                    transition
                  "
                >
                  {/* User header */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <h2 className="text-base sm:text-lg font-semibold text-white truncate">
                        {user.name}
                      </h2>

                      <p className="text-sm text-gray-500 mt-1 truncate">
                        @{user.username}
                      </p>
                    </div>

                    <span
                      className={`
shrink - 0
inline - flex
items - center
px - 2.5
py - 1
rounded - full
border
text - xs
font - medium
capitalize
                        ${getRoleClass(user.role)}
`}
                    >
                      {user.role}
                    </span>
                  </div>

                  {/* User details */}
                  <div className="mt-5 pt-4 border-t border-gray-800">
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Email</p>

                        <p className="text-sm text-gray-300 break-all">
                          {user.email}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-500 mb-1">User ID</p>

                        <p className="text-xs text-gray-600 break-all">
                          {user._id}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div
                    className="
                    flex
                    gap-3
                    mt-5
                    pt-4
                    border-t
                    border-gray-800
                  "
                  >
                    <Link
                      to={`/admin/users/edit/${user._id}`}
                      className="
                        flex-1
                        text-center
                        glassy-icon
                        border
                        border-gray-700
                        rounded-lg
                        px-4
                        py-2.5
                        text-sm
                        text-blue-400
                      "
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => deleteUser(user._id)}
                      className="
                        flex-1
                        glassy-icon
                        border
                        border-gray-700
                        rounded-lg
                        px-4
                        py-2.5
                        text-sm
                        text-red-400
                      "
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Users;
