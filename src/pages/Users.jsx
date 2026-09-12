import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
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
        `${import.meta.env.VITE_API_URL}/api/users/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
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

  return (
    <div className="min-h-screen bg-gray-950 text-white px-4 py-8">
      <div className="max-w-6xl mx-auto">

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Users</h1>
            <p className="text-gray-400 mt-1">
              Manage users and their roles
            </p>
          </div>

          <Link
            to="/admin/users/create"
            className="glassy-icon border border-gray-700 rounded-lg px-5 py-3 text-center"
          >
            Create User
          </Link>
        </div>

        {error && (
          <div className="mb-5 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg px-4 py-3">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-gray-400">Loading users...</div>
        ) : users.length === 0 ? (
          <div className="text-gray-400">No users found.</div>
        ) : (
          <div className="overflow-x-auto border border-gray-800 rounded-xl">
            <table className="w-full text-left">
              <thead className="bg-gray-900 border-b border-gray-800">
                <tr>
                  <th className="px-5 py-4">Name</th>
                  <th className="px-5 py-4">Username</th>
                  <th className="px-5 py-4">Email</th>
                  <th className="px-5 py-4">Role</th>
                  <th className="px-5 py-4">Actions</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr
                    key={user._id}
                    className="border-b border-gray-800 last:border-0"
                  >
                    <td className="px-5 py-4">
                      {user.name}
                    </td>

                    <td className="px-5 py-4 text-gray-400">
                      @{user.username}
                    </td>

                    <td className="px-5 py-4 text-gray-400">
                      {user.email}
                    </td>

                    <td className="px-5 py-4">
                      <span className="capitalize bg-gray-800 px-3 py-1 rounded-full text-sm">
                        {user.role}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex gap-3">
                        <Link
                          to={`/admin/users/edit/${user._id}`}
                          className="text-blue-400 hover:text-blue-300"
                        >
                          Edit
                        </Link>

                        <button
                          onClick={() =>
                            deleteUser(user._id)
                          }
                          className="text-red-400 hover:text-red-300"
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
        )}
      </div>
    </div>
  );
};

export default Users;