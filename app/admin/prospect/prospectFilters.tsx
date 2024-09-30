"use client";

import { writeRdvTypesTitle } from "@/components/server/prospect.s";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useRouter, useSearchParams } from "next/navigation";

const ProspectFilters = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams?.toString());
    const arrayRdvTypes = searchParams?.get("rdvTypes")?.split(",");
    const sortOrder = params.get("sortOrder") ?? "desc";

    const rdvTypes = [
        "constructionProject",
        "becomeReseller",
        "becomeProvider",
    ];

    const handleClic = (rdv: string) => {
        let newArray = [];
        if (arrayRdvTypes?.includes(rdv)) {
            newArray = arrayRdvTypes.filter((el) => el !== rdv);
        } else {
            newArray = arrayRdvTypes ?? [];
            newArray.push(rdv);
        }
        params.set("rdvTypes", newArray.join(","));
        router.replace(`/admin/prospect?${params}`);
    };

    const handleDateChange = () => {
        if (sortOrder === "desc") {
            params.set("sortOrder", "asc");
        } else {
            params.set("sortOrder", "desc");
        }
        router.replace(`/admin/prospect?${params}`);
    };

    return (
        <div className="flex gap-4 py-5">
            {rdvTypes.map((rdv) => {
                const checked = arrayRdvTypes?.includes(rdv);
                return (
                    <Label htmlFor={rdv} key={`selectItem_${rdv}`} asChild>
                        <Button
                            variant={checked ? "default" : "outline"}
                            className="border-white"
                            onClick={() => handleClic(rdv)}
                        >
                            <Checkbox id={rdv} className="sr-only" />
                            {writeRdvTypesTitle(rdv)}
                        </Button>
                    </Label>
                );
            })}

            {/* Tri */}
            <div className="ml-auto">
                <Label>Trie :</Label>
                <Button variant={"ghost"} onClick={handleDateChange}>
                    {sortOrder === "desc"
                        ? "date descendante"
                        : "date ascendante"}
                </Button>
            </div>
        </div>
    );
};

export default ProspectFilters;
