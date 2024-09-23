"use client";

import NotLogged from "@/components/layout/NotLogged";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Loader from "@/components/ui/loader";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

const UserPage = () => {
    const { isLoading, session } = useAuth();
    const router = useRouter();

    if (isLoading) return <Loader />;

    if (!session) return <NotLogged />;

    const user = session.user;

    if (user.userType === "admin") {
        router.push("/admin");
    }

    if (user.userType === "commercial") {
        router.push("/commercial");
    }

    return (
        <div className="mx-auto mt-12 w-fit">
            <BackgroundGradient>
                <Card className="max-w-xl">
                    <CardHeader>
                        <CardTitle>Bravo !!</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <h2 className="pb-2">
                            Votre compte à été créé avec succés.
                        </h2>
                        <p>
                            Pour le moment, seul les commerciaux on un accés au
                            catalogue.
                        </p>
                        <p>
                            Si vous êtes commercial, merci d&apos;envoyer un
                            mail au{" "}
                            <a
                                href="mailto:contact@woodnblock.com"
                                className="text-lg font-bold underline"
                            >
                                support
                            </a>{" "}
                            pour qu&apos;il active votre compte commercial.
                        </p>
                    </CardContent>
                </Card>
            </BackgroundGradient>
        </div>
    );
};

export default UserPage;
