"use client";

import { getCatalogs } from "@/services/catalogServices";
import { useQuery } from "@tanstack/react-query";
import { HoverEffect } from "../ui/aceternity/cardHoverEffect";
import ShowError from "../ui/error";
import Loader from "../ui/loader";

const GridCatalog = () => {
    const {
        data: catalogs,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["catalogs"],
        queryFn: async () => await getCatalogs(),
    });

    if (isLoading) return <Loader />;

    if (isError) return <ShowError errorMessage={error.message} />;

    if (!catalogs)
        return (
            <div>
                <h2>Catalogues disponible</h2>
                <ul>
                    <li>Aucun catalogue disponible</li>
                </ul>
            </div>
        );

    return (
        <div className="mx-auto max-w-5xl px-8">
            <HoverEffect items={catalogs} />
        </div>
    );
};

export default GridCatalog;
