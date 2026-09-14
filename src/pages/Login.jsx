// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { loginUser } from "../utils/admin";

// const Login = () => {
//     const navigate = useNavigate();

//     const [identifier, setIdentifier] = useState("");
//     const [password, setPassword] = useState("");
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState("");

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         setError("");
//         setLoading(true);

//         try {
//             const data = await loginUser(identifier, password);

//             localStorage.setItem("token", data.token);
//             localStorage.setItem("user", JSON.stringify(data.user));
//             if (data.user.role === "admin") {
//                 navigate("/admin");
//             } 
//             else if(data.user.role === "contributor") {
//                 navigate("/contributor");
//             }
//             else {
//                 navigate("/blogs");
//             }
//         } catch (error) {
//             setError(error.message || "Invalid username/email or password");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4">
//             <div className="w-full max-w bg-gray-900 border border-gray-800 rounded-2xl p-8">

//                 <div className="mb-8">
//                     <h1 className="text-suppBlue-200 text-3 font-bold text-white border-b border-gray-800 pb-2">
//                         Login
//                     </h1>

//                     <p className="text-gray-400 mt-2">
//                         Login to your account
//                     </p>
//                 </div>

//                 {error && (
//                     <div className="mb-5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3">
//                         {error}
//                     </div>
//                 )}

//                 <form onSubmit={handleSubmit} className="space-y-5">

//                     <div>
//                         <label className="block text-sm text-gray-300 mb-2">
//                             Username or Email
//                         </label>

//                         <input
//                             type="text"
//                             value={identifier}
//                             onChange={(e) => setIdentifier(e.target.value)}
//                             required
//                             className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white outline-none focus:border-blue-500"
//                             placeholder="Enter username or email"
//                         />
//                     </div>

//                     <div>
//                         <label className="block text-sm text-gray-300 mb-2">
//                             Password
//                         </label>

//                         <input
//                             type="password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             required
//                             className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white outline-none focus:border-blue-500"
//                             placeholder="Enter password"
//                         />
//                     </div>

//                     <button
//                         type="submit"
//                         disabled={loading}
//                         className="glassy-icon px-3 shrink-0 border rounded-lg w-full py-3 text-white font-semibold disabled:opacity-50"
//                     >
//                         {loading ? "Logging in..." : "Login"}
//                     </button>

//                 </form>
//                 <p className="text-center text-gray-400 text-sm mt-6">
//                     Don't have an account?{" "}
//                     <button
//                         type="button"
//                         onClick={() => navigate("/register")}
//                         className="text-blue-400 hover:text-blue-300"
//                     >
//                         Register
//                     </button>
//                 </p>
//             </div>
//         </div>
//     );
// };

// export default Login;

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { loginUser } from "../utils/admin";
import GoogleLoginButton from "../components/GoogleLoginButton";

const Login = () => {
  const navigate = useNavigate();

  const [identifier, setIdentifier] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const data =
        await loginUser(
          identifier,
          password
        );

      localStorage.setItem(
        "token",
        data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      if (data.user.role === "admin") {
        navigate("/admin");
      } else if (
        data.user.role === "contributor"
      ) {
        navigate("/contributor");
      } else {
        navigate("/blogs");
      }
    } catch (error) {
      setError(
        error.message ||
          "Invalid username/email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = (user) => {
    if (user.role === "admin") {
      navigate("/admin");
    } else if (
      user.role === "contributor"
    ) {
      navigate("/contributor");
    } else {
      navigate("/blogs");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4 py-8">

      <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-2xl p-6 sm:p-8">

        <div className="mb-8">

          <h1 className="text-4 sm:text-3xl font-bold text-white border-b border-gray-800 pb-2">
            Login
          </h1>

          <p className="text-gray-400 mt-2">
            Login to your account
          </p>

        </div>

        {error && (
          <div className="mb-5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 text-sm">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <div>

            <label className="block text-sm text-gray-300 mb-2">
              Username or Email
            </label>

            <input
              type="text"
              value={identifier}
              onChange={(e) =>
                setIdentifier(
                  e.target.value
                )
              }
              required
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white outline-none focus:border-blue-500"
              placeholder="Enter username or email"
            />

          </div>

          <div>

            <label className="block text-sm text-gray-300 mb-2">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              required
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white outline-none focus:border-blue-500"
              placeholder="Enter password"
            />

          </div>

          <button
            type="submit"
            disabled={loading}
            className="glassy-icon px-3 border rounded-lg w-full py-3 text-white font-semibold disabled:opacity-50"
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>

        </form>

        {/* Divider */}

        <div className="flex items-center gap-3 my-6">

          <div className="h-px bg-gray-800 flex-1" />

          <span className="text-gray-500 text-sm">
            OR
          </span>

          <div className="h-px bg-gray-800 flex-1" />

        </div>

        {/* Google */}

        <GoogleLoginButton
          onSuccess={
            handleGoogleSuccess
          }
        />

        <p className="text-center text-gray-400 text-sm mt-6">

          Don't have an account?{" "}

          <button
            type="button"
            onClick={() =>
              navigate("/register")
            }
            className="text-blue-400 hover:text-blue-300"
          >
            Register
          </button>

        </p>

      </div>
    </div>
  );
};

export default Login;
