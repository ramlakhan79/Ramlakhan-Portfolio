import { useParams, useNavigate } from "react-router-dom";
import { blogs } from "../constants/data.js";
import { Search, Clock, Tag } from "lucide-react";

export default function BlogDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const currentIndex = blogs.findIndex(b => String(b.id) === String(id));
    const blog = blogs[currentIndex];
    // console.log(blog);

    if (!blog) return <h2 className="text-center mt-10">Blog not found</h2>;

    const handleNext = () => {
        if (currentIndex < blogs.length - 1) {
            const nextId = blogs[currentIndex + 1].id;
            navigate(`/blogs/${nextId}`);
        }
    };

    return (
        <div className="max-w-3xl mx-auto py-10 px-4">

            {/* Back + Next buttons */}
            <div className="flex items-center gap-3 mb-6">
                <button
                    onClick={() => navigate(-1)}
                    className="text-sm px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition"
                >
                    ← Back
                </button>

                <button
                    onClick={handleNext}
                    disabled={currentIndex === blogs.length - 1}
                    className={`text-sm px-4 py-2 border rounded-lg transition
                        ${currentIndex === blogs.length - 1
                            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                            : "bg-gray-100 border-gray-300 hover:bg-gray-200"}
                    `}
                >
                    Next →
                </button>
            </div>

            <h4 className="text-3xl font-semibold mb-4">Title: {blog.title}</h4>

            {/* <img
                src={blog.image}
                alt={blog.title}
                className="w-full rounded-xl mb-6"
            /> */}

            {/* <p className="text-gray-700 leading-relaxed text-sm">
                {blog.desc}
            </p> */}

            <div className="text-gray-700 leading-relaxed text-base space-y-4">
                {blog.desc.split("\n\n").map((para, index) => (
                    <p key={index}>{para}</p>
                ))}
            </div>

            <div className="px-5 py-4 border-t flex items-center justify-between text-xs text-gray-500">
                <span>{blog.date}</span>
                <span className="flex items-center gap-1">
                    <Clock size={13} />
                    {blog.read}
                </span>
            </div>
        </div>
    );
}
