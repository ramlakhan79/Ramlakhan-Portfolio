import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateUser = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    role: "viewer",
  });

  const [usernameStatus, setUsernameStatus] = useState("");
  const [checkingUsername, setCheckingUsername] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const username = form.username.trim().toLowerCase();

    setUsernameStatus("");

    if (username.length < 3) {
      setCheckingUsername(false);
      return;
    }

    if (!/^[a-z0-9_]+$/.test(username)) {
      setUsernameStatus(
        "Only lowercase letters, numbers and underscores are allowed"
      );
      setCheckingUsername(false);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setCheckingUsername(true);

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/auth/check-username?username=${encodeURIComponent(username)}`
        );

        const data = await response.json();

        if (data.available) {
          setUsernameStatus("available");
        } else {
          setUsernameStatus(data.message);
        }
      } catch {
        setUsernameStatus("Unable to check username");
      } finally {
        setCheckingUsername(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [form.username]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: name === "username" ? value.toLowerCase() : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(form),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create user");
      }

      navigate("/admin/users");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white px-4 py-8">
      <div className="max-w-xl mx-auto">

        <header className="border-b border-gray-800 bg-gray-900">
          <div className="max-w-4xl mx-auto px-6 py-5 flex justify-between items-center">

            <h1 className="text-2xl font-bold">
              Create User
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
          Create a new account and assign a role
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
            minLength={3}
            placeholder="Username"
            className="input-style"
          />
          <div className="mt-2 text-sm">
            {checkingUsername && (
              <span className="text-gray-400">
                {/* Checking username... */}
                <div className="custom-loader-username"></div>
              </span>
            )}

            {!checkingUsername &&
              usernameStatus === "available" && (
                <span className="text-suppGreen-500">
                  ✓ Username is available
                </span>
              )}

            {!checkingUsername &&
              usernameStatus &&
              usernameStatus !== "available" && (
                <span className="flex flex-wrap text-suppRed-500">
                  {usernameStatus}
                </span>
              )}
          </div>

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="Email"
            className="input-style"
          />

          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            minLength={6}
            placeholder="Password"
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
            disabled={loading ||
              checkingUsername ||
              usernameStatus !== "available"}
            className="glassy-icon w-full border rounded-lg py-3 font-semibold disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create User"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;