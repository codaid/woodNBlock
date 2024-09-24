// BounceUp.tsx
"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface BounceUpProps {
    children: ReactNode;
    stiffness?: number; // force du rebond
    damping?: number; // contrôle la fluidité du mouvement
    duration?: number; // durée de l'animation
    delay?: number; // délai de l'animation
    layout?: boolean;
    className?: string;
}

const bounceUpVariant = {
    initial: { y: 50, opacity: 0 }, // départ en bas, caché
    animate: { y: 0, opacity: 1 }, // rebond vers le haut si visible, sinon vers le bas
    exit: { y: 50, opacity: 0 },
};

const BounceUp = ({
    children,
    stiffness = 50,
    damping = 10,
    duration = 0.1,
    delay = 0,
    layout = false,
    className,
}: BounceUpProps) => {
    return (
        <motion.div
            variants={bounceUpVariant}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            exit={{ y: 50, opacity: 0 }}
            layout={layout}
            transition={{
                type: "spring",
                stiffness,
                damping,
                duration,
                delay,
                layout: { type: "spring", duration: 0.5 },
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export default BounceUp;
