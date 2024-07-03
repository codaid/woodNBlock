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
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

const schema = z.object({
    catalog: z
        .instanceof(File, {
            message: "Vous devez sélectionner un fichier",
        })
        .refine((file) => file.type === "application/pdf", {
            message: "Le fichier doit être au format PDF",
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

    const mutation = useMutation({
        mutationFn: async (data: FormData) => {
            const response = await fetch("/api/upload", {
                method: "POST",
                body: data,
            });

            if (!response.ok) {
                throw new Error("Erreur lors de l'upload");
            }

            return response.json();
        },
        onSuccess: () => {
            toast.success("Catalogue uploadé avec succès");
            form.reset();
        },
        onError: () => {
            toast.error("Erreur lors de l'upload du catalogue");
        },
    });

    const onSubmit = (input: Schema) => {
        const formData = new FormData();
        formData.append("file", input.catalog);

        mutation.mutate(formData);
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
                            disabled={mutation.isPending}
                        >
                            Envoyer
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};

export default UploadCatalog;
