import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    role: "viewer",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/users/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load user");
        }

        setForm({
          name: data.user.name || "",
          username: data.user.username || "",
          email: data.user.email || "",
          role: data.user.role || "viewer",
        });
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSaving(true);

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: form.name,
            username: form.username,
            email: form.email,
            role: form.role,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update user");
      }

      navigate("/admin/users");
    } catch (error) {
      setError(error.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 text-gray-400 p-8">
        Loading user...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white px-4 py-8">
      <div className="max-w-xl mx-auto">
        <header className="border-b border-gray-800 bg-gray-900">
          <div className="max-w-4xl mx-auto px-6 py-5 flex justify-between items-center">

            <h1 className="text-2xl font-bold">
              Edit User
            </h1>

            <button
              onClick={() => navigate("/admin/users")}
              className="glassy-icon px-6 shrink-0 border rounded-lg"
            >
              ← Back
            </button>

          </div>
        </header>        

        <p className="text-gray-400 mt-1 mb-8">
          Update user details and role
        </p>

        {error && (
          <div className="mb-5 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg px-4 py-3">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-5"
        >
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="Name"
            className="input-style"
          />

          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            required
            placeholder="Username"
            className="input-style"
          />

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="Email"
            className="input-style"
          />

          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="input-style"
          >
            <option value="viewer">Viewer</option>
            <option value="contributor">Contributor</option>
            <option value="admin">Admin</option>
          </select>

          <button
            type="submit"
            disabled={saving}
            className="glassy-icon w-full border rounded-lg py-3 font-semibold disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditUser;