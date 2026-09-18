import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  CheckCircle,
  AlertCircle,
  MailCheck,
  LoaderCircle,
} from "lucide-react";

export default function VerifyEmail() {
  const { token } = useParams();

  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setLoading(false);
        setError("Invalid email verification link.");
        return;
      }

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/auth/verify-email/${token}`,
          {
            method: "GET",
          },
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Email verification failed.");
        }

        setSuccess(true);
        setMessage(
          data.message || "Your email has been successfully verified.",
        );
      } catch (error) {
        setError(error.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <div className=" flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="border border-gray-200  rounded-2xl shadow-xl p-8 text-center">
          {loading && (
            <>
              <div className="flex justify-center mb-5">
                <div className="w-6 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                  <LoaderCircle
                    size={28}
                    className="text-gray-700 dark:text-gray-300 animate-spin"
                  />
                </div>
              </div>

              <h1 className="text-4 font-bold text-gray-900 dark:text-white">
                Verifying Your Email
              </h1>

              <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                Please wait while we verify your email address.
              </p>
            </>
          )}

          {!loading && success && (
            <>
              <div className="flex justify-center mb-5">
                <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-950/40 flex items-center justify-center">
                  <CheckCircle
                    size={34}
                    className="text-green-600 dark:text-green-400"
                  />
                </div>
              </div>

              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Email Verified!
              </h1>

              <p className="mt-3 text-sm leading-6 text-gray-500 dark:text-gray-400">
                {message}
              </p>

              <Link
                to="/login"
                className="inline-block mt-7 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-6 py-3 font-semibold hover:opacity-90 transition"
              >
                Continue to Login
              </Link>
            </>
          )}

          {!loading && !success && error && (
            <>
              <div className="flex justify-center mb-5">
                <div className="w-6 h-8 rounded-full bg-red-100 dark:bg-red-950/40 flex items-center justify-center">
                  <AlertCircle
                    size={34}
                    className="text-red-600 dark:text-red-400"
                  />
                </div>
              </div>

              <h1 className="text-6 font-bold text-gray-900 dark:text-white">
                Verification Failed
              </h1>

              <p className="mt-3 text-sm leading-6 text-red-500 dark:text-red-400">
                {error}
              </p>

              <div className="mt-7 flex flex-col gap-3">
                <Link
                  to="/login"
                  className="glassy-icon
                px-5
                py-3
                border
                border-gray-700
                rounded-lg
                text-sm
                sm:text-base
                transition"
                >
                  Go to Login
                </Link>

                <Link
                  to="/"
                  className="text-sm text-gray-500 dark:text-gray-400 hover:underline"
                >
                  Go to Home
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
