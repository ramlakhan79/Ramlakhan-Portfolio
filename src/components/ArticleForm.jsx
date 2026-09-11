import { useEffect, useState } from "react";

const ArticleForm = ({
    initialData,
    onSubmit,
    loading,
    buttonText = "Save Article"
}) => {

    const [form, setForm] = useState({
        title: "",
        desc: "",
        content: "",
        category: "",
        tags: "",
        image: "",
        read: "5 min read",
        published: true
    });

    useEffect(() => {
        if (initialData) {
            setForm({
                title: initialData.title || "",
                desc: initialData.desc || "",
                content: initialData.content || "",
                category: initialData.category || "",
                tags: initialData.tags?.join(", ") || "",
                image: initialData.image || "",
                read: initialData.read || "5 min read",
                published: initialData.published ?? true
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setForm(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        onSubmit({
            ...form,
            tags: form.tags
                .split(",")
                .map(tag => tag.trim())
                .filter(Boolean)
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">

            <div>
                <label className="block text-sm text-gray-300 mb-2">
                    Title
                </label>

                <input
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    required
                    className="admin-input"
                    placeholder="Article title"
                />
            </div>           

            <div>
                <label className="block text-sm text-gray-300 mb-2">
                    Description
                </label>

                <textarea
                    name="desc"
                    value={form.desc}
                    onChange={handleChange}
                    required
                    rows="3"
                    className="admin-input"
                    placeholder="Short description"
                />
            </div>

            <div>
                <label className="block text-sm text-gray-300 mb-2">
                    Content
                </label>

                <textarea
                    name="content"
                    value={form.content}
                    onChange={handleChange}
                    required
                    rows="15"
                    className="admin-input"
                    placeholder="Write your article..."
                />
            </div>

            <div className="grid md:grid-cols-2 gap-5">

                <div>
                    <label className="block text-sm text-gray-300 mb-2">
                        Category
                    </label>

                    <input
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        required
                        className="admin-input"
                        placeholder="React"
                    />
                </div>

                <div>
                    <label className="block text-sm text-gray-300 mb-2">
                        Read Time
                    </label>

                    <input
                        name="read"
                        value={form.read}
                        onChange={handleChange}
                        className="admin-input"
                        placeholder="5 min read"
                    />
                </div>

            </div>

            <div>
                <label className="block text-sm text-gray-300 mb-2">
                    Tags
                </label>

                <input
                    name="tags"
                    value={form.tags}
                    onChange={handleChange}
                    className="admin-input"
                    placeholder="React, JavaScript, Hooks"
                />

                <p className="text-gray-500 text-xs mt-2">
                    Separate tags using commas.
                </p>
            </div>

            <div>
                <label className="block text-sm text-gray-300 mb-2">
                    Image URL
                </label>

                <input
                    name="image"
                    value={form.image}
                    onChange={handleChange}
                    className="admin-input"
                    placeholder="https://..."
                />
            </div>

            <label className="flex items-center gap-3 text-gray-300 cursor-pointer">

                <input
                    type="checkbox"
                    name="published"
                    checked={form.published}
                    onChange={handleChange}
                    className="w-4 h-4"
                />

                Published

            </label>

            <button
                type="submit"
                disabled={loading}
                className="glassy-icon px-6 shrink-0 border rounded-lg"
            >
                {loading ? "Saving..." : buttonText}
            </button>

        </form>
    );
};

export default ArticleForm;