import { useEffect, useState } from "react";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";

import {
    Bold,
    Italic,
    Underline as UnderlineIcon,
    Strikethrough,
    Heading1,
    Heading2,
    Heading3,
    List,
    ListOrdered,
    Quote,
    Code,
    Code2,
    Link as LinkIcon,
    Unlink,
    Undo2,
    Redo2,
    AlignLeft,
    AlignCenter,
    AlignRight,
    Minus,
    Eye,
    EyeOff
} from "lucide-react";

const MenuButton = ({
    onClick,
    active,
    disabled,
    children,
    title
}) => {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            title={title}
            className={`
p - 2 rounded - md transition - all
                ${
    active
        ? "bg-white/20 text-white"
        : "text-gray-400 hover:text-white hover:bg-white/10"
}
                ${ disabled ? "opacity-40 cursor-not-allowed" : "" }
`}
        >
            {children}
        </button>
    );
};

const EditorToolbar = ({ editor }) => {
    if (!editor) return null;

    const addLink = () => {
        const previousUrl = editor.getAttributes("link").href;

        const url = window.prompt(
            "Enter URL",
            previousUrl || "https://"
        );

        if (url === null) return;

        if (url === "") {
            editor.chain().focus().unsetLink().run();
            return;
        }

        editor
            .chain()
            .focus()
            .extendMarkRange("link")
            .setLink({ href: url })
            .run();
    };

    return (
        <div className="flex flex-wrap items-center gap-1 p-2 border-b border-white/10 bg-black/20">

            <MenuButton
                title="Undo"
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().undo()}
            >
                <Undo2 size={17} />
            </MenuButton>

            <MenuButton
                title="Redo"
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().redo()}
            >
                <Redo2 size={17} />
            </MenuButton>

            <div className="w-px h-6 bg-white/10 mx-1" />

            <MenuButton
                title="Bold"
                active={editor.isActive("bold")}
                onClick={() => editor.chain().focus().toggleBold().run()}
            >
                <Bold size={17} />
            </MenuButton>

            <MenuButton
                title="Italic"
                active={editor.isActive("italic")}
                onClick={() => editor.chain().focus().toggleItalic().run()}
            >
                <Italic size={17} />
            </MenuButton>

            <MenuButton
                title="Underline"
                active={editor.isActive("underline")}
                onClick={() => editor.chain().focus().toggleUnderline().run()}
            >
                <UnderlineIcon size={17} />
            </MenuButton>

            <MenuButton
                title="Strikethrough"
                active={editor.isActive("strike")}
                onClick={() => editor.chain().focus().toggleStrike().run()}
            >
                <Strikethrough size={17} />
            </MenuButton>

            <div className="w-px h-6 bg-white/10 mx-1" />

            <MenuButton
                title="Heading 1"
                active={editor.isActive("heading", { level: 1 })}
                onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 1 }).run()
                }
            >
                <Heading1 size={17} />
            </MenuButton>

            <MenuButton
                title="Heading 2"
                active={editor.isActive("heading", { level: 2 })}
                onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 2 }).run()
                }
            >
                <Heading2 size={17} />
            </MenuButton>

            <MenuButton
                title="Heading 3"
                active={editor.isActive("heading", { level: 3 })}
                onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 3 }).run()
                }
            >
                <Heading3 size={17} />
            </MenuButton>

            <div className="w-px h-6 bg-white/10 mx-1" />

            <MenuButton
                title="Bullet List"
                active={editor.isActive("bulletList")}
                onClick={() =>
                    editor.chain().focus().toggleBulletList().run()
                }
            >
                <List size={17} />
            </MenuButton>

            <MenuButton
                title="Numbered List"
                active={editor.isActive("orderedList")}
                onClick={() =>
                    editor.chain().focus().toggleOrderedList().run()
                }
            >
                <ListOrdered size={17} />
            </MenuButton>

            <MenuButton
                title="Quote"
                active={editor.isActive("blockquote")}
                onClick={() =>
                    editor.chain().focus().toggleBlockquote().run()
                }
            >
                <Quote size={17} />
            </MenuButton>

            <MenuButton
                title="Code"
                active={editor.isActive("code")}
                onClick={() =>
                    editor.chain().focus().toggleCode().run()
                }
            >
                <Code size={17} />
            </MenuButton>

            <MenuButton
                title="Code Block"
                active={editor.isActive("codeBlock")}
                onClick={() =>
                    editor.chain().focus().toggleCodeBlock().run()
                }
            >
                <Code2 size={17} />
            </MenuButton>

            <div className="w-px h-6 bg-white/10 mx-1" />

            <MenuButton
                title="Align Left"
                onClick={() =>
                    editor.chain().focus().setTextAlign("left").run()
                }
            >
                <AlignLeft size={17} />
            </MenuButton>

            <MenuButton
                title="Align Center"
                onClick={() =>
                    editor.chain().focus().setTextAlign("center").run()
                }
            >
                <AlignCenter size={17} />
            </MenuButton>

            <MenuButton
                title="Align Right"
                onClick={() =>
                    editor.chain().focus().setTextAlign("right").run()
                }
            >
                <AlignRight size={17} />
            </MenuButton>

            <div className="w-px h-6 bg-white/10 mx-1" />

            <MenuButton
                title="Add Link"
                active={editor.isActive("link")}
                onClick={addLink}
            >
                <LinkIcon size={17} />
            </MenuButton>

            <MenuButton
                title="Remove Link"
                disabled={!editor.isActive("link")}
                onClick={() =>
                    editor.chain().focus().unsetLink().run()
                }
            >
                <Unlink size={17} />
            </MenuButton>

            <MenuButton
                title="Horizontal Rule"
                onClick={() =>
                    editor.chain().focus().setHorizontalRule().run()
                }
            >
                <Minus size={17} />
            </MenuButton>

        </div>
    );
};

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

    const [preview, setPreview] = useState(false);

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                link: false,
                underline: false
            }),

            Underline,

            Link.configure({
                openOnClick: false,
                autolink: true,
                linkOnPaste: true,
                defaultProtocol: "https"
            }),

            TextAlign.configure({
                types: ["heading", "paragraph"]
            })
        ],

        content: "",

        editorProps: {
            attributes: {
                class:
                    "min-h-[400px] p-5 outline-none text-gray-200 leading-7 prose prose-invert max-w-none"
            }
        },

        onUpdate: ({ editor }) => {
            setForm(prev => ({
                ...prev,
                content: editor.getHTML()
            }));
        }
    });

    useEffect(() => {
        if (!initialData) return;

        const data = {
            title: initialData.title || "",
            desc: initialData.desc || "",
            content: initialData.content || "",
            category: initialData.category || "",
            tags: initialData.tags?.join(", ") || "",
            image: initialData.image || "",
            read: initialData.read || "5 min read",
            published: initialData.published ?? true
        };

        setForm(data);

        if (editor && data.content) {
            editor.commands.setContent(data.content);
        }
    }, [initialData, editor]);

    const handleChange = (e) => {
        const {
            name,
            value,
            type,
            checked
        } = e.target;

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
        <form
            onSubmit={handleSubmit}
            className="max-w-5xl mx-auto space-y-6"
        >

            {/* Header */}

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

                <div>
                    <h1 className="text-2xl font-semibold text-white">
                        {initialData ? "Edit Article" : "Create Article"}
                    </h1>

                    <p className="text-sm text-gray-500 mt-1">
                        Write, format and publish your article.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={() => setPreview(!preview)}
                    className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-white/10 bg-white/5 text-gray-300 hover:bg-white/10 transition"
                >
                    {preview ? (
                        <>
                            <EyeOff size={17} />
                            Editor
                        </>
                    ) : (
                        <>
                            <Eye size={17} />
                            Preview
                        </>
                    )}
                </button>

            </div>

            {!preview ? (
                <>

                    {/* Basic Information */}

                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 space-y-6">

                        <div>
                            <h2 className="text-lg font-medium text-white">
                                Article Information
                            </h2>

                            <p className="text-sm text-gray-500 mt-1">
                                Add the basic information about your article.
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm text-gray-300 mb-2">
                                Title
                            </label>

                            <input
                                name="title"
                                value={form.title}
                                onChange={handleChange}
                                required
                                className="admin-input text-lg"
                                placeholder="Enter article title..."
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
                                className="admin-input resize-none"
                                placeholder="Write a short description..."
                            />

                            <div className="text-xs text-gray-600 text-right mt-1">
                                {form.desc.length} characters
                            </div>
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

                            <p className="text-xs text-gray-500 mt-2">
                                Separate tags using commas.
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm text-gray-300 mb-2">
                                Cover Image
                            </label>

                            <input
                                name="image"
                                value={form.image}
                                onChange={handleChange}
                                className="admin-input"
                                placeholder="https://..."
                            />

                            {form.image && (
                                <div className="mt-3 rounded-xl overflow-hidden border border-white/10 h-40">
                                    <img
                                        src={form.image}
                                        alt="Preview"
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.currentTarget.style.display = "none";
                                        }}
                                    />
                                </div>
                            )}
                        </div>

                    </div>


                    {/* Rich Text Editor */}

                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden">

                        <div className="p-6 pb-4">
                            <h2 className="text-lg font-medium text-white">
                                Article Content
                            </h2>

                            <p className="text-sm text-gray-500 mt-1">
                                Write and format your article.
                            </p>
                        </div>

                        <div className="border-t border-white/10">

                            <EditorToolbar editor={editor} />

                            <EditorContent editor={editor} />

                        </div>

                        <div className="px-5 py-3 border-t border-white/10 text-xs text-gray-500">
                            Use headings, lists, links, quotes and code blocks to structure your article.
                        </div>

                    </div>


                    {/* Publishing */}

                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">

                        <label className="flex items-center gap-3 text-gray-300 cursor-pointer">

                            <input
                                type="checkbox"
                                name="published"
                                checked={form.published}
                                onChange={handleChange}
                                className="w-4 h-4 accent-white"
                            />

                            <div>
                                <div className="text-sm font-medium text-white">
                                    Publish article
                                </div>

                                <div className="text-xs text-gray-500">
                                    {form.published
                                        ? "This article will be visible on your portfolio."
                                        : "Save as draft and publish later."
                                    }
                                </div>
                            </div>

                        </label>

                        <button
                            type="submit"
                            disabled={loading}
                            className="glassy-icon px-7 py-3 shrink-0 border rounded-lg disabled:opacity-50"
                        >
                            {loading
                                ? "Saving..."
                                : buttonText
                            }
                        </button>

                    </div>

                </>
            ) : (

                /* Preview */

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden">

                    {form.image && (
                        <img
                            src={form.image}
                            alt={form.title}
                            className="w-full max-h-[400px] object-cover"
                        />
                    )}

                    <article className="p-6 md:p-10">

                        <div className="flex flex-wrap items-center gap-3 mb-5">

                            {form.category && (
                                <span className="px-3 py-1 rounded-full bg-white/10 text-sm text-gray-300">
                                    {form.category}
                                </span>
                            )}

                            <span className="text-sm text-gray-500">
                                {form.read}
                            </span>

                        </div>

                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            {form.title || "Untitled Article"}
                        </h1>

                        <p className="text-gray-400 text-lg mb-8">
                            {form.desc}
                        </p>

                        <div
                            className="prose prose-invert max-w-none
                            prose-headings:text-white
                            prose-p:text-gray-300
                            prose-a:text-blue-400
                            prose-strong:text-white
                            prose-code:text-gray-200"
                            dangerouslySetInnerHTML={{
                                __html: form.content
                            }}
                        />

                    </article>

                </div>

            )}

        </form>
    );
};

export default ArticleForm;

