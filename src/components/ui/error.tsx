"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

type Props = {
    errorMessage?: string;
};

const ShowError = ({ errorMessage }: Props) => {
    return (
        <Card className="border border-red-500">
            <CardHeader>
                <CardTitle className="text-destructive">Erreur</CardTitle>
                <CardDescription>Une erreur est survenue.</CardDescription>
            </CardHeader>
            <CardContent>
                <p>{errorMessage}</p>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
                <Button onClick={() => window.location.reload()}>
                    Recharger
                </Button>
            </CardFooter>
        </Card>
    );
};

export default ShowError;
