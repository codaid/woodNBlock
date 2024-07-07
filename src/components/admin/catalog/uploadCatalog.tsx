"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Loader from "@/components/ui/loader";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { LuSend } from "react-icons/lu";

const schema = z.object({
    catalog: z
        .instanceof(File, {
            message: "Vous devez sélectionner un fichier",
        })
        .refine((file) => file.type === "application/pdf", {
            message: "Le fichier doit être au format PDF",
        })
        .refine((file) => /^[a-zA-Z0-9 ]+$/.test(file.name), {
            message:
                "Le nom du fichier ne doit contenir que des lettres, des chiffres et des espaces",
        }),
});

type Schema = z.infer<typeof schema>;

const UploadCatalog = () => {
    const form = useForm<Schema>({
        resolver: zodResolver(schema),
        defaultValues: {
            catalog: undefined,
        },
    });

    const { mutate, isPending } = useMutation({
        mutationFn: async (data: FormData) => {
            const response = await fetch("/api/upload", {
                method: "POST",
                body: data,
            });

            if (!response.ok) {
                switch (response.status) {
                    case 400:
                        throw new Error(
                            "Le fichier est manquant. Veuillez ajouter de nouveau le fichier"
                        );

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

                    case 409:
                        throw new Error(
                            "Le titre de ce catalogue existe déjà. Modifiez le titre de votre fichier."
                        );

                    default:
                        throw new Error(
                            "Erreur lors de l'upload. Veuillez réessayer. Contacter le support si le probleme persiste."
                        );
                }
            }

            return response.json();
        },
        onSuccess: () => {
            toast.success("Catalogue ajouté avec succès");
            form.reset();
        },
        onError: (error: Error) => {
            toast.error(error.message);
        },
    });

    const onSubmit = (input: Schema) => {
        const formData = new FormData();
        formData.append("file", input.catalog);

        mutate(formData);
    };

    return (
        <Card className="mx-auto max-w-xl bg-card py-5">
            <CardHeader>
                <CardTitle>Ajouter un catalogue</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="flex w-full flex-col gap-6"
                    >
                        <FormField
                            control={form.control}
                            name="catalog"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Catalogue au format pdf
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="file"
                                            onChange={(e) => {
                                                if (
                                                    e.currentTarget.files &&
                                                    e.currentTarget.files[0]
                                                ) {
                                                    field.onChange(
                                                        e.currentTarget.files[0]
                                                    );
                                                }
                                            }}
                                            accept="application/pdf"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            type="submit"
                            className="w-fit"
                            disabled={isPending}
                        >
                            Envoyer
                            {isPending ? (
                                <Loader className="ml-2" />
                            ) : (
                                <LuSend className="ml-2" />
                            )}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};

export default UploadCatalog;
