import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Eye,
  EyeOff,
  LockKeyhole,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (!token) {
      setError("Invalid password reset link.");
      return;
    }

    if (!password || !confirmPassword) {
      setError("Please enter both password fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/reset-password/${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password,
            confirmPassword,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to reset password.");
      }

      setSuccess(true);
      setMessage(
        data.message ||
          "Password reset successful. You can now login with your new password.",
      );

      setPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      setError(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="border border-gray-200  rounded-2xl shadow-xl p-8 text-center">
          {!success ? (
            <>
              <div className="flex justify-center mb-5">
                <div className="w-6 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                  <LockKeyhole
                    size={26}
                    className="text-gray-800 dark:text-gray-200"
                  />
                </div>
              </div>

              <div className="text-center mb-7">
                <h1 className="text-4 font-bold text-gray-900 dark:text-white">
                  Reset Password
                </h1>

                <p className="mt-2 text-8 text-gray-500 dark:text-gray-400">
                  Create a new password for your account.
                </p>
                <p className="mt-2 text-8 text-gray-500 dark:text-gray-400">
                  Note: Password must contain at least 6 characters.
                </p>
              </div>

              {error && (
                <div className="mb-5 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 dark:border-red-900/50 dark:bg-red-950/30 p-3">
                  <AlertCircle
                    size={18}
                    className="text-red-500 mt-0.5 shrink-0"
                  />

                  <p className="text-sm text-red-600 dark:text-red-400">
                    {error}
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block mb-2 text-6 font-medium text-gray-700 dark:text-gray-300">
                    New Password
                  </label>

                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter new password"
                      disabled={loading}
                      className="text-7 w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-black dark:bg-gray-950 text-gray-900 dark:text-white px-4 pr-4 outline-none focus:border-gray-500 dark:focus:border-gray-400 transition"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                    >
                      {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block mb-2 text-6 font-medium text-gray-700 dark:text-gray-300">
                    Confirm Password
                  </label>

                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm new password"
                      disabled={loading}
                      className="text-7 w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-black dark:bg-gray-950 text-gray-900 dark:text-white px-4 pr-4 outline-none focus:border-gray-500 dark:focus:border-gray-400 transition"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={19} />
                      ) : (
                        <Eye size={19} />
                      )}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className=" glassy-icon
                px-5
                py-3
                border
                border-gray-700
                rounded-lg
                text-sm
                sm:text-base
                transition"
                >
                  {loading ? "Resetting Password..." : "Reset Password"}
                </button>
              </form>

              <div className="text-center mt-6">
                <Link
                  to="/login"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:underline"
                >
                  Back to Login
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-5">
              <div className="flex justify-center mb-5">
                <div className="w-14 h-14 rounded-full bg-green-100 dark:bg-green-950/40 flex items-center justify-center">
                  <CheckCircle
                    size={30}
                    className="text-green-600 dark:text-green-400"
                  />
                </div>
              </div>

              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Password Reset Successful
              </h1>

              <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                {message}
              </p>

              <p className="mt-4 text-xs text-gray-400">
                Redirecting you to login...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
