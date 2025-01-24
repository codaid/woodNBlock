"use client";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Loader from "@/components/ui/loader";
import { Textarea } from "@/components/ui/textarea";
import { schemaContact, t_contact } from "@/schemaType";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { LuSend } from "react-icons/lu";

export const Contact = () => {
    const router = useRouter();

    const form = useForm<t_contact>({
        resolver: zodResolver(schemaContact),
        defaultValues: {
            name: "",
            phone: "",
            email: "",
            object: "",
            message: "",
        },
    });

    const { mutate, isPending } = useMutation({
        mutationFn: async (contact: t_contact) => {
            try {
                return await fetch("/api/contact", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(contact),
                });
            } catch (error) {
                console.log(error);
                toast.error("Une erreur est survenue");
            }
        },
        onSuccess: async (res) => {
            console.log(res);
            if (res && res.ok) {
                router.push("/thanks");
            } else {
                toast.error("Une erreur est survenue lors de l'envoie.");
            }
        },
    });

    const onSuccess = (values: t_contact) => {
        mutate(values);
    };

    const onError = (error: any) => {
        toast.error(error.message);
        console.log(error);
    };

    return (
        <Form {...form}>
            <form
                className="form"
                onSubmit={form.handleSubmit(onSuccess, onError)}
            >
                <div className="flex flex-col justify-between gap-5 md:flex-row">
                    <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-3">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormControl
                                        className={
                                            form.formState.errors.name
                                                ? "border-destructive"
                                                : ""
                                        }
                                    >
                                        <Input
                                            placeholder="Nom complet"
                                            className="w-full rounded-md border bg-neutral-100 p-2 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-neutral-200 dark:bg-slate-700"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormControl
                                        className={
                                            form.formState.errors.phone
                                                ? "border-destructive"
                                                : ""
                                        }
                                    >
                                        <Input
                                            placeholder="0692 00 00 00"
                                            className="w-full rounded-md border bg-neutral-100 p-2 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-neutral-200 dark:bg-slate-700"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className="w-full max-sm:col-span-2">
                                    <FormControl
                                        className={
                                            form.formState.errors.phone
                                                ? "border-destructive"
                                                : ""
                                        }
                                    >
                                        <Input
                                            placeholder="mail@mail.com"
                                            className="w-full rounded-md border bg-neutral-100 p-2 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-neutral-200 dark:bg-slate-700"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                <FormField
                    control={form.control}
                    name="object"
                    render={({ field }) => (
                        <FormItem className="mt-4 w-full">
                            <FormControl
                                className={
                                    form.formState.errors.phone
                                        ? "border-destructive"
                                        : ""
                                }
                            >
                                <Input
                                    placeholder="Object"
                                    className="w-full rounded-md border bg-neutral-100 p-2 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-neutral-200 dark:bg-slate-700"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                        <FormItem className="mt-4 w-full">
                            <FormControl
                                className={
                                    form.formState.errors.phone
                                        ? "border-destructive"
                                        : ""
                                }
                            >
                                <Textarea
                                    rows={10}
                                    placeholder="Votre message"
                                    className="w-full rounded-md border bg-neutral-100 p-2 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-neutral-200 dark:bg-slate-700"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button
                    variant={"ringHover"}
                    className="mt-4 flex w-full items-center justify-center rounded-md bg-color_primary p-2 font-bold text-color_light hover:bg-color_primary hover:ring-color_primary"
                    type="submit"
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
    );
};
