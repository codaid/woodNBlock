import UploadCatalog from "@/components/admin/catalog/uploadCatalog";
import CatalogAdmin from "./catalog";

const CatalogPage = () => {
    return (
        <main className="flex flex-1 flex-col p-4 md:p-6">
            <div className="mb-8 flex items-center">
                <h1 className="text-lg font-semibold md:text-2xl">Catalogue</h1>
            </div>
            <div className="mb-4 w-full">
                <UploadCatalog />
            </div>
            <CatalogAdmin />
        </main>
    );
};

export default CatalogPage;
