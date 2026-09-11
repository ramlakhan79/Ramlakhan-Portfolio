import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ArticleForm from "../components/ArticleForm";
import { createArticle } from "../utils/admin";

const CreateArticle = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (article) => {
        try {
            setLoading(true);
            setError("");

            await createArticle(article);

            navigate("/admin");
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-950 text-white">

            <header className="border-b border-gray-800 bg-gray-900">
                <div className="max-w-4xl mx-auto px-6 py-5 flex justify-between items-center">

                    <h1 className="text-2xl font-bold">
                        Create Article
                    </h1>

                    <button
                        onClick={() => navigate("/admin")}
                        className="glassy-icon px-6 shrink-0 border rounded-lg"
                    >
                        ← Back
                    </button>

                </div>
            </header>

            <main className="max-w-4xl mx-auto px-6 py-8">

                {error && (
                    <div className="mb-6 bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg">
                        {error}
                    </div>
                )}

                <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 md:p-8">

                    <ArticleForm
                        onSubmit={handleSubmit}
                        loading={loading}
                        buttonText="Create Article"
                    />

                </div>

            </main>

        </div>
    );
};

export default CreateArticle;