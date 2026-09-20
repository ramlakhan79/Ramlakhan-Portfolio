import { useEffect, useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import * as pdfjsLib from "pdfjs-dist";

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url
).toString();

const PDFViewer = ({ pdfUrl }) => {
    const bookRef = useRef(null);

    const [pdf, setPdf] = useState(null);
    const [pages, setPages] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!pdfUrl) return;

        let cancelled = false;

        const loadPDF = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await fetch(pdfUrl);

                if (!response.ok) {
                    throw new Error("Unable to load PDF");
                }

                const buffer = await response.arrayBuffer();

                const loadedPdf = await pdfjsLib.getDocument({
                    data: buffer,
                }).promise;

                if (cancelled) return;

                setPdf(loadedPdf);

                const pageNumbers = Array.from(
                    { length: loadedPdf.numPages },
                    (_, index) => index + 1
                );

                setPages(pageNumbers);
            } catch (err) {
                console.error(err);
                setError("Unable to load PDF");
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        };

        loadPDF();

        return () => {
            cancelled = true;
        };
    }, [pdfUrl]);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "ArrowRight") {
                nextPage();
            }

            if (event.key === "ArrowLeft") {
                previousPage();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [pdf]);

    const nextPage = () => {
        if (!bookRef.current || !pdf) return;

        if (page < pdf.numPages) {
            bookRef.current.pageFlip().flipNext();
        }
    };

    const previousPage = () => {
        if (!bookRef.current || !pdf) return;

        if (page > 1) {
            bookRef.current.pageFlip().flipPrev();
        }
    };

    const handleFlip = (event) => {
        setPage(event.data + 1);
    };

    const goToPage = (event) => {
        const value = Number(event.target.value);

        if (!value || !bookRef.current) return;

        if (value >= 1 && value <= pdf.numPages) {
            bookRef.current.pageFlip().flip(value - 1);
            setPage(value);
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-[500px] items-center justify-center rounded-2xl bg-gray-900">
                <div className="text-center">
                    <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-700 border-t-white" />

                    <p className="mt-4 text-sm text-gray-400">
                        Loading PDF...
                    </p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex min-h-[400px] items-center justify-center rounded-2xl bg-gray-900">
                <p className="text-red-400">
                    {error}
                </p>
            </div>
        );
    }

    if (!pdf || pages.length === 0) {
        return null;
    }

    return (
        <div className="w-full rounded-2xl bg-gray-950 px-2 py-6 sm:px-6">
            <div className="flex flex-col items-center">

                <div className="relative flex w-full items-center justify-center">

                    <button
                        type="button"
                        onClick={previousPage}
                        disabled={page === 1}
                        className="absolute left-0 z-20 hidden rounded-full bg-black/80 px-4 py-3 text-white shadow-lg transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-30 sm:block"
                        aria-label="Previous page"
                    >
                        ←
                    </button>

                    <div className="w-full max-w-[1200px] overflow-hidden">
                        <HTMLFlipBook
                            ref={bookRef}
                            width={550}
                            height={780}
                            size="stretch"
                            minWidth={280}
                            maxWidth={700}
                            minHeight={400}
                            maxHeight={950}
                            maxShadowOpacity={0.5}
                            showCover={false}
                            mobileScrollSupport={true}
                            drawShadow={true}
                            flippingTime={800}
                            usePortrait={true}
                            startPage={0}
                            startZIndex={0}
                            autoSize={true}
                            clickEventForward={true}
                            useMouseEvents={true}
                            swipeDistance={30}
                            showPageCorners={true}
                            disableFlipByClick={false}
                            onFlip={handleFlip}
                            className="mx-auto"
                        >
                            {pages.map((pageNumber) => (
                                <PDFPage
                                    key={pageNumber}
                                    pdf={pdf}
                                    pageNumber={pageNumber}
                                />
                            ))}
                        </HTMLFlipBook>
                    </div>

                    <button
                        type="button"
                        onClick={nextPage}
                        disabled={page === pdf.numPages}
                        className="absolute right-0 z-20 hidden rounded-full bg-black/80 px-4 py-3 text-white shadow-lg transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-30 sm:block"
                        aria-label="Next page"
                    >
                        →
                    </button>
                </div>

                <div className="mt-6 flex w-full max-w-xl items-center justify-center gap-3">

                    <button
                        type="button"
                        onClick={previousPage}
                        disabled={page === 1}
                        className="rounded-lg border border-gray-700 px-4 py-2 text-sm text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-30"
                    >
                        Previous
                    </button>

                    <div className="flex items-center gap-2 text-sm text-gray-400">
                        <input
                            type="number"
                            min="1"
                            max={pdf.numPages}
                            value={page}
                            onChange={goToPage}
                            className="w-16 rounded-lg border border-gray-700 bg-gray-900 px-2 py-2 text-center text-white outline-none"
                        />

                        <span>
                            / {pdf.numPages}
                        </span>
                    </div>

                    <button
                        type="button"
                        onClick={nextPage}
                        disabled={page === pdf.numPages}
                        className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-black transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-30"
                    >
                        Next
                    </button>

                </div>

                <p className="mt-3 text-center text-xs text-gray-500">
                    Use the buttons, swipe, mouse, or keyboard ← →
                </p>

            </div>
        </div>
    );
};

const PDFPage = ({ pdf, pageNumber }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        let cancelled = false;

        const renderPage = async () => {
            try {
                const pdfPage = await pdf.getPage(pageNumber);

                const canvas = canvasRef.current;

                if (!canvas || cancelled) return;

                const context = canvas.getContext("2d");

                const baseViewport = pdfPage.getViewport({
                    scale: 1,
                });

                const containerWidth = 550;

                const scale = Math.min(
                    containerWidth / baseViewport.width,
                    1.5
                );

                const viewport = pdfPage.getViewport({
                    scale,
                });

                const devicePixelRatio = window.devicePixelRatio || 1;

                canvas.width = viewport.width * devicePixelRatio;
                canvas.height = viewport.height * devicePixelRatio;

                canvas.style.width = `${viewport.width}px`;
                canvas.style.height = `${viewport.height}px`;

                context.setTransform(
                    devicePixelRatio,
                    0,
                    0,
                    devicePixelRatio,
                    0,
                    0
                );

                await pdfPage.render({
                    canvasContext: context,
                    viewport,
                }).promise;
            } catch (error) {
                console.error(
                    `Failed to render PDF page ${pageNumber}`,
                    error
                );
            }
        };

        renderPage();

        return () => {
            cancelled = true;
        };
    }, [pdf, pageNumber]);

    return (
        <div
            className="flex h-full w-full items-center justify-center bg-white"
            data-density="hard"
        >
            <canvas
                ref={canvasRef}
                className="block max-h-full max-w-full object-contain"
            />
        </div>
    );
};

export default PDFViewer;