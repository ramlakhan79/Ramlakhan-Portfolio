import { useParams, useNavigate } from "react-router-dom";
import { Clock } from "lucide-react";
import { useEffect, useState } from "react";

import {
    getArticle,
    getNextArticle,
    getPreviousArticle
} from "../utils/api.js";

export default function BlogDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                setLoading(true);

                const data = await getArticle(id);

                setBlog(data.article || data);
            } catch (error) {
                console.error("Error fetching article:", error);
                setBlog(null);
            } finally {
                setLoading(false);
            }
        };

        fetchArticle();
    }, [id]);

    const handleNext = async () => {
        try {
            const data = await getNextArticle(id);

            const nextArticle = data.article || data;

            if (nextArticle?._id) {
                navigate(`/blogs/${ nextArticle._id } `);
            }
        } catch (error) {
            console.error("Error fetching next article:", error);
        }
    };

    const handlePrevious = async () => {
        try {
            const data = await getPreviousArticle(id);

            const previousArticle = data.article || data;

            if (previousArticle?._id) {
                navigate(`/blogs/${ previousArticle._id } `);
            }
        } catch (error) {
            console.error("Error fetching previous article:", error);
        }
    };

    if (loading) {
        return <div className="loader-container">
            <div className="custom-loader"></div>
        </div>
    }

    if (!blog) {
        return <h2 className="text-center mt-10">Blog not found</h2>;
    }

    return (
        <div className="max-w-full mx-auto py-5 px-4">

            {/* Back + Next buttons */}
            <div className="flex justify-between items-center gap-3 mb-6">

                <button
                    onClick={() => navigate(-1)}
                    className="glassy-icon px-6 shrink-0 border rounded-lg"
                >
                    ← Back
                </button>

                <button
                    onClick={handleNext}
                    className="glassy-icon px-6 shrink-0 border rounded-lg"
                >
                    Next →
                </button>

            </div>

            <h4 className="text-3xl font-semibold mb-4">
                Title: {blog.title}
            </h4>

            {blog.image && (
                <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full rounded-xl mb-6"
                />
            )}

            <div className="text-gray-700 leading-relaxed text-base space-y-4">
                {blog.content.split("\n\n").map((para, index) => (
                    <p key={index}>{para}</p>
                ))}
            </div>

            <div className="px-5 py-4 border-t flex items-center justify-between text-xs text-gray-500">
                <span>
                    {blog.createdAt
                        ? new Date(blog.createdAt).toLocaleDateString()
                        : ""}
                </span>

                <span className="flex items-center gap-1">
                    <Clock size={13} />
                    {blog.read}
                </span>
            </div>

        </div>
    );
}
