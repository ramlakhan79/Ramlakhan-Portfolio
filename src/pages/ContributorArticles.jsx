import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ContributorArticles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/articles/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to load articles"
          );
        }

        setArticles(data.articles || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const currentUser = JSON.parse(localStorage.getItem("user"));

  const myArticles = articles.filter(
    (article) => article.createdBy === currentUser?.username
  );

  return (
    <div className="min-h-screen bg-gray-950 text-white px-4 py-8">
      <div className="max-w-6xl mx-auto">

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">
              My Articles
            </h1>

            <p className="text-gray-400 mt-1">
              Manage your articles
            </p>
          </div>

          <Link
            to="/dashboard/articles/create"
            className="glassy-icon border rounded-lg px-5 py-3 text-center"
          >
            Create Article
          </Link>
          <button
            onClick={() => navigate("/dashboard")}
            className="glassy-icon px-6 shrink-0 border rounded-lg"
          >
            ← Back
          </button>
        </div>

        {error && (
          <div className="mb-5 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg px-4 py-3">
            {error}
          </div>
        )}

        {loading ? (
          <div className="loader-container">
            <div className="custom-loader"></div>
          </div>
        ) : myArticles.length === 0 ? (
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 text-center">
            <p className="text-gray-400">
              You haven't created any articles yet.
            </p>

            <Link
              to="/dashboard/articles/create"
              className="inline-block mt-4 text-blue-400 hover:text-blue-300"
            >
              Create your first article
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
                {myArticles.map((article) => (
              <div
                key={article._id}
                className="bg-gray-900 border border-gray-800 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
              >
                <div>
                  <h2 className="text-lg font-semibold">
                    {article.title}
                  </h2>

                  <p className="text-gray-400 text-sm mt-1">
                    {article.category}
                  </p>

                  <div className="flex gap-3 mt-2 text-sm">
                    <span
                      className={
                        article.published
                          ? "text-green-400"
                          : "text-yellow-400"
                      }
                    >
                      {article.published
                        ? "Published"
                        : "Draft"}
                    </span>

                    <span className="text-gray-500">
                      {article.read}
                    </span>
                  </div>
                </div>

                <Link
                  to={`/dashboard/articles/edit/${article._id}`}
                  className="text-blue-400 hover:text-blue-300"
                >
                  Edit
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContributorArticles;