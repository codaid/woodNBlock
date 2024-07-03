"use client";

import { Card, CardHeader } from "@/components/ui/card";
import Loader from "@/components/ui/loader";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

// Spécifiez l'URL du worker
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url
).toString();

type Props = {
    pdfName: string;
};

const PdfViewer = ({ pdfName }: Props) => {
    const [file, setFile] = useState<string | null>(null);
    const [numPages, setNumPages] = useState<number | null>(null);

    const {} = useQuery({
        queryKey: ["catalog", pdfName],
        queryFn: async () => {
            await fetch("/api/get-pdf", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ pdfName }),
            })
                .then((response) => response.blob())
                .then((blob) => {
                    const url = URL.createObjectURL(blob);
                    setFile(url);
                })
                .catch((error) => {
                    console.error("Error fetching the PDF:", error);
                });
        },
    });

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
                <Card>
                    <CardHeader>
                        <p className="mr-2">Chargement du catalogue</p>
                        <Loader />
                    </CardHeader>
                </Card>
            )}
        </div>
    );
};

export default PdfViewer;
