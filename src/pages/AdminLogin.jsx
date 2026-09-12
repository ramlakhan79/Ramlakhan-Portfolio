// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { loginAdmin } from "../utils/admin";

// const AdminLogin = () => {
//     const navigate = useNavigate();

//     const [email, setUsername] = useState("");
//     const [password, setPassword] = useState("");
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState("");

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         setError("");
//         setLoading(true);

//         try {
//             const data = await loginAdmin(email, password);

//             localStorage.setItem("adminToken", data.token);

//             navigate("/admin");
//         } catch (error) {
//             setError(error.message || "Invalid email or password");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4">
//             <div className="w-full max-w bg-gray-900 border border-gray-800 rounded-2xl p-8">

//                 <div className="mb-8">
//                     <h1 className="text-suppBlue-200 text-3 font-bold text-white border-b border-gray-800 pb-2">
//                         Admin Login
//                     </h1>


//                     <p className="text-gray-400 mt-2">
//                         Login to manage your articles
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
//                             Email
//                         </label>

//                         <input
//                             type="email"
//                             value={email}
//                             onChange={(e) => setUsername(e.target.value)}
//                             required
//                             className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white outline-none focus:border-blue-500"
//                             placeholder="Enter email"
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
//             </div>
//         </div>
//     );
// };

// export default AdminLogin;