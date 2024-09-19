"use client";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { LuSend } from "react-icons/lu";
import { z } from "zod";

const defaultFormState = {
    name: {
        value: "",
        error: "",
    },
    email: {
        value: "",
        error: "",
    },
    message: {
        value: "",
        error: "",
    },
};

const schemaContact = z.object({
    name: z.string(),
    phone: z.string().optional().nullable(),
    email: z.string(),
    object: z.string().min(1),
    message: z.string().min(10),
});

export const Contact = () => {
    const [formData, setFormData] = useState(defaultFormState);

    const form = useForm<z.infer<typeof schemaContact>>({
        resolver: zodResolver(schemaContact),
        defaultValues: {
            name: "",
            phone: null,
            email: "",
            object: "",
            message: "",
        },
    });

    const handleSubmit = (e: any) => {
        e.preventDefault();
        // Write your submit logic here
        console.log(formData);
    };
    return (
        <Form {...form}>
            <form className="form" onSubmit={handleSubmit}>
                <div className="flex flex-col justify-between gap-5 md:flex-row">
                    <input
                        type="text"
                        placeholder="Nom"
                        className="w-full rounded-md bg-neutral-100 p-2 text-sm text-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-200"
                        value={formData.name.value}
                        onChange={(e) => {
                            setFormData({
                                ...formData,
                                name: {
                                    value: e.target.value,
                                    error: "",
                                },
                            });
                        }}
                    />
                    <input
                        type="text"
                        placeholder="Télephone"
                        className="w-full rounded-md bg-neutral-100 p-2 text-sm text-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-200"
                        value={formData.name.value}
                        onChange={(e) => {
                            setFormData({
                                ...formData,
                                name: {
                                    value: e.target.value,
                                    error: "",
                                },
                            });
                        }}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full rounded-md bg-neutral-100 p-2 text-sm text-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-200"
                        value={formData.email.value}
                        onChange={(e) => {
                            setFormData({
                                ...formData,
                                email: {
                                    value: e.target.value,
                                    error: "",
                                },
                            });
                        }}
                    />
                </div>
                <div className="pt-4">
                    <input
                        type="text"
                        placeholder="Object"
                        className="w-full rounded-md bg-neutral-100 p-2 text-sm text-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-200"
                        value={formData.email.value}
                        onChange={(e) => {
                            setFormData({
                                ...formData,
                                email: {
                                    value: e.target.value,
                                    error: "",
                                },
                            });
                        }}
                    />
                    <textarea
                        placeholder="Votre message"
                        rows={10}
                        className="mt-4 w-full rounded-md bg-neutral-100 p-2 text-sm text-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-200"
                        value={formData.message.value}
                        onChange={(e) => {
                            setFormData({
                                ...formData,
                                message: {
                                    value: e.target.value,
                                    error: "",
                                },
                            });
                        }}
                    />
                </div>
                <Button
                    className="mt-4 flex w-full items-center justify-center rounded-md p-2 font-bold"
                    type="submit"
                >
                    Envoyer <LuSend className="ml-2" />
                </Button>
            </form>
        </Form>
    );
};
