import { schemaCatalogs, t_catalog } from "@/schemaType";

export const getCatalogs = async (): Promise<t_catalog[]> => {
    try {
        const response = await fetch("/api/upload", {
            method: "GET",
        });

        if (!response.ok) {
            throw new Error("Failed to fetch catalogs");
        }

        const data = await response.json();
        const catalogs = schemaCatalogs.parse(data.files);
        console.log(catalogs);
        return catalogs;
    } catch (error) {
        return [];
    }
};
