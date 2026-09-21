import {
    forwardRef,
    useEffect,
    useRef,
    useState,
} from "react";

import HTMLFlipBook from "react-pageflip";

import * as pdfjsLib from "pdfjs-dist";

import "pdfjs-dist/web/pdf_viewer.css";

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url
).toString();


const PDFViewer = ({ pdfUrl }) => {
    const bookRef = useRef(null);
    const flipSound = useRef(null);

    const [pdf, setPdf] = useState(null);
    const [pages, setPages] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [soundEnabled, setSoundEnabled] = useState(true);

    const [bookSize, setBookSize] = useState({
        width: 550,
        height: 780,
    });
    useEffect(() => {
        flipSound.current = new Audio(
            "../sounds/page-flip.mp3"
        );

        flipSound.current.preload = "auto";
        flipSound.current.volume = .35;

        return () => {
            if (flipSound.current) {
                flipSound.current.pause();
                flipSound.current = null;
            }
        };
    }, []);

    useEffect(() => {
        const updateSize = () => {
            const width = window.innerWidth;

            if (width < 480) {
                setBookSize({
                    width: Math.max(width - 45, 280),
                    height: Math.max((width - 45) * 1.414, 400),
                });
            } else if (width < 768) {
                setBookSize({
                    width: Math.min(width - 80, 500),
                    height: Math.min((width - 80) * 1.414, 720),
                });
            } else {
                setBookSize({
                    width: 550,
                    height: 780,
                });
            }
        };

        updateSize();

        window.addEventListener("resize", updateSize);

        return () => {
            window.removeEventListener("resize", updateSize);
        };
    }, []);

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

                const pageList = [];

                for (
                    let pageNumber = 1;
                    pageNumber <= loadedPdf.numPages;
                    pageNumber++
                ) {
                    pageList.push(pageNumber);
                }

                setPages(pageList);
                setCurrentPage(0);
            } catch (err) {
                console.error("PDF loading error:", err);

                if (!cancelled) {
                    setError("Unable to load PDF");
                }
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
        const handleKeyboard = (event) => {
            if (event.key === "ArrowRight") {
                bookRef.current?.pageFlip().flipNext();
            }

            if (event.key === "ArrowLeft") {
                bookRef.current?.pageFlip().flipPrev();
            }
        };

        window.addEventListener("keydown", handleKeyboard);

        return () => {
            window.removeEventListener("keydown", handleKeyboard);
        };
    }, []);

    const nextPage = () => {
        if (!bookRef.current) return;

        bookRef.current.pageFlip().flipNext();
    };

    const previousPage = () => {
        if (!bookRef.current) return;

        bookRef.current.pageFlip().flipPrev();
    };

    const goToPage = (pageNumber) => {
        if (!bookRef.current) return;

        const target = Number(pageNumber);

        if (
            target >= 1 &&
            target <= pages.length
        ) {
            bookRef.current
                .pageFlip()
                .flip(target - 1);
        }
    };

    // const handleFlip = (event) => {
    //     setCurrentPage(event.data);
    // };
    const handleFlip = (event) => {
        setCurrentPage(event.data);

        if (!soundEnabled) {
            return;
        }

        if (!flipSound.current) {
            return;
        }

        flipSound.current.currentTime = 0;

        flipSound.current
            .play()
            .catch(() => { });
    };

    if (loading) {
        return (
            <div className="flex min-h-[650px] items-center justify-center rounded-xl bg-[#111827]">
                <div className="text-center">
                    <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-gray-700 border-t-white" />

                    <p className="mt-5 text-sm text-gray-400">
                        Loading book...
                    </p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex min-h-[500px] items-center justify-center rounded-xl bg-[#111827]">
                <div className="text-center">
                    <p className="text-red-400">
                        {error}
                    </p>
                </div>
            </div>
        );
    }

    if (!pdf || pages.length === 0) {
        return null;
    }

    return (
        <div className="pdf-reader w-full overflow-hidden rounded-xl bg-suppRed-400">

            {/* TOP BAR */}

            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-700 bg-neutGray-800 px-4 py-3">

                <div className="flex items-center gap-3">

                    <div className="flex h-9 w-10 items-center justify-center rounded-lg bg-white text-sm font-bold text-black">
                        PDF
                    </div>

                    <div>
                        <p className="text-sm font-medium text-white">
                            PDF Reader
                        </p>

                        <p className="text-xs text-gray-500">
                            Page {currentPage + 1} of {pages.length}
                        </p>
                    </div>

                </div>
                <button
                    type="button"
                    onClick={() => setSoundEnabled((prev) => !prev)}
                    className="rounded-lg border border-gray-700 px-3 py-2 text-sm text-white transition hover:bg-gray-800"
                >
                    {soundEnabled ? "🔊" : "🔇"}
                </button>
                <div className="flex items-center gap-2">

                    <button
                        type="button"
                        onClick={previousPage}
                        disabled={currentPage === 0}
                        className="rounded-lg border border-gray-700 px-3 py-2 text-sm text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-30"
                    >
                        ←
                    </button>

                    <select
                        value={currentPage + 1}
                        onChange={(e) =>
                            goToPage(e.target.value)
                        }
                        className="rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-suppBlue-600 outline-none"
                    >
                        {pages.map((pageNumber) => (
                            <option
                                key={pageNumber}
                                value={pageNumber}
                            >
                                Page {pageNumber}
                            </option>
                        ))}
                    </select>

                    <button
                        type="button"
                        onClick={nextPage}
                        disabled={currentPage >= pages.length - 1}
                        className="rounded-lg border border-gray-700 px-3 py-2 text-sm text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-30"
                    >
                        →
                    </button>

                </div>

            </div>

            {/* BOOK */}

            <div className="relative flex min-h-[650px] items-center justify-center overflow-hidden bg-suppYellow-900 px-3 py-8 sm:px-8">

                <div className="pdf-book-shadow">

                    <HTMLFlipBook
                        ref={bookRef}

                        width={bookSize.width}
                        height={bookSize.height}

                        size="fixed"

                        minWidth={280}
                        maxWidth={650}

                        minHeight={400}
                        maxHeight={920}

                        startPage={0}

                        drawShadow={true}
                        maxShadowOpacity={0.65}

                        flippingTime={900}

                        usePortrait={true}

                        showCover={false}

                        mobileScrollSupport={true}

                        clickEventForward={true}

                        useMouseEvents={true}

                        swipeDistance={30}

                        showPageCorners={true}

                        disableFlipByClick={false}

                        autoSize={false}

                        onFlip={handleFlip}
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

            </div>

            {/* BOTTOM CONTROLS */}

            <div className="border-t border-gray-700 bg-neutGray-800 px-4 py-4">

                <div className="mx-auto flex max-w-xl items-center justify-between gap-3">

                    <button
                        type="button"
                        onClick={previousPage}
                        disabled={currentPage === 0}
                        className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-black transition hover:bg-neutGray-400 disabled:cursor-not-allowed disabled:opacity-30"
                    >
                        Previous
                    </button>

                    <div className="flex items-center gap-2 text-sm text-gray-400">
                        <span>
                            {currentPage + 1}
                        </span>

                        <span>
                            /
                        </span>

                        <span>
                            {pages.length}
                        </span>
                    </div>

                    <button
                        type="button"
                        onClick={nextPage}
                        disabled={currentPage >= pages.length - 1}
                        className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-black transition hover:bg-neutGray-400 disabled:cursor-not-allowed disabled:opacity-30"
                    >
                        Next
                    </button>

                </div>

                <p className="mt-3 text-center text-xs text-gray-500">
                    Drag the page corner or swipe to turn the page
                </p>

            </div>

        </div>
    );
};

const PDFPage = forwardRef(
    ({ pdf, pageNumber }, ref) => {
        const canvasRef = useRef(null);
        const renderTaskRef = useRef(null);

        const [pageWidth, setPageWidth] = useState(550);

        useEffect(() => {
            const updateWidth = () => {
                setPageWidth(
                    Math.min(window.innerWidth - 70, 550)
                );
            };

            updateWidth();

            window.addEventListener(
                "resize",
                updateWidth
            );

            return () => {
                window.removeEventListener(
                    "resize",
                    updateWidth
                );
            };
        }, []);

        useEffect(() => {
            let cancelled = false;

            const renderPage = async () => {
                try {
                    // Cancel any previous render
                    if (renderTaskRef.current) {
                        try {
                            renderTaskRef.current.cancel();
                        } catch (error) {
                            // Ignore cancellation errors
                        }

                        renderTaskRef.current = null;
                    }

                    const pdfPage =
                        await pdf.getPage(pageNumber);

                    if (cancelled) return;

                    const originalViewport =
                        pdfPage.getViewport({
                            scale: 1,
                        });

                    const scale =
                        pageWidth /
                        originalViewport.width;

                    const viewport =
                        pdfPage.getViewport({
                            scale,
                        });

                    const canvas =
                        canvasRef.current;

                    if (!canvas || cancelled) return;

                    const context =
                        canvas.getContext("2d");

                    if (!context) return;

                    const devicePixelRatio =
                        window.devicePixelRatio || 1;

                    canvas.width =
                        viewport.width *
                        devicePixelRatio;

                    canvas.height =
                        viewport.height *
                        devicePixelRatio;

                    canvas.style.width =
                        `${viewport.width}px`;

                    canvas.style.height =
                        `${viewport.height}px`;

                    context.setTransform(
                        devicePixelRatio,
                        0,
                        0,
                        devicePixelRatio,
                        0,
                        0
                    );

                    if (cancelled) return;

                    const renderTask =
                        pdfPage.render({
                            canvasContext: context,
                            viewport,
                        });

                    renderTaskRef.current =
                        renderTask;

                    await renderTask.promise;

                    if (
                        renderTaskRef.current ===
                        renderTask
                    ) {
                        renderTaskRef.current = null;
                    }
                } catch (error) {
                    if (
                        error?.name ===
                        "RenderingCancelledException"
                    ) {
                        return;
                    }

                    if (!cancelled) {
                        console.error(
                            `PDF page ${pageNumber} render error:`,
                            error
                        );
                    }
                }
            };

            renderPage();

            return () => {
                cancelled = true;

                if (renderTaskRef.current) {
                    try {
                        renderTaskRef.current.cancel();
                    } catch (error) {
                        // Ignore cancellation errors
                    }

                    renderTaskRef.current = null;
                }
            };
        }, [pdf, pageNumber, pageWidth]);

        return (
            <div
                ref={ref}
                className="page flex h-full w-full items-center justify-center overflow-hidden bg-white"
            >
                <canvas
                    ref={canvasRef}
                    className="block"
                />
            </div>
        );
    }
);

PDFPage.displayName = "PDFPage";

export default PDFViewer;