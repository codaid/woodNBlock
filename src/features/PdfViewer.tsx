"use client";

import { Card, CardHeader } from "@/components/ui/card";
import ShowError from "@/components/ui/error";
import Loader from "@/components/ui/loader";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

type Props = {
    pdfName: string;
};

const PdfViewer = ({ pdfName }: Props) => {
    const [numPages, setNumPages] = useState<number | null>(null);

    const {
        data: file,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["catalog", pdfName],
        queryFn: async () => {
            try {
                const res = await fetch("/api/get-pdf", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ title: pdfName }),
                });
                const blob = await res.blob();
                const url = URL.createObjectURL(blob);
                return url;
            } catch (error) {
                console.error("Error fetching the PDF:", error);
            }
        },
    });

    if (isLoading) return <Loader />;

    if (isError) return <ShowError errorMessage={error.message} />;

    const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
        setNumPages(numPages);
    };

    return (
        <div className="mx-auto max-w-xl">
            <div className="mx-auto my-12 max-w-2xl text-center">
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                    {pdfName.replace("_", " ")}
                </h1>
            </div>
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
