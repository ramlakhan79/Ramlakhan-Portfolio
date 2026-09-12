import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AdminArticles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/articles`,
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

  return (
    <div className="min-h-screen bg-gray-950 text-white px-4 py-8">
      <div className="max-w-6xl mx-auto">

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">
              All Articles
            </h1>

            <p className="text-gray-400 mt-1">
              Manage all articles
            </p>
          </div>

          <Link
            to="/dashboard/articles/create"
            className="glassy-icon border rounded-lg px-5 py-3"
          >
            Create Article
          </Link>
        </div>

        {error && (
          <div className="mb-5 text-red-400">
            {error}
          </div>
        )}

        {loading ? (
          <p className="text-gray-400">
            Loading articles...
          </p>
        ) : (
          <div className="space-y-4">
            {articles.map((article) => (
              <div
                key={article._id}
                className="bg-gray-900 border border-gray-800 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
              >
                <div>
                  <h2 className="font-semibold text-lg">
                    {article.title}
                  </h2>

                  <p className="text-gray-400 text-sm mt-1">
                    {article.category}
                  </p>

                  <p className="text-gray-500 text-sm mt-1">
                    By @{article.createdBy?.username || "unknown"}
                  </p>
                </div>

                <Link
                  to={`/admin/articles/edit/${article._id}`}
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

export default AdminArticles;