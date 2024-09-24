"use client";

// React and Next.js imports
import Image from "next/image";
import Link from "next/link";

import { LuArrowRight } from "react-icons/lu";

// Third-party library imports
import Balancer from "react-wrap-balancer";

// Asset imports
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { motion } from "framer-motion";

const Hero = () => {
    return (
        <Container>
            <motion.div
                initial={{
                    opacity: 0,
                    y: -50,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                transition={{ duration: 0.2, delay: 0.1 }}
            >
                <div>
                    <Button
                        asChild
                        className="mb-6 w-fit"
                        size={"sm"}
                        variant={"outline"}
                    >
                        <Link
                            className="not-prose"
                            href="#contactForms"
                            onClick={(e) => {
                                e.preventDefault(); // Empêche la navigation par défaut
                                const contactSection =
                                    document.getElementById("contactForms");
                                contactSection?.scrollIntoView({
                                    behavior: "smooth",
                                }); // Scroll smooth vers l'ancre
                            }}
                        >
                            En savoir plus <LuArrowRight className="size-4" />
                        </Link>
                    </Button>
                    <h1>
                        <Balancer>Wood&apos;N Block</Balancer>
                    </h1>
                    <h3 className="text-muted-foreground">
                        <Balancer>
                            Votre maison n&apos;est plus qu&apos;a un clic !
                        </Balancer>
                    </h3>
                    <div className="not-prose my-8 h-96 w-full overflow-hidden rounded-lg border md:h-[480px] md:rounded-xl">
                        <Image
                            className="size-full object-cover object-bottom"
                            src="/images/photo_05.jpg"
                            width={1280 * 1.5}
                            height={652 * 1.5}
                            alt="hero image"
                        />
                    </div>
                </div>
            </motion.div>
        </Container>
    );
};

export default Hero;
