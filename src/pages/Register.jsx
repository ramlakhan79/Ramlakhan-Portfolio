import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../utils/admin";

const Register = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
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

        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        if (form.password !== form.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (usernameStatus !== "available") {
            setError("Please choose an available username");
            return;
        }

        setLoading(true);

        try {
            const data = await registerUser(
                form.name,
                form.username,
                form.email,
                form.password
            );

            localStorage.setItem("token", data.token);

            navigate("/");
        } catch (error) {
            setError(error.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4">
            <div className="w-full max-w bg-gray-900 border border-gray-800 rounded-2xl p-8">

                <div className="mb-8">
                    <h1 className="text-suppBlue-200 text-3 font-bold text-white border-b border-gray-800 pb-2">
                        Create Account
                    </h1>

                    <p className="text-gray-400 mt-2">
                        Create your account to continue
                    </p>
                </div>

                {error && (
                    <div className="mb-5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">

                    <div>
                        <label className="block text-sm text-gray-300 mb-2">
                            Name
                        </label>

                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white outline-none focus:border-blue-500"
                            placeholder="Enter your name"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-300 mb-2">
                            Username
                        </label>

                        <input
                            type="text"
                            name="username"
                            value={form.username}
                            onChange={handleChange}
                            required
                            minLength={3}
                            maxLength={30}
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white outline-none focus:border-blue-500"
                            placeholder="Choose a username"
                        />

                        <div className="mt-2 text-sm">
                            {checkingUsername && (
                                <span className="text-gray-400">
                                    Checking username...
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
                                <span className="text-suppRed-500">
                                        {usernameStatus}
                                    </span>
                                )}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm text-gray-300 mb-2">
                            Email
                        </label>

                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white outline-none focus:border-blue-500"
                            placeholder="Enter email"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-300 mb-2">
                            Password
                        </label>

                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            required
                            minLength={6}
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white outline-none focus:border-blue-500"
                            placeholder="Enter password"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-300 mb-2">
                            Confirm Password
                        </label>

                        <input
                            type="password"
                            name="confirmPassword"
                            value={form.confirmPassword}
                            onChange={handleChange}
                            required
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white outline-none focus:border-blue-500"
                            placeholder="Confirm password"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={
                            loading ||
                            checkingUsername ||
                            usernameStatus !== "available"
                        }
                        className="glassy-icon px-3 shrink-0 border rounded-lg w-full py-3 text-white font-semibold disabled:opacity-50"
                    >
                        {loading ? "Creating account..." : "Create Account"}
                    </button>

                </form>

                <p className="text-center text-gray-400 text-sm mt-6">
                    Already have an account?{" "}
                    <button
                        type="button"
                        onClick={() => navigate("/login")}
                        className="text-blue-400 hover:text-blue-300"
                    >
                        Login
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Register;