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
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { LuLogIn } from "react-icons/lu";
import { z } from "zod";

const formSchema = z.object({
    username: z.string(),
    lastName: z.string(),
    firstName: z.string().email(),
    number: z.number(),
    email: z.string().email(),
    password: z.string(),
});

const SignUp = () => {
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            lastName: "",
            firstName: "",
            number: 0,
            email: "",
            password: "",
        },
    });

    const { mutate, isPending } = useMutation({
        mutationFn: async (values: z.infer<typeof formSchema>) => {
            return await fetch("/api/auth/signup", {
                method: "POST",
                headers: {
                    "Conten-Type": "application/json",
                },
                body: JSON.stringify({
                    username: values.username,
                    email: values.email,
                    password: values.password,
                }),
            });
        },
        onSuccess: async (res) => {
            if (!res.ok) {
                if (res.status === 409) {
                    const resJson = await res.json();
                    console.log(resJson);
                    toast.error("Pseudo déjà utilisé");
                    form.setError("username", {
                        message: "Pseudo déjà utilisé",
                    });
                } else {
                    toast.error("Une erreur inconnue est survenue");
                }
                return;
            }
            toast.success("Compte créé");
            router.push("/user/home");
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        mutate(values);
    }
    return (
        <div className="mt-5">
            <div className="">
                <Form {...form}>
                    <form
                        noValidate
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="grid grid-cols-2 gap-4"
                    >
                        <FormField
                            control={form.control}
                            name="lastName"
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
                            name="firstName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Prénom</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
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
                            name="number"
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
                                            type="email"
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
                            className="col-span-2"
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
