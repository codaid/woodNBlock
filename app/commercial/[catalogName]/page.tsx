import PdfViewer from "@/features/PdfViewer";

type Props = {
    params: {
        catalogName: string;
    };
};

const ViewCatalogPage = ({ params }: Props) => {
    return (
        <div>
            <PdfViewer pdfName={params.catalogName} />
        </div>
    );
};

export default ViewCatalogPage;
