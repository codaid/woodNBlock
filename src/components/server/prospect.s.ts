// prospect.s.ts
import { prisma } from "@/lib/prisma";
import { schemaProspects, t_prospect } from "@/schemaType";
import { Prisma } from "@prisma/client";

export const getProspects = async (
    search: string,
    offset: number,
    limit = 5,
    filters: { rdvTypes?: string[]; sortOrder?: "asc" | "desc" } = {}
): Promise<{
    prospects: t_prospect[];
    nextOffset: number | null;
    prevOffset: number | null;
    totalProspects: number;
}> => {
    const { rdvTypes, sortOrder } = filters;
    const whereClause: Prisma.ProspectWhereInput = {
        ...(search && {
            OR: [
                { firstname: { contains: search, mode: "insensitive" } },
                { lastname: { contains: search, mode: "insensitive" } },
                { email: { contains: search, mode: "insensitive" } },
                { phone: { contains: search, mode: "insensitive" } },
            ],
        }),
        ...(rdvTypes &&
            rdvTypes.length > 0 && {
                rdvTypes: { hasSome: [...rdvTypes] },
            }),
    };

    const totalProspects = await prisma.prospect.count({ where: whereClause });
    const prospects = await prisma.prospect.findMany({
        where: whereClause,
        skip: offset,
        take: limit,
        orderBy: {
            createdAt: sortOrder || "desc",
        },
    });

    const prospectParse = schemaProspects.parse(prospects);

    const nextOffset = offset + limit < totalProspects ? offset + limit : null;
    const prevOffset = offset > 0 ? Math.max(0, offset - limit) : null;

    return { prospects: prospectParse, nextOffset, prevOffset, totalProspects };
};

export const updateProspectStatus = async (
    id: string,
    status: "idle" | "treat"
) => {
    try {
        const response = await fetch("/api/prospect", {
            method: "PATCH",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({ id, status }),
        });
        if (!response.ok) {
            switch (response.status) {
                case 401:
                    throw new Error(
                        "Vous n'êtes pas identifié. Veuillez vous deconnecter et réessayer"
                    );

                case 403:
                    throw new Error(
                        "Vous n'êtes pas autorisé à effectuer cette action."
                    );

                case 404:
                    throw new Error(
                        "Votre `id` ou votre compte utilisateur est introuvable. Veuillez vous deconnecter et réessayer"
                    );

                default:
                    throw new Error(
                        "Une erreur inconnu s'est produite. Veuillez réessayer. Contacter le support si le probleme persiste."
                    );
            }
        }
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const writeStatusTitle = (status: string): string => {
    if (status === "idle") return "attente";
    return "contacté";
};

export const writeRdvTypesTitle = (rdv: string): string => {
    if (rdv === "constructionProject") return "Projet de construction";
    if (rdv === "becomeReseller") return "Devenir revendeur";
    return "Devenir partenaire";
};
