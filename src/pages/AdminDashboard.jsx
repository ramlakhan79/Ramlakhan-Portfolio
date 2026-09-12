import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getArticles,
  archiveArticle,
  restoreArticle,
  deleteArticle,
  logoutAdmin,
} from "../utils/admin";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadArticles = async () => {
    try {
      setLoading(true);

      const data = await getArticles();

      setArticles(data.articles || []);
    } catch (error) {
      setError(error.message);

      if (error.message.toLowerCase().includes("token")) {
        logoutAdmin();
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArticles();
  }, []);

  const handleArchive = async (id) => {
    if (!window.confirm("Archive this article?")) return;

    try {
      await archiveArticle(id);
      await loadArticles();
    } catch (error) {
      alert(error.message);
    }
  };

  const handleRestore = async (id) => {
    try {
      await restoreArticle(id);
      await loadArticles();
    } catch (error) {
      alert(error.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this article permanently?")) return;

    try {
      await deleteArticle(id);
      await loadArticles();
    } catch (error) {
      alert(error.message);
    }
  };

  const handleLogout = () => {
    logoutAdmin();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <header className="border-b border-gray-800 bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* Dashboard Info */}
            <div className="min-w-0">
              <h1 className="text-4 font-bold text-white truncate">
                Admin Dashboard
              </h1>

              <p className="text-gray-400 text-8 mt-1">
                Manage your blog articles
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col xs:flex-row sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
              <button
                onClick={() => navigate("/admin/articles/create")}
                className="glassy-icon px-1 py-2.5 border rounded-lg"
              >
                + Create Article
              </button>

              <button
                onClick={handleLogout}
                className="glassy-icon px-1 py-2.5 border rounded-lg"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {error && (
          <div className="mb-6 bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        {loading ? (
          <div className="loader-container">
            <div className="custom-loader"></div>
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            No articles found.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {articles.map((article) => (
              <article
                key={article._id}
                className="
                        group
                        bg-gray-900
                        border border-gray-800
                        rounded-2xl
                        overflow-hidden
                        hover:border-gray-700
                        transition-all
                        duration-200
                    "
              >
                {/* Image */}
                {article.image ? (
                  <div className="h-40 overflow-hidden bg-gray-800">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="
                                    w-full
                                    h-full
                                    object-cover
                                    group-hover:scale-105
                                    transition-transform
                                    duration-300
                                "
                    />
                  </div>
                ) : (
                  <div className="h-24 bg-gray-800/50 flex items-center justify-center">
                    <span className="text-gray-600 text-sm">No image</span>
                  </div>
                )}

                <div className="p-5">
                  {/* Category + Status */}

                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className="text-xs font-medium text-gray-400 bg-gray-800 px-2.5 py-1 rounded-md">
                      {article.category}
                    </span>

                            {article.archived ? (
                                <span className="text-neutGray-600 text-xs px-2.5 py-1 rounded-md border border-orange-500/20">
                                    Archived
                                </span>
                            ) : article.published ? (
                                <span className="text-suppGreen-500 text-xs px-2.5 py-1 rounded-md border border-emerald-500/20">
                                    Published
                                </span>
                            ) : (
                                <span className="text-suppYellow-400 text-xs px-2.5 py-1 rounded-md border border-amber-500/20">
                                    Draft
                                </span>
                            )}
                  </div>

                  {/* Title */}

                  <h3
                    className="
                                text-4
                                font-semibold
                                text-white                                
                            "
                    title={article.title}
                  >
                    {article.title}
                  </h3>

                  {/* Description */}

                  {article.desc && (
                    <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                      {article.desc}
                    </p>
                  )}

                  {/* Metadata */}

                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mt-4 text-xs text-gray-500">
                    <span>{article.read || "5 min read"}</span>

                    <span className="text-gray-700">•</span>

                    <span>
                      Updated {new Date(article.updatedAt).toLocaleDateString()}
                    </span>
                  </div>

                  {/* Author Information */}

                  {(article.createdBy || article.updatedBy) && (
                    <div className="mt-4 pt-4 border-t border-gray-800 space-y-1">
                      {article.createdBy && (
                        <p className="text-xs text-gray-500">
                          Created by{" "}
                          <span className="text-gray-300">
                            {article.createdBy}
                          </span>
                        </p>
                      )}

                      {article.updatedBy && (
                        <p className="text-xs text-gray-500">
                          Updated by{" "}
                          <span className="text-gray-300">
                            {article.updatedBy}
                          </span>
                        </p>
                      )}
                    </div>
                  )}

                  {/* Actions */}

                  <div className="flex items-center gap-2 mt-5 pt-4 border-t border-gray-800">
                    <button
                      onClick={() =>
                        navigate(`/admin/articles/edit/${article._id}`)
                      }
                      className="
                                    flex-1
                                    text-sm
                                    glassy-icon
                                    px-3
                                    py-2
                                    border
                                    rounded-lg
                                    transition
                                "
                    >
                      Edit
                    </button>

                    {article.archived ? (
                      <button
                        onClick={() => handleRestore(article._id)}
                        className="
                                        flex-1
                                        text-sm
                                        glassy-icon
                                        px-3
                                        py-2
                                        border
                                        rounded-lg
                                    "
                      >
                        Restore
                      </button>
                    ) : (
                      <button
                        onClick={() => handleArchive(article._id)}
                        className="
                                        flex-1
                                        text-sm
                                        glassy-icon
                                        px-3
                                        py-2
                                        border
                                        rounded-lg
                                    "
                      >
                        Archive
                      </button>
                    )}

                    <button
                      onClick={() => handleDelete(article._id)}
                      className="
                                    flex-1
                                    text-sm
                                    text-suppRed-200
                                    glassy-icon
                                    px-3
                                    py-2
                                    border
                                    rounded-lg
                                "
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
