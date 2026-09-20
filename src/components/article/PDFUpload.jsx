import { useState } from "react";
import {
    uploadArticlePDF,
    deleteArticlePDF,
} from "../../utils/articlePdfApi";

const PDFUpload = ({ articleId, existingPDF, onUploaded }) => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleUpload = async () => {
        if (!file) {
            setMessage("Please select a PDF");
            return;
        }

        try {
            setLoading(true);
            setMessage("");

            const data = await uploadArticlePDF(articleId, file);

            setMessage("PDF uploaded successfully");
            setFile(null);

            if (onUploaded) {
                onUploaded(data.pdf);
            }
        } catch (error) {
            setMessage(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        try {
            setLoading(true);
            setMessage("");

            await deleteArticlePDF(articleId);

            setMessage("PDF deleted successfully");

            if (onUploaded) {
                onUploaded(null);
            }
        } catch (error) {
            setMessage(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="rounded-2xl border border-gray-700 bg-gray-900 p-6">
            <h3 className="mb-4 text-lg font-semibold text-white">
                Article PDF
            </h3>

            {existingPDF && (
                <div className="mb-5 rounded-lg border border-gray-700 p-4">
                    <p className="text-sm text-gray-300">
                        Current PDF
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                        {existingPDF.fileName}
                    </p>

                    <div className="mt-4 flex gap-3">
                        <a
                            href={`${import.meta.env.VITE_API_URL}/api/article-pdfs/${articleId}/view`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-lg border border-gray-600 px-4 py-2 text-sm text-white hover:bg-gray-800"
                        >
                            View
                        </a>

                        <button
                            type="button"
                            onClick={handleDelete}
                            disabled={loading}
                            className="rounded-lg border border-red-500 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 disabled:opacity-50"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            )}

            <input
                type="file"
                accept="application/pdf,.pdf"
                onChange={(e) => {
                    setFile(e.target.files?.[0] || null);
                }}
                className="block w-full text-sm text-gray-400"
            />

            {file && (
                <p className="mt-3 text-sm text-gray-400">
                    Selected: {file.name}
                </p>
            )}

            <button
                type="button"
                onClick={handleUpload}
                disabled={!file || loading}
                className="mt-5 rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-black hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
            >
                {loading ? "Uploading..." : "Upload PDF"}
            </button>

            {message && (
                <p className="mt-4 text-sm text-gray-400">
                    {message}
                </p>
            )}
        </div>
    );
};

export default PDFUpload;