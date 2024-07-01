"use client";

import { BackgroundGradient } from "@/components/ui/background-gradient";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignIn from "./signIn";
import SignUp from "./signUp";

const Authentication = () => {
    return (
        <div className="ms-auto lg:mx-auto lg:me-0 lg:max-w-lg">
            <BackgroundGradient>
                <Card>
                    <CardHeader className="text-center">
                        <h2 className="text-2xl font-semibold leading-none tracking-tight">
                            Rejoignez-nous
                        </h2>
                        <CardDescription>
                            Vous avez deja un compte ?{" "}
                            <a
                                className="text-primary underline-offset-4 hover:underline"
                                href="#"
                            >
                                Se connecter
                            </a>
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Tabs defaultValue="signup">
                            <TabsList>
                                <TabsTrigger value="signup">
                                    S&apos;enregistrer
                                </TabsTrigger>
                                <TabsTrigger value="signin">
                                    Se connecter
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="signup">
                                {" "}
                                <SignUp />{" "}
                            </TabsContent>
                            <TabsContent value="signin">
                                {" "}
                                <SignIn />{" "}
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>
            </BackgroundGradient>
        </div>
    );
};

export default Authentication;
