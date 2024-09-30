// admin/prospect/page.tsx

import { Search } from "@/components/admin/search";
import { getProspects } from "@/components/server/prospect.s";
import ProspectsList from "./ProspectsList";
import ProspectFilters from "./prospectFilters";

const ProspectPage = async ({
    searchParams,
}: {
    searchParams: {
        q: string;
        offset: string;
        rdvTypes?: string;
        sortOrder?: "asc" | "desc";
    };
}) => {
    const search = searchParams.q ?? "";
    const offset = searchParams.offset ?? 0;
    const sortOrder = searchParams.sortOrder ?? "desc";
    const rdvTypes = searchParams.rdvTypes
        ? searchParams.rdvTypes.split(",")
        : [];

    const limit = 5;
    const { prospects, nextOffset, prevOffset, totalProspects } =
        await getProspects(search, Number(offset), limit, {
            rdvTypes,
            sortOrder,
        });

    return (
        <main className="flex flex-1 flex-col p-4 md:p-6">
            <div className="mb-8 flex items-center">
                <h1 className="text-lg font-semibold md:text-2xl">Prospects</h1>
            </div>

            <div className="mb-4 w-full">
                <Search value={searchParams.q} />
                <div>
                    <ProspectFilters />
                </div>
            </div>
            <ProspectsList
                prospects={prospects}
                nextOffset={nextOffset}
                prevOffset={prevOffset}
                totalProspects={totalProspects}
                offset={Number(offset)}
                limit={limit}
            />
        </main>
    );
};

export default ProspectPage;
