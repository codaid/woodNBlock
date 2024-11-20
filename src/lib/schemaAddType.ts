import { schemaProspect, schemaUserData } from "@/schemaType";
import { z } from "zod";

export type t_addUser = z.infer<typeof schemaAddUser>;
export type t_addProspect = z.infer<typeof schemaAddProspect>;

export const schemaAddProspect = schemaProspect.omit({
    id: true,
    createdAt: true,
});
// export const schemaAddProspect = z.object({
//     createdAt: z.string(),
//     firstname: z.string().min(1, { message: "Votre prénom est requis" }),
//     lastname: z.string().min(1, { message: "Votre nom est requis" }),
//     phone: z.string().regex(/^\d+$/, "Numéro de téléphone invalide"),
//     email: z.string().email({ message: "Format de mail non valide" }),
//     address_street: z.string().optional(),
//     address_postCode: z.string().optional(),
//     address_city: z.string().optional(),
//     rdvTypes: z
//         .array(
//             z.enum(["constructionProject", "becomeReseller", "becomeProvider"])
//         )
//         .nonempty("Vous devez sélectionner au moins 1 option"),
//     constructionProject_haveBuildingSite: z.boolean().default(false).optional(),
//     constructionProject_buildingPostCode: z.string().optional(),
//     constructionProject_parcelNumber: z.string().optional(),
//     constructionProject_havePlan: z.boolean().default(false).optional(),
//     constructionProject_haveIdeaProject: z.boolean().default(false).optional(),
//     constructionProject_wantSeeTemplate: z.boolean().default(false).optional(),
//     reseller_haveIndividualBusiness: z.boolean().default(false).optional(),
//     reseller_legalRepresentativ: z.boolean().default(false).optional(),
//     reseller_wantMoreBeforeOpeningBusiness: z
//         .boolean()
//         .default(false)
//         .optional(),
//     providerServices: z.array(z.enum(ourServices)).optional(),
// });

export const schemaAddUser = schemaUserData
    .omit({
        id: true,
        emailVerified: true,
        image: true,
        userType: true,
    })
    .extend({
        password: z.string().min(6, {
            message: "Le mot de passe doit contenir 6 caractere minimum",
        }),
    });
