import WindowWrapper from "#hoc/WindowWrapper.jsx";
import {WindowControls} from "#components/index.js";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { Download, ZoomIn, ZoomOut } from "lucide-react";
import { useRef, useState, useEffect, useCallback } from "react";
import useWindowStore from "#store/window.js";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.mjs',
    import.meta.url,
).toString();

const MIN_ZOOM = 0.5;
const MAX_ZOOM = 2.5;
const ZOOM_STEP = 0.1;

const Resume = () => {
    const [scale, setScale] = useState(1);
    const { windows } = useWindowStore();
    const isMaximized = windows["resume"]?.isMaximized;
    const wrapperRef = useRef(null);
    const containerRef = useRef(null);
    const baseWidth = useRef(null);

    useEffect(() => {
        const el = wrapperRef.current;
        if (!el || baseWidth.current) return;

        const observer = new ResizeObserver(([entry]) => {
            if (!baseWidth.current) {
                baseWidth.current = entry.contentRect.width;
            }
        });

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    const zoomIn = () => setScale(s => Math.min(MAX_ZOOM, parseFloat((s + ZOOM_STEP).toFixed(1))));
    const zoomOut = () => setScale(s => Math.max(MIN_ZOOM, parseFloat((s - ZOOM_STEP).toFixed(1))));

    const handleWheel = useCallback((e) => {
        if (!e.ctrlKey && !e.metaKey) return;
        e.preventDefault();
        if (e.deltaY < 0) zoomIn();
        else zoomOut();
    }, []);

    useEffect(() => {
        const el = wrapperRef.current;
        if (!el) return;
        el.addEventListener("wheel", handleWheel, { passive: false });
        return () => el.removeEventListener("wheel", handleWheel);
    }, [handleWheel]);

    const pageWidth = baseWidth.current ? baseWidth.current * scale : undefined;

    return (
        <>
            <div id="window-header">
                <WindowControls target="resume"/>
                <h2>Resume.pdf</h2>

                <div className="flex items-center gap-2">
                    <button onClick={zoomOut} disabled={scale <= MIN_ZOOM} className="icon disabled:opacity-30">
                        <ZoomOut size={15}/>
                    </button>
                    <span className="text-xs text-gray-500 w-10 text-center">{Math.round(scale * 100)}%</span>
                    <button onClick={zoomIn} disabled={scale >= MAX_ZOOM} className="icon disabled:opacity-30">
                        <ZoomIn size={15}/>
                    </button>

                    <a href="files/Noah_Dalbah_CV.pdf" download className="cursor-pointer" title="Download resume">
                        <Download className="icon"/>
                    </a>
                </div>
            </div>

            <div ref={wrapperRef} className="w-full">
                <div
                    ref={containerRef}
                    className="overflow-auto flex justify-center"
                    style={{ maxHeight: isMaximized ? "calc(100vh - 48px)" : "80vh" }}
                >
                    <Document file="files/Noah_Dalbah_CV.pdf">
                        <Page
                            pageNumber={1}
                            width={pageWidth}
                            renderTextLayer
                            renderAnnotationLayer
                        />
                    </Document>
                </div>
            </div>
        </>
    );
};

const ResumeWindow = WindowWrapper(Resume, "resume");
export default ResumeWindow;