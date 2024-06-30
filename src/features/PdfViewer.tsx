"use client";

import { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

// Spécifiez l'URL du worker
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url
).toString();

const PdfViewer = () => {
    const [file, setFile] = useState<string | null>(null);
    const [numPages, setNumPages] = useState<number | null>(null);

    useEffect(() => {
        // Récupérer le PDF depuis l'API
        fetch("/api/get-pdf")
            .then((response) => response.blob())
            .then((blob) => {
                const url = URL.createObjectURL(blob);
                setFile(url);
            })
            .catch((error) => {
                console.error("Error fetching the PDF:", error);
            });
    }, []);

    const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
        setNumPages(numPages);
    };

    return (
        <div>
            {file ? (
                <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
                    {Array.from(new Array(numPages), (el, index) => (
                        <Page
                            key={`page_${index + 1}`}
                            pageNumber={index + 1}
                            renderTextLayer={false}
                            renderAnnotationLayer={false}
                        />
                    ))}
                </Document>
            ) : (
                <p>Loading PDF...</p>
            )}
        </div>
    );
};

export default PdfViewer;
