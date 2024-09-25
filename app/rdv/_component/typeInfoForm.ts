import { z } from "zod";
import { ourServices } from "./constante";

export type t_infoForm = z.infer<typeof schemaInfoForm>;

export const schemaInfoForm = z.object({
    firstname: z.string().min(1, { message: "Votre prénom est requis" }),
    lastname: z.string().min(1, { message: "Votre nom est requis" }),
    phone: z.string().regex(/^\d+$/, "Numéro de téléphone invalide"),
    email: z.string().email({ message: "Format de mail non valide" }),
    address_street: z.string().optional(),
    address_postCode: z.string().optional(),
    address_city: z.string().optional(),
    rdvTypes: z
        .array(
            z.enum(["constructionProject", "becomeReseller", "becomeProvider"])
        )
        .nonempty("Vous devez sélectionner au moins 1 option"),
    constructionProject_haveBuildingSite: z.boolean().default(false),
    constructionProject_buildingPostCode: z.string().optional(),
    constructionProject_parcelNumber: z.string().optional(),
    constructionProject_havePlan: z.boolean().default(false),
    constructionProject_haveIdeaProject: z.boolean().default(false),
    constructionProject_wantSeeTemplate: z.boolean().default(false),
    reseller_haveIndividualBusiness: z.boolean().default(false),
    reseller_legalRepresentativ: z.boolean().default(false),
    reseller_wantMoreBeforeOpeningBusiness: z.boolean().default(false),

    providerServices: z.array(z.enum(ourServices)).optional(),
});
