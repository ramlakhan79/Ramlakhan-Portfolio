import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const GitHubCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash;

    if (!hash) {
      navigate("/login?error=github_login_failed", {
        replace: true,
      });
      return;
    }

    const params = new URLSearchParams(hash.substring(1));
    const token = params.get("token");

    if (!token) {
      navigate("/login?error=github_login_failed", {
        replace: true,
      });
      return;
    }

    try {
      const decoded = jwtDecode(token);
      localStorage.setItem("token", token);
      window.history.replaceState({}, document.title, window.location.pathname);
      if (decoded.role === "admin") {
        navigate("/admin", { replace: true });
      } else if (decoded.role === "contributor") {
        navigate("/dashboard", { replace: true });
      } else {
        navigate("/blogs", { replace: true });
      }
    } catch (error) {
      console.error("Invalid GitHub token:", error);
      localStorage.removeItem("token");
      navigate("/login?error=github_login_failed", { replace: true });
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin w-8 h-8 border-2 border-gray-500 border-t-transparent rounded-full mx-auto mb-4" />

        <p>Signing you in with GitHub...</p>
      </div>
    </div>
  );
};

export default GitHubCallback;
