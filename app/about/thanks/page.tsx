"use client";

import { Container } from "@/components/ui/container";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LuCheckCircle } from "react-icons/lu";

export default function Component() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <Container>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isVisible ? 1 : 0 }}
                transition={{ duration: 0.5 }}
                className="flex min-h-screen items-center justify-center"
            >
                <div className="w-full max-w-md rounded-lg bg-color_primary-foreground p-8 shadow-lg">
                    <div className="flex flex-col items-center text-center">
                        <LuCheckCircle className="mb-4 size-16 text-green-500" />
                        <h2 className="mb-2 text-2xl font-bold text-gray-800">
                            Envoie réussi
                        </h2>
                        <p className="mb-6 text-gray-600">
                            Un membre de notre équipe vous contactera dans les
                            plus brefs délais.
                        </p>
                        <Link
                            href="/rdv"
                            className="rounded-md bg-color_primary px-6 py-2 text-white transition-colors duration-300 hover:bg-color_primary-light"
                        >
                            Retourner a la page d&apos;accueil
                        </Link>
                    </div>
                </div>
            </motion.div>
        </Container>
    );
}
