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
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { LuLogIn } from "react-icons/lu";
import { z } from "zod";

const formSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});

const SignIn = () => {
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const { mutate, isPending } = useMutation({
        mutationFn: async (values: z.infer<typeof formSchema>) => {
            try {
                return await signIn("credentials", {
                    redirect: false,
                    // callbackUrl: "/user/home",
                    email: values.email,
                    password: values.password,
                });
            } catch (error) {
                console.log(error);
                toast.error("Une erreur est survenue");
            }
        },
        onSuccess: async (res) => {
            console.log(res);
            if (!res) {
                toast.error("Erreur d'authentification");
                form.setError("email", {
                    type: "manual",
                    message: "Erreur de connexion. Verifiez vos identifiants.",
                });
            } else if (res?.error) {
                console.log(res.error);
                toast.error("Erreur d'authentification");
                form.setError("email", {
                    type: "manual",
                    message: "Erreur de connexion. Verifiez vos identifiants.",
                });
            } else {
                toast.success("Identifié avec succes");
                router.push("/user");
            }
        },
        onError: () => {
            toast.error("Failed to sign in. Please check your credentials.");
        },
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        mutate(values);
    };

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
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            placeholder="Email"
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
                            Se connecter
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

export default SignIn;
