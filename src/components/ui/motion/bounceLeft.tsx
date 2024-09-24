// BounceUp.tsx
"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface BounceUpProps {
    children: ReactNode;
    stiffness?: number; // force du rebond
    damping?: number; // contrôle la fluidité du mouvement
    duration?: number; // durée de l'animation
    delay?: number; // durée de l'animation
}

const BounceLeft = ({
    children,
    stiffness,
    damping,
    duration,
    delay,
}: BounceUpProps) => {
    return (
        <motion.div
            initial={{ x: 50, opacity: 0 }} // commence en bas avec 0 opacité
            animate={{ x: 0, opacity: 1 }} // rebondit vers sa position finale
            transition={{
                type: "spring",
                stiffness: stiffness || 50, // force du rebond
                damping: damping || 10, // contrôle la fluidité du mouvement
                duration: duration || 0.1, // durée de l'animation
                delay: delay || 0,
            }}
        >
            {children}
        </motion.div>
    );
};

export default BounceLeft;
