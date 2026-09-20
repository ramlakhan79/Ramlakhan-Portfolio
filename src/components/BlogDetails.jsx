import { useParams, useNavigate } from "react-router-dom";

import {
    ArrowLeft,
    ArrowRight,
    Clock,
    CalendarDays,
    User,
    Tag
} from "lucide-react";

import { useEffect, useMemo, useState } from "react";

import DOMPurify from "dompurify";

import {
    getArticle,
    getNextArticle,
    getPreviousArticle
} from "../utils/api.js";

import ArticlePDF from "../components/article/ArticlePDF";

const createSlugId = text => {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-");
};


const BlogDetails = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [blog, setBlog] = useState(null);

    const [loading, setLoading] = useState(true);


    useEffect(() => {

        const fetchArticle = async () => {

            try {

                setLoading(true);

                const data = await getArticle(id);

                setBlog(
                    data.article || data
                );

            } catch (error) {

                console.error(
                    "Error fetching article:",
                    error
                );

                setBlog(null);

            } finally {

                setLoading(false);

            }
        };

        fetchArticle();

    }, [id]);


    const handleNext = async () => {

        try {

            const data =
                await getNextArticle(id);

            const nextArticle =
                data.article || data;

            if (nextArticle?._id) {

                navigate(
                    `/blogs/${nextArticle._id}`
                );

            }

        } catch (error) {

            console.error(
                "Error fetching next article:",
                error
            );

        }
    };


    const handlePrevious = async () => {

        try {

            const data =
                await getPreviousArticle(id);

            const previousArticle =
                data.article || data;

            if (previousArticle?._id) {

                navigate(
                    `/blogs/${previousArticle._id}`
                );

            }

        } catch (error) {

            console.error(
                "Error fetching previous article:",
                error
            );

        }
    };


    const headings = useMemo(() => {

        if (!blog?.content) {
            return [];
        }

        const parser =
            new DOMParser();

        const doc =
            parser.parseFromString(
                blog.content,
                "text/html"
            );

        return [
            ...doc.querySelectorAll(
                "h2, h3"
            )
        ].map((heading, index) => {

            const id =
                `section-${index}-${createSlugId(
                    heading.textContent
                )}`;

            return {
                id,
                text: heading.textContent,
                level:
                    heading.tagName === "H2"
                        ? 2
                        : 3
            };
        });

    }, [blog?.content]);


    const articleContent = useMemo(() => {
        if (!blog?.content) return "";

        const parser = new DOMParser();

        const doc = parser.parseFromString(
            blog.content,
            "text/html"
        );

        doc.querySelectorAll("h2, h3").forEach(
            (heading, index) => {
                heading.id =
                    `section-${index}-${createSlugId(
                        heading.textContent
                    )}`;
            }
        );

        return DOMPurify.sanitize(
            doc.body.innerHTML,
            {
                ADD_ATTR: ["id"]
            }
        );
    }, [blog?.content]);


    const scrollToHeading = id => {

        const element =
            document.getElementById(id);

        if (!element) return;

        element.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    };


    if (loading) {

        return (
            <div className="loader-container">
                <div className="custom-loader"></div>
            </div>
        );
    }
    // console.log(blog);

    if (!blog) {

        return (
            <div className="min-h-[60vh] flex items-center justify-center">

                <div className="text-center">

                    <h2 className="text-2xl font-semibold text-white">
                        Blog not found
                    </h2>

                    <button
                        onClick={() => navigate("/blogs")}
                        className="mt-5 glassy-icon px-5 py-2 border rounded-lg"
                    >
                        Back to Blogs
                    </button>

                </div>

            </div>
        );
    }


    return (

        <div className="min-h-screen bg-gray-950">

            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">


                {/* Back */}

                <button
                    onClick={() => navigate("/blogs")}
                    className="
                        flex
                        items-center
                        gap-2
                        text-sm
                        text-gray-500
                        hover:text-white
                        transition
                        mb-8
                    "
                >
                    <ArrowLeft size={16} />

                    Back to Blogs
                </button>


                {/* Header */}

                <header className="max-w-4xl mx-auto text-center">


                    {blog.category && (

                        <span
                            className="
                                inline-flex
                                items-center
                                px-3
                                py-1
                                rounded-full
                                bg-blue-500/10
                                border
                                border-blue-500/20
                                text-blue-400
                                text-xs
                                font-medium
                                mb-5
                            "
                        >
                            {blog.category}
                        </span>

                    )}


                    <h1
                        className="
                            text-3xl
                            sm:text-4xl
                            lg:text-5xl
                            font-bold
                            text-white
                            leading-tight
                        "
                    >
                        {blog.title}
                    </h1>

                    <div
                        className="article-content"
                        dangerouslySetInnerHTML={{
                            __html: blog.content,
                        }}
                    />

                    <ArticlePDF
                        articleId={blog._id}
                        isLoggedIn={!!User}
                    />
                    {(blog.excerpt || blog.desc) && (

                        <p
                            className="
                                mt-5
                                text-base
                                sm:text-lg
                                text-gray-400
                                leading-7
                                max-w-3xl
                                mx-auto
                            "
                        >
                            {blog.excerpt || blog.desc}
                        </p>

                    )}


                    <div
                        className="
                            flex
                            flex-wrap
                            justify-center
                            items-center
                            gap-x-4
                            gap-y-3
                            mt-6
                            text-sm
                            text-gray-500
                        "
                    >

                        {(blog.createdBy ||
                            blog.author) && (

                                <span className="flex items-center gap-1.5">

                                    <User size={14} />

                                    {blog.createdBy ||
                                        blog.author}

                                </span>

                            )}


                        {blog.publishedAt && (

                            <>
                                <span>•</span>

                                <span className="flex items-center gap-1.5">

                                    <CalendarDays size={14} />

                                    {new Date(
                                        blog.publishedAt
                                    ).toLocaleDateString(
                                        "en-US",
                                        {
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric"
                                        }
                                    )}

                                </span>
                            </>

                        )}


                        <span>•</span>


                        <span className="flex items-center gap-1.5">

                            <Clock size={14} />

                            {blog.readingTime
                                ? `${blog.readingTime} min read`
                                : blog.read ||
                                "5 min read"}

                        </span>

                    </div>

                </header>


                {/* Cover */}

                {(blog.coverImage ||
                    blog.image) && (

                        <div className="max-w-5xl mx-auto mt-10">

                            <img
                                src={
                                    blog.coverImage ||
                                    blog.image
                                }
                                alt={blog.title}
                                className="
                                w-full
                                max-h-[520px]
                                object-cover
                                rounded-2xl
                                border
                                border-gray-800
                                shadow-2xl
                            "
                            />

                        </div>

                    )}


                {/* Article */}

                <div className="max-w-5xl mx-auto mt-10">


                    {/* TOC */}

                    {headings.length > 0 && (

                        <aside className="max-w-3xl mx-auto mb-10">

                            <div
                                className="
                                    bg-gray-900/70
                                    border
                                    border-gray-800
                                    rounded-2xl
                                    p-5
                                "
                            >

                                <h2 className="text-sm font-semibold text-white mb-4">
                                    Table of Contents
                                </h2>


                                <div className="space-y-2">

                                    {headings.map(
                                        heading => (

                                            <button
                                                key={heading.id}
                                                onClick={() =>
                                                    scrollToHeading(
                                                        heading.id
                                                    )
                                                }
                                                className={`
                                                    block
                                                    text-left
                                                    text-sm
                                                    text-gray-400
                                                    hover:text-white
                                                    transition
                                                    ${heading.level === 3
                                                        ? "pl-4"
                                                        : ""
                                                    }
                                                `}
                                            >
                                                {heading.text}
                                            </button>

                                        )
                                    )}

                                </div>

                            </div>

                        </aside>

                    )}


                    {/* Content */}

                    <article
                        className="
                            article-content
                            max-w-3xl
                            mx-auto

                            prose
                            prose-invert
                            prose-lg
                            max-w-none

                            text-gray-300

                            prose-headings:text-white
                            prose-headings:font-bold
                            prose-headings:scroll-mt-24

                            prose-h2:text-2xl
                            prose-h2:mt-14
                            prose-h2:mb-5

                            prose-h3:text-xl
                            prose-h3:mt-10
                            prose-h3:mb-4

                            prose-p:text-gray-300
                            prose-p:leading-8
                            prose-p:my-5

                            prose-strong:text-white

                            prose-a:text-blue-400
                            prose-a:no-underline
                            hover:prose-a:underline

                            prose-li:text-gray-300
                            prose-li:leading-7

                            prose-blockquote:border-blue-500
                            prose-blockquote:text-gray-400

                            prose-code:text-pink-400

                            prose-pre:bg-gray-900
                            prose-pre:border
                            prose-pre:border-gray-800
                            prose-pre:rounded-xl
                        "
                        dangerouslySetInnerHTML={{
                            __html: articleContent
                        }}
                    />


                    {/* Tags */}

                    {blog.tags?.length > 0 && (

                        <div
                            className="
                                max-w-3xl
                                mx-auto
                                mt-12
                                pt-6
                                border-t
                                border-gray-800
                            "
                        >

                            <div className="flex items-center gap-2 mb-4">

                                <Tag
                                    size={15}
                                    className="text-gray-500"
                                />

                                <span className="text-sm text-gray-400">
                                    Tags
                                </span>

                            </div>


                            <div className="flex flex-wrap gap-2">

                                {blog.tags.map(
                                    (tag, index) => (

                                        <span
                                            key={index}
                                            className="
                                                px-3
                                                py-1.5
                                                text-xs
                                                rounded-full
                                                bg-gray-900
                                                border
                                                border-gray-800
                                                text-gray-400
                                            "
                                        >
                                            #{tag}
                                        </span>

                                    )
                                )}

                            </div>

                        </div>

                    )}


                    {/* Navigation */}

                    <div
                        className="
                            max-w-3xl
                            mx-auto
                            mt-12
                            pt-6
                            border-t
                            border-gray-800
                        "
                    >

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">


                            <button
                                onClick={handlePrevious}
                                className="
                                    group
                                    text-left
                                    p-5
                                    rounded-xl
                                    border
                                    border-gray-800
                                    bg-gray-900/50
                                    hover:bg-gray-900
                                    hover:border-gray-700
                                    transition
                                "
                            >

                                <span className="text-xs text-gray-500">
                                    Previous Article
                                </span>

                                <div className="flex items-center gap-2 mt-2 text-sm font-medium text-white">

                                    <ArrowLeft
                                        size={15}
                                        className="group-hover:-translate-x-1 transition"
                                    />

                                    Previous

                                </div>

                            </button>


                            <button
                                onClick={handleNext}
                                className="
                                    group
                                    text-right
                                    p-5
                                    rounded-xl
                                    border
                                    border-gray-800
                                    bg-gray-900/50
                                    hover:bg-gray-900
                                    hover:border-gray-700
                                    transition
                                "
                            >

                                <span className="text-xs text-gray-500">
                                    Next Article
                                </span>

                                <div className="flex items-center justify-end gap-2 mt-2 text-sm font-medium text-white">

                                    Next

                                    <ArrowRight
                                        size={15}
                                        className="group-hover:translate-x-1 transition"
                                    />

                                </div>

                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};


export default BlogDetails;