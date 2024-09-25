"use client";

// React and Next.js imports
import Image from "next/image";
import Link from "next/link";

import { LuArrowRight } from "react-icons/lu";

// Third-party library imports
import Balancer from "react-wrap-balancer";

// Asset imports
import { Button } from "@/components/ui/button";
import Fade from "@/components/ui/codaidComp/motion/fade";
import ScrollButton from "@/components/ui/codaidComp/ScrollButton";
import { Heading } from "@/components/ui/heading";

const Hero = () => {
    const gotoContactForms = () => {
        const contactSection = document.getElementById("contactForms");
        contactSection?.scrollIntoView({
            behavior: "smooth",
        });
    };

    return (
        <div className="sm:mt-20">
            <Fade className="flex flex-col justify-between p-0">
                <div>
                    <Button
                        asChild
                        className="mb-6 w-fit border-color_primary"
                        size={"sm"}
                        variant={"outline"}
                    >
                        <Link
                            className="not-prose"
                            href="#contactForms"
                            onClick={(e) => {
                                e.preventDefault();
                                gotoContactForms();
                            }}
                        >
                            En savoir plus <LuArrowRight className="size-4" />
                        </Link>
                    </Button>
                    <div>
                        <Balancer>
                            <Heading className="bg-gradient-to-r from-color_primary to-color_primary-light text-3xl font-bold">
                                Wood&apos;N Block
                            </Heading>
                        </Balancer>
                    </div>
                    <h3 className="text-muted-foreground">
                        <Balancer>
                            Votre maison n&apos;est plus qu&apos;a un clic !
                        </Balancer>
                    </h3>
                    <div className="not-prose my-8 h-96 w-full overflow-hidden rounded-lg border md:h-[480px] md:rounded-xl">
                        <Image
                            className="size-full object-cover object-bottom"
                            src="/images/photo_05.jpg"
                            width={1280}
                            height={652}
                            alt="hero image"
                        />
                    </div>
                </div>

                <div className="mt-14 flex justify-center">
                    <ScrollButton callBack={gotoContactForms}>
                        Voir plus
                    </ScrollButton>
                </div>
            </Fade>
        </div>
    );
};

export default Hero;
