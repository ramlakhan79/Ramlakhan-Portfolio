import { useState } from "react";
import { Search, Clock, Tag } from "lucide-react";
import { Link } from "react-router-dom";
import { blogs } from "../constants/data.js";

export default function Blogs() {
    const allBlogs = blogs;

    const categories = ["All", "React", "JavaScript", "Build Tools"];
    const [activeCat, setActiveCat] = useState("All");
    const [search, setSearch] = useState("");

    const filtered = allBlogs.filter((b) => {
        const matchCat = activeCat === "All" || b.category === activeCat;
        const matchSearch =
            b.title.toLowerCase().includes(search.toLowerCase()) ||
            b.desc.toLowerCase().includes(search.toLowerCase());
        return matchCat && matchSearch;
    });

    return (
        <section className="w-full mt-10 px-mobileBound sm:px-8">
            <div className="mx-auto w-full max-w-6xl flex flex-col gap-8">
                {/* Search */}
                <div className="flex flex-wrap justify-center">
                    <div className="relative w-full max-w-xl">
                        <input
                            type="text"
                            placeholder="Search blogs..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full border rounded-xl py-3 px-4 pl-12 outline-none focus:border-gray-400 transition"
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                    </div>
                </div>

                {/* Category Filters */}
                <div className="flex flex-wrap gap-3 justify-center">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCat(cat)}
                            className={`px-4 py-2 rounded-full border text-sm transition
                ${activeCat === cat ? "bg-black text-white" : "hover:"}
              `}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Blog Cards grid */}
                <div className="w-full max-w-[1280px] flex flex-col gap-8">
                    <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 mx-auto">
                        {filtered.map((blog) => {
                            const isLongDesc = blog.desc.length > 100;
                            return (
                                <article
                                    key={blog.id}
                                    className="w-full max-w-[330px] mx-auto rounded-2xl shadow-sm 
  hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer overflow-hidden border border-gray-200"
                                >
                                    {/* <div className="w-full h-40 bg-gray-100">
                                        <img
                                            src={blog.image}
                                            alt={blog.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div> */}

                                    <div className="p-5">
                                        <h4 className="text-sm md:text-sm lg:text-sm font-semibold text-gray-900 leading-snug mb-2 break-words">
                                            {blog.title}
                                        </h4>
                                        <p className="text-gray-600 text-xs leading-relaxed">
                                            {isLongDesc ? blog.desc.slice(0, 100) + "..." : blog.desc}
                                        </p>

                                        {/* ✔ Read More Button */}
                                        {isLongDesc && (
                                            <Link
                                                to={`/blogs/${blog.id}`}
                                                className="text-blue-600 text-xs font-medium mt-2 inline-block"
                                            >
                                                Read More
                                            </Link>
                                        )}
                                        <div className="flex flex-wrap gap-2 mt-4">
                                            {blog.tags.map(t => (
                                                <span
                                                    key={t}
                                                    className="flex items-center gap-1 text-[10px] bg-gray-100 text-gray-700 
          border border-gray-200 rounded-full px-2 py-1"
                                                >
                                                    <Tag size={12} className="text-gray-500" /> {t}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="px-5 py-4 border-t flex items-center justify-between text-xs text-gray-500">
                                        <span>{blog.date}</span>
                                        <span className="flex items-center gap-1">
                                            <Clock size={13} />
                                            {blog.read}
                                        </span>
                                    </div>
                                </article>
                            )
                        })}
                    </div>
                </div>

                {filtered.length === 0 && (
                    <p className="text-center text-gray-500 mt-4">No blogs found.</p>
                )}
            </div>
        </section>
    );
}
