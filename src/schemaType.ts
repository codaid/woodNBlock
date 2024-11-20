import { z } from "zod";
import { ourServices } from "./constants/prospectConstant";

export type t_userData = z.infer<typeof schemaUserData>;
export type t_userSelect = z.infer<typeof schemaSelectUser>;
export type t_catalog = z.infer<typeof schemaCatalog>;
export type t_userUpdate = z.infer<typeof schemaUserUpdate>;
export type t_prospect = z.infer<typeof schemaProspect>;

export const schemaUserData = z.object({
    id: z.string(),
    username: z.string().min(2, { message: "Vous devez entrer un pseudo" }),
    firstname: z.string().min(2, { message: "Vous devez entrer votre prénom" }),
    lastname: z.string().min(2, { message: "Vous devez entrer votre nom" }),
    email: z.string().email({ message: "L'email est requis" }),
    emailVerified: z.string().nullable().optional().nullable(),
    image: z.string().nullable().optional().nullable(),
    phone: z.string().regex(/^\d+$/, "Numéro de téléphone invalide"),
    userType: z.enum(["commercial", "user", "admin"]),
});

export const schemaSelectUser = z.object({
    id: z.string(),
    username: z.string(),
    email: z.string(),
    firstname: z.string(),
    lastname: z.string(),
    userType: z.enum(["commercial", "user", "admin"]),
    phone: z.string().regex(/^\d+$/, "Numéro de téléphone invalide"),
});

export const schemaCatalog = z.object({
    id: z.string(),
    title: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
});

export const schemaUserUpdate = z.object({
    id: z.string(),
    userType: z.enum(["commercial", "user", "admin"]),
});

export const schemaProspect = z.object({
    id: z.string(),
    createdAt: z.date(),
    firstname: z.string().min(1, { message: "Votre prénom est requis" }),
    lastname: z.string().min(1, { message: "Votre nom est requis" }),
    phone: z.string().regex(/^\d+$/, "Numéro de téléphone invalide"),
    email: z.string().email({ message: "Format de mail non valide" }),
    status: z.enum(["idle", "treat"]).default("idle"),
    address_street: z.string().optional(),
    address_postCode: z.string().optional(),
    address_city: z.string().optional(),
    rdvTypes: z
        .array(
            z.enum(["constructionProject", "becomeReseller", "becomeProvider"])
        )
        .nonempty("Vous devez sélectionner au moins 1 option"),
    constructionProject_haveBuildingSite: z.boolean().default(false).optional(),
    constructionProject_buildingPostCode: z.string().optional(),
    constructionProject_parcelNumber: z.string().optional(),
    constructionProject_havePlan: z.boolean().default(false).optional(),
    constructionProject_haveIdeaProject: z.boolean().default(false).optional(),
    constructionProject_wantSeeTemplate: z.boolean().default(false).optional(),
    reseller_haveIndividualBusiness: z.boolean().default(false).optional(),
    reseller_legalRepresentativ: z.boolean().default(false).optional(),
    reseller_wantMoreBeforeOpeningBusiness: z
        .boolean()
        .default(false)
        .optional(),

    providerServices: z.array(z.enum(ourServices)).optional(),
});
// export const schemaProspect = z.object({
//     id: z.string(),
//     createdAt: z.date(),
//     firstname: z.string().min(1, { message: "Votre prénom est requis" }),
//     lastname: z.string().min(1, { message: "Votre nom est requis" }),
//     phone: z.string().regex(/^\d+$/, "Numéro de téléphone invalide"),
//     email: z.string().email({ message: "Format de mail non valide" }),
//     status: z.enum(["idle", "treat"]).default("idle"),
//     address_street: z.string().optional().nullable(),
//     address_postCode: z.string().optional().nullable(),
//     address_city: z.string().optional().nullable(),
//     rdvTypes: z
//         .array(
//             z.enum(["constructionProject", "becomeReseller", "becomeProvider"])
//         )
//         .nonempty("Vous devez sélectionner au moins 1 option"),
//     constructionProject_haveBuildingSite: z
//         .boolean()
//         .default(false)
//         .optional()
//         .nullable(),
//     constructionProject_buildingPostCode: z.string().optional().nullable(),
//     constructionProject_parcelNumber: z.string().optional().nullable(),
//     constructionProject_havePlan: z
//         .boolean()
//         .default(false)
//         .optional()
//         .nullable(),
//     constructionProject_haveIdeaProject: z
//         .boolean()
//         .default(false)
//         .optional()
//         .nullable(),
//     constructionProject_wantSeeTemplate: z
//         .boolean()
//         .default(false)
//         .optional()
//         .nullable(),
//     reseller_haveIndividualBusiness: z
//         .boolean()
//         .default(false)
//         .optional()
//         .nullable(),
//     reseller_legalRepresentativ: z
//         .boolean()
//         .default(false)
//         .optional()
//         .nullable(),
//     reseller_wantMoreBeforeOpeningBusiness: z
//         .boolean()
//         .default(false)
//         .optional()
//         .nullable(),

//     providerServices: z.array(z.enum(ourServices)).optional().nullable(),
// });

export const schemaProspects = z.array(schemaProspect);
export const schemaSelectUsers = z.array(schemaSelectUser);
export const schemaCatalogs = z.array(schemaCatalog);
