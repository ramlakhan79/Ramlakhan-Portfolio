import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    getArticles,
    archiveArticle,
    restoreArticle,
    deleteArticle,
    logoutAdmin
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
                navigate("/admin/login");
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
        navigate("/admin/login");
    };

    return (
        <div className="min-h-screen bg-gray-950 text-white">

            <header className="border-b border-gray-800 bg-gray-900">
                <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

                    <div>
                        <h1 className="text-2xl font-bold">
                            Admin Dashboard
                        </h1>

                        <p className="text-gray-400 text-sm mt-1">
                            Manage your blog articles
                        </p>
                    </div>

                    <div className="flex gap-3">

                        <button
                            onClick={() => navigate("/admin/articles/create")}
                            className="glassy-icon px-6 shrink-0 border rounded-lg"
                        >
                            + Create Article
                        </button>

                        <button
                            onClick={handleLogout}
                            className="glassy-icon px-6 shrink-0 border rounded-lg"
                        >
                            Logout
                        </button>

                    </div>

                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-8">

                {error && (
                    <div className="mb-5 bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg">
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
                    <div className="overflow-x-auto bg-gray-900 border border-gray-800 rounded-xl">

                        <table className="w-full">

                            <thead className="border-b border-gray-800">
                                <tr className="text-left text-gray-400 text-sm">
                                    <th className="px-5 py-4">Title</th>
                                    <th className="px-5 py-4">Category</th>
                                    <th className="px-5 py-4">Status</th>
                                    <th className="px-5 py-4">Updated</th>
                                    <th className="px-5 py-4">Actions</th>
                                </tr>
                            </thead>

                            <tbody>

                                {articles.map((article) => (
                                    <tr
                                        key={article._id}
                                        className="border-b border-gray-800 last:border-0"
                                    >

                                        <td className="px-5 py-4">
                                            <div className="font-medium">
                                                {article.title}
                                            </div>                                            
                                        </td>

                                        <td className="px-5 py-4 text-gray-300">
                                            {article.category}
                                        </td>

                                        <td className="px-5 py-4">

                                            {article.archived ? (
                                                <span className="px-2 py-1 rounded-md bg-yellow-500/10 text-yellow-400 text-xs">
                                                    Archived
                                                </span>
                                            ) : article.published ? (
                                                <span className="px-2 py-1 rounded-md bg-green-500/10 text-green-400 text-xs">
                                                    Published
                                                </span>
                                            ) : (
                                                <span className="px-2 py-1 rounded-md bg-gray-500/10 text-gray-400 text-xs">
                                                    Draft
                                                </span>
                                            )}

                                        </td>

                                        <td className="px-5 py-4 text-gray-400 text-sm">
                                            {new Date(article.updatedAt).toLocaleDateString()}
                                        </td>

                                        <td className="px-5 py-4">

                                            <div className="flex gap-2 flex-wrap">

                                                <button
                                                    onClick={() => navigate(`/admin/articles/edit/${article._id}`)}
                                                    className="glassy-icon px-3 shrink-0 border rounded-sm"
                                                >
                                                    Edit
                                                </button>

                                                {article.archived ? (
                                                    <button
                                                        onClick={() => handleRestore(article._id)}
                                                        className="glassy-icon px-3 shrink-0 border rounded-sm"
                                                    >
                                                        Restore
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => handleArchive(article._id)}
                                                            className="glassy-icon px-3 shrink-0 border rounded-sm"
                                                    >
                                                        Archive
                                                    </button>
                                                )}

                                                <button
                                                    onClick={() => handleDelete(article._id)}
                                                    className="glassy-icon px-3 shrink-0 border rounded-sm"
                                                >
                                                    Delete
                                                </button>

                                            </div>

                                        </td>

                                    </tr>
                                ))}

                            </tbody>

                        </table>

                    </div>
                )}

            </main>

        </div>
    );
};

export default AdminDashboard;