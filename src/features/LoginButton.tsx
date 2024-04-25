"use client";

import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import React from "react";
import { LuLogIn } from "react-icons/lu";

const LoginButton = () => {
    const mutation = useMutation({
        mutationFn: async () => signIn(),
    });

    return (
        <Button variant="outline" size="sm" onClick={() => mutation.mutate()}>
            {mutation.isPending ? (
                <Loader className="mr-2" size={12} />
            ) : (
                <LuLogIn className="mr-2" size={12} />
            )}
            Se connecter
        </Button>
    );
};

export default LoginButton;
