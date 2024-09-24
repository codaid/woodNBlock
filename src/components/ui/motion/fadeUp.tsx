"use client";

import { motion } from "framer-motion";

type Props = {
    children: React.ReactNode;
    delay?: number;
    className?: string;
};

const fadeDownVariant = {
    initial: { opacity: 0, y: -100 },
    animate: { opacity: 1, y: 0 },
};

const FadeUp = ({ children, delay, className }: Props) => {
    return (
        <motion.div
            variants={fadeDownVariant}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            exit="initial"
            transition={{ duration: 0.2, delay: delay || 0 }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export default FadeUp;
