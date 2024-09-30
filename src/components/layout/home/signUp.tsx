"use client";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Loader from "@/components/ui/loader";
import { t_addUser } from "@/lib/schemaAddType";
import { schemaAddUser } from "@/schemaType";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { LuLogIn } from "react-icons/lu";

const SignUp = () => {
    const form = useForm<t_addUser>({
        resolver: zodResolver(schemaAddUser),
        defaultValues: {
            username: "",
            lastname: "",
            firstname: "",
            phone: "",
            email: "",
            password: "",
        },
    });

    const { mutate, isPending } = useMutation({
        mutationFn: async (values: t_addUser) => {
            return await fetch("/api/auth/signup", {
                method: "POST",
                headers: {
                    "Conten-Type": "application/json",
                },
                body: JSON.stringify(values),
            });
        },
        onSuccess: async (res) => {
            if (!res.ok) {
                if (res.status === 409) {
                    const resJson = await res.json();
                    if (resJson.message.includes("email")) {
                        toast.error("Email déjà utilisé");
                        form.setError("email", {
                            message: "Email déjà utilisé",
                        });
                    } else {
                        toast.error("Pseudo déjà utilisé");
                        form.setError("username", {
                            message: "Pseudo déjà utilisé",
                        });
                    }
                } else {
                    toast.error("Une erreur inconnue est survenue");
                }
                return;
            }
            const { user } = await res.json();
            toast.success("Compte créé. Connection...");
            await signIn("credentials", {
                redirect: true,
                callbackUrl: "/user",
                email: user.email,
                password: form.getValues("password"),
            });
        },
    });

    const onSubmit = (values: t_addUser) => {
        mutate(values);
    };

    const onError = (errors: any) => {
        console.log("error: ", errors);
    };
    return (
        <div className="mt-5">
            <div className="">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit, onError)}
                        className="gap-4 text-left sm:grid sm:grid-cols-2"
                    >
                        <FormField
                            control={form.control}
                            name="lastname"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nom</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            placeholder="DOE"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription></FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="firstname"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Prénom</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Prénom"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription></FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Pseudo</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="username"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription></FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Téléphone</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="06 9# ## ## ##"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription></FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="mail@mail.com"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription></FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Mot de passe</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="Mot de passe"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription></FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            type="submit"
                            className="w-full max-sm:mt-5 sm:col-span-2"
                            disabled={isPending}
                        >
                            S&apos;enregistrer
                            {isPending ? (
                                <Loader className="ml-2" />
                            ) : (
                                <LuLogIn className="ml-2" />
                            )}
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default SignUp;
