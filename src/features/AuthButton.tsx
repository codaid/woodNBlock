"use client";

import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import { useAuth } from "@/hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import LoginButton from "./LoginButton";

const AuthButton = () => {
    const { session, isLoading } = useAuth();

    const user = session?.user;
    const { mutate, isPending } = useMutation({
        mutationFn: async () => signOut(),
    });

    if (isLoading) return <Loader />;

    if (!user) {
        return <LoginButton />;
    }

    return (
        <Button
            variant={"destructive"}
            onClick={() => mutate()}
            disabled={isPending}
        >
            Se déconnecter
            {isPending && <Loader className="ml-2" />}
        </Button>
    );
};

export default AuthButton;
