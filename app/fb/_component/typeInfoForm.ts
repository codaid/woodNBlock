import { z } from "zod";

export type t_infoForm = z.infer<typeof schemaInfoForm>;

export const schemaInfoForm = z
    .object({
        firstname: z.string().min(1, { message: "Votre prénom est requis" }),
        lastname: z.string().min(1, { message: "Votre nom est requis" }),
        phone: z.number().min(10, { message: "Votre numéro est requis" }),
        email: z.string().email({ message: "Format de mail non valide" }),
        address: z
            .object({
                street: z.string().optional(),
                postCode: z.string().optional(),
                city: z.string().optional(),
            })
            .optional(),
        rdvType: z
            .array(
                z.enum([
                    "constructionProject",
                    "becomeReseller",
                    "becomeProvider",
                ])
            )
            .nonempty("Vous devez sélectionner au moins 1 option"),

        constructionProject: z
            .object({
                haveBuildingSite: z.boolean().default(false),
                buildingPostCode: z.string().optional(),
                parcelNumber: z.string().optional(),
                havePlan: z.boolean().default(false),
                haveIdeaProject: z.boolean().default(false),
                wantSeeTemplate: z.boolean().default(false),
            })
            .refine(
                (data) => {
                    if (data.haveBuildingSite) {
                        return (
                            data.buildingPostCode &&
                            data.buildingPostCode.length > 0
                        );
                    }
                    return true;
                },
                {
                    message:
                        "Le code postal du chantier est requis si vous avez un terrain",
                    path: ["buildingPostCode"], // Spécifie l'erreur sur buildingPostCode
                }
            )
            .optional(),

        reseller: z
            .object({
                haveIndividualBusiness: z.boolean().default(false),
                legalRepresentativ: z.boolean().default(false),
                wantMoreBeforeOpeningBusiness: z.boolean().default(false),
            })
            .optional(),

        provider: z
            .array(
                z.enum([
                    "VRD",
                    "Terrassement",
                    "Fondation et pilotis",
                    "Gros oeuvre",
                    "Pose de menuiseries",
                    "Électricité (classic ou domotique)",
                    "Plomberie",
                    "Assainissement",
                    "Charpente, Toiture",
                    "Etanchéité",
                    "Revêtement (saturateur, lasure, vernis, peinture, ...",
                    "Clôture Portail",
                    "Mur de soutènement (Moellons ou enrochement)",
                    "Placoplâtre",
                    "Carrelage",
                    "Ebénisterie",
                    "Piscine",
                    "Permis de construire",
                    "Architect d'intérieur",
                    "Jardinier, paysagiste",
                    "Autres",
                ])
            )
            .optional(),
    })
    .refine(
        (data) => {
            if (data.rdvType.includes("constructionProject")) {
                return !!data.constructionProject;
            }
            return true;
        },
        {
            message: "Les détails du projet de construction sont requis",
            path: ["constructionProject"],
        }
    )
    .refine(
        (data) => {
            if (data.rdvType.includes("becomeReseller")) {
                return !!data.reseller;
            }
            return true;
        },
        {
            message: "Les détails du statut de revendeur sont requis",
            path: ["reseller"],
        }
    )
    .refine(
        (data) => {
            if (data.rdvType.includes("becomeProvider")) {
                return !!data.provider && data.provider.length > 0;
            }
            return true;
        },
        {
            message: "Les détails du statut de prestataire sont requis",
            path: ["provider"],
        }
    );
