import { useEffect, useState } from "react";

import {
    getArticlePDF,
    getPDFViewUrl,
    getPDFDownloadUrl,
} from "../../utils/articlePdfApi";

import PDFViewer from "./PDFViewer";

const ArticlePDF = ({ articleId, isLoggedIn }) => {
    const [pdf, setPdf] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPDF = async () => {
            try {
                const data = await getArticlePDF(articleId);
                setPdf(data);
            } catch (error) {
                setPdf(null);
            } finally {
                setLoading(false);
            }
        };

        loadPDF();
    }, [articleId]);

    if (loading || !pdf) {
        return null;
    }

    return (
        <section className="mt-10 w-full">

            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Read PDF
                    </h2>

                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        {pdf.fileName}
                    </p>
                </div>

                {isLoggedIn && (
                    <a
                        href={getPDFDownloadUrl(articleId)}
                        className="inline-flex w-fit rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-700 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                    >
                        Download PDF
                    </a>
                )}
            </div>

            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-gray-100 shadow-xl dark:border-gray-800 dark:bg-gray-950">
                <PDFViewer
                    pdfUrl={getPDFViewUrl(articleId)}
                />
            </div>

        </section>
    );
};

export default ArticlePDF;