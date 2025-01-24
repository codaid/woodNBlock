import { Button } from "@/components/ui/button";
import Link from "next/link";
import Authentication from "./authentication";

const HeroSection = () => {
    return (
        <div className="relative bg-gradient-to-bl from-primary-foreground via-primary-foreground to-background">
            <div className="container py-24 sm:py-32">
                <div className="grid items-center gap-8 md:grid-cols-2 lg:gap-12">
                    <div>
                        <p className="inline-block bg-gradient-to-l from-blue-600 to-violet-500 bg-clip-text text-sm font-medium text-transparent dark:from-blue-400 dark:to-violet-400">
                            La vision de 2024
                        </p>
                        <div className="mt-4 max-w-2xl md:mb-12">
                            <h1 className="mb-4 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                                Wood&apos;N Block
                            </h1>
                            <p className="text-xl text-muted-foreground">
                                Des solutions d&apos;habitation efficaces et
                                abordables
                            </p>
                        </div>
                        <blockquote className="relative mx-auto hidden max-w-sm md:block">
                            <div className="relative z-10">
                                <p className="text-xl italic">
                                    Des gens incroyables avec qui travailler.
                                    Des partenaires consciencieux et
                                    professionnels.
                                </p>
                            </div>
                        </blockquote>
                    </div>
                    <div>
                        <Authentication />
                    </div>
                </div>
            </div>
            <div className="relative overflow-hidden py-24 lg:py-32">
                <div
                    aria-hidden="true"
                    className="absolute -top-96 start-1/2 flex -translate-x-1/2"
                ></div>
                <div className="relative z-10">
                    <div className="container py-10 lg:py-16">
                        <div className="mx-auto max-w-2xl text-center">
                            <p className="">Réalisez votre projet</p>
                            <div className="mt-5 max-w-2xl">
                                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                                    Site en construction
                                </h1>
                            </div>
                            <div className="mt-5 max-w-3xl">
                                <p className="text-xl text-muted-foreground">
                                    Notre site web est en construction, mais
                                    vous pouvez déjà construire votre maison
                                    gràce a nos services.
                                </p>
                            </div>
                            <div className="mt-8 flex justify-center gap-3">
                                <Button asChild size={"lg"}>
                                    <Link href={"/contact"}>
                                        Envoyer un mail
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
