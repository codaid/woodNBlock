//  Fade.tsx
"use client";

import { motion } from "framer-motion";
import { PropsWithChildren } from "react";

type Props = {
    className?: string;
    delay?: number;
    duration?: number;
    direction?: "left" | "up" | "right" | "down";
    directionExit?: "left" | "up" | "right" | "down";
    once?: boolean;
};

const Fade = ({
    children,
    className,
    delay = 0.2,
    duration = 0.2,
    direction = "up",
    directionExit = "down",
    once = true,
}: PropsWithChildren<Props>) => {
    let initial = { opacity: 0, x: 0, y: 100 };
    let exit = { opacity: 0, x: 0, y: -100 };

    switch (direction) {
        case "left":
            initial = { opacity: 0, x: 100, y: 0 };
            break;
        case "right":
            initial = { opacity: 0, x: -100, y: 0 };
            break;
        case "down":
            initial = { opacity: 0, x: 0, y: -100 };
            break;
    }

    switch (directionExit) {
        case "left":
            exit = { opacity: 0, x: -100, y: 0 };
            break;
        case "right":
            exit = { opacity: 0, x: 100, y: 0 };
            break;
        case "down":
            exit = { opacity: 0, x: 0, y: 100 };
            break;
    }

    const fadeVariant = {
        initial,
        exit,
        animate: { opacity: 1, y: 0, x: 0 },
    };

    return (
        <motion.div
            variants={fadeVariant}
            initial="initial"
            whileInView="animate"
            viewport={{ once }}
            exit="exit"
            transition={{ duration, delay }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export default Fade;
