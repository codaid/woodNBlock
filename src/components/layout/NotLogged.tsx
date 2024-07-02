"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";

const NotLogged = () => {
    const router = useRouter();

    return (
        <Card className="sm:col-span-2">
            <CardHeader className="pb-3">
                <CardTitle>Non authentifié</CardTitle>
                <CardDescription className="max-w-lg text-balance leading-relaxed">
                    Vous devez être connecté pour voir ces informations.
                </CardDescription>
            </CardHeader>
            <CardFooter>
                <Button onClick={() => router.push("/authentication")}>
                    Se connecter
                </Button>
            </CardFooter>
        </Card>
    );
};

export default NotLogged;
