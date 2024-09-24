"use client";

import { motion } from "framer-motion";

type Props = {
    children: React.ReactNode;
    delay?: number;
};

const fadeUpVariant = {
    initial: { opacity: 0, y: 100 },
    animate: { opacity: 1, y: 0 },
};

const FadeDown = ({ children, delay }: Props) => {
    return (
        <motion.div
            variants={fadeUpVariant}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            exit="initial"
            transition={{ duration: 0.2, delay: delay || 0 }}
        >
            {children}
        </motion.div>
    );
};

export default FadeDown;
