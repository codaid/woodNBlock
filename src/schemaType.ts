import { z } from "zod";

export type t_addUser = z.infer<typeof schemaAddUser>;
export type t_userData = z.infer<typeof schemaUserData>;
export type t_userSelect = z.infer<typeof schemaSelectUser>;
export type t_catalog = z.infer<typeof schemaCatalog>;

export const schemaUserData = z.object({
    id: z.string(),
    username: z.string(),
    firstname: z.string(),
    lastname: z.string(),
    email: z.string(),
    emailVerified: z.string().nullable().optional(),
    image: z.string().nullable().optional(),
    phone: z.string().regex(/^\d+$/, "Numéro de téléphone invalide"),
    userType: z.enum(["commercial", "user", "admin"]),
});

export const schemaSelectUser = z.object({
    id: z.string(),
    username: z.string(),
    email: z.string(),
    firstname: z.string(),
    lastname: z.string(),
    phone: z.string().regex(/^\d+$/, "Numéro de téléphone invalide"),
});

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

export const schemaCatalog = z.object({
    id: z.string(),
    title: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
});

export const schemaSelectUsers = z.array(schemaSelectUser);
export const schemaCatalogs = z.array(schemaCatalog);
