// Bounce.tsx
"use client";

import { motion } from "framer-motion";
import { PropsWithChildren } from "react";

interface BounceUpProps {
    stiffness?: number; // force du rebond
    damping?: number; // contrôle la fluidité du mouvement
    duration?: number; // durée de l'animation
    delay?: number; // délai de l'animation
    direction?: "left" | "up" | "right" | "down";
    directionExit?: "left" | "up" | "right" | "down";
    layout?: boolean;
    once?: boolean;
    className?: string;
}

const Bounce = ({
    children,
    className,
    stiffness = 50,
    damping = 10,
    duration = 0.1,
    delay = 0.1,
    layout = false,
    direction = "up",
    directionExit = "down",
    once = true,
}: PropsWithChildren<BounceUpProps>) => {
    let initial = { opacity: 0, x: 0, y: 50 };
    let exit = { opacity: 0, x: 0, y: -50 };

    switch (direction) {
        case "left":
            initial = { opacity: 0, x: 50, y: 0 };
            break;
        case "right":
            initial = { opacity: 0, x: -50, y: 0 };
            break;
        case "down":
            initial = { opacity: 0, x: 0, y: -50 };
            break;
    }

    switch (directionExit) {
        case "left":
            exit = { opacity: 0, x: -50, y: 0 };
            break;
        case "right":
            exit = { opacity: 0, x: 50, y: 0 };
            break;
        case "down":
            exit = { opacity: 0, x: 0, y: 50 };
            break;
    }

    const bounceVariant = {
        initial,
        exit,
        animate: { y: 0, opacity: 1 },
    };

    return (
        <motion.div
            variants={bounceVariant}
            initial="initial"
            whileInView="animate"
            viewport={{ once }}
            exit="exit"
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

export default Bounce;
