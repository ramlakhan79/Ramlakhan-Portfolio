import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Users = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openMenu, setOpenMenu] = useState(null);

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

  const currentUser = JSON.parse(localStorage.getItem("user"));

  const myUsers = users.filter((user) => user.role !== currentUser?.role);

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

  const sendResetPassword = async (email) => {
    if (!window.confirm(`Send a password reset link to ${email}?`)) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            email,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to send password reset email");
      }

      alert(data.message || "Password reset email sent successfully.");
    } catch (error) {
      alert(error.message);
    }
  };

  const sendVerificationEmail = async (email) => {
    if (!window.confirm(`Send a verification email to ${email}?`)) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/resend-verification`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            email,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to send verification email");
      }

      alert(data.message || "Verification email sent successfully.");
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
            <h1 className="text-4 sm:text-3xl font-bold">Users</h1>

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
        ) : myUsers.length === 0 ? (
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
                      Email Status
                    </th>

                    <th className="px-5 py-4 text-sm font-medium text-gray-300">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {myUsers.map((user) => (
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
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full border text-xs font-medium ${
                            user.emailVerified
                              ? "text-suppGreen-400 bg-green-500/10 border-green-500/20"
                              : "text-suppRed-400 bg-yellow-500/10 border-yellow-500/20"
                          }`}
                        >
                          {user.emailVerified ? "Verified" : "N/V"}
                        </span>
                      </td>
                      {/* <td className="px-5 py-4">
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
                          <button
                            onClick={() => sendResetPassword(user.email)}
                            className="
            glassy-icon
            border
            border-gray-700
            rounded-lg
            px-4
            py-2.5
            text-sm
            text-yellow-400
            transition
        "
                          >
                           Reset Password
                          </button>

                          {!user.emailVerified && (
                            <button
                              onClick={() => sendVerificationEmail(user.email)}
                              className="
                glassy-icon
                border
                border-gray-700
                rounded-lg
                px-4
                py-2.5
                text-sm
                text-green-400
                transition
            "
                            >
                              Verify Email
                            </button>
                          )}
                        </div>
                      </td> */}
                      <td className="px-5 py-4">
                        <div className="relative">
                          <button
                            type="button"
                            onClick={() =>
                              setOpenMenu(
                                openMenu === user._id ? null : user._id
                              )
                            }
                            className="
                glassy-icon
                border
                border-gray-700
                rounded-lg
                px-4
                py-2.5
                text-sm
                text-gray-300
                hover:text-white
                transition
                flex
                items-center
                gap-2
            "
                          >
                            Actions

                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className={`transition-transform ${openMenu === user._id
                                  ? "rotate-180"
                                  : ""
                                }`}
                            >
                              <path d="m6 9 6 6 6-6" />
                            </svg>
                          </button>

                          {openMenu === user._id && (
                            <div
                              className="
                    absolute
                    right-0
                    top-full
                    mt-2
                    w-48
                    bg-neutGray-800
                    border
                    border-gray-800
                    rounded-xl
                    shadow-xl
                    overflow-hidden
                    z-50
                "
                            >
                              {/* Edit */}
                              <Link
                                to={`/admin/users/edit/${user._id}`}
                                onClick={() => setOpenMenu(null)}
                                className="
                        block
                        w-full
                        px-4
                        py-3
                        text-sm
                        text-gray-300
                        hover:bg-primBlue-400
                        hover:text-white
                        transition
                    "
                              >
                                Edit
                              </Link>

                              {/* Reset Password */}
                              <button
                                type="button"
                                onClick={() => {
                                  setOpenMenu(null);
                                  sendResetPassword(user.email);
                                }}
                                className="
                       block
                        w-full
                        text-left
                        px-4
                        py-3
                        text-sm
                        text-gray-300
                        hover:bg-primBlue-400
                        hover:text-white
                        transition
                    "
                              >
                                Reset Password
                              </button>

                              {/* Verify Email */}
                              {!user.emailVerified && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    setOpenMenu(null);
                                    sendVerificationEmail(user.email);
                                  }}
                                  className="
                            block
                        w-full
                        text-left
                        px-4
                        py-3
                        text-sm
                        text-gray-300
                        hover:bg-primBlue-400
                        hover:text-white
                        transition
                        "
                                >
                                  Verify Email
                                </button>
                              )}

                              {/* Delete */}
                              <button
                                type="button"
                                onClick={() => {
                                  setOpenMenu(null);
                                  deleteUser(user._id);
                                }}
                                className="
                         block
                        w-full
                        text-left
                        px-4
                        py-3
                        text-sm
                        text-gray-300
                        hover:bg-primBlue-400
                        hover:text-white
                        transition
                    "
                              >
                                Delete
                              </button>
                            </div>
                          )}
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
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full border text-xs font-medium ${user.emailVerified
                          ? "text-suppGreen-400 bg-green-500/10 border-green-500/20"
                          : "text-suppRed-400 bg-yellow-500/10 border-yellow-500/20"
                        }`}
                    >
                      {user.emailVerified ? "Verified" : "N/V"}
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
                        <button
                          onClick={() => sendResetPassword(user.email)}
                          className="
            glassy-icon
            border
            border-gray-700
            rounded-lg
            px-4
            py-2.5
            text-sm
            text-yellow-400
            transition
        "
                        >
                          Reset Password
                        </button>

                        {!user.emailVerified && (
                          <button
                            onClick={() => sendVerificationEmail(user.email)}
                            className="
                glassy-icon
                border
                border-gray-700
                rounded-lg
                px-4
                py-2.5
                text-sm
                text-green-400
                transition
            "
                          >
                            Verify Email
                          </button>
                        )}
                    
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
