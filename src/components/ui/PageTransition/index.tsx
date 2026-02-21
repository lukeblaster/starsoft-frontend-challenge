'use client';

import { motion } from "motion/react";
import { usePathname } from "next/navigation";

const variants = {
    initial: { x: 16, visibility: 'hidden' },
    animate: { x: 0, visibility: 'visible' },
    exit: { x: -16, visibility: 'hidden' },
}

export default function PageTransition({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <motion.div
            key={pathname}
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ type: 'spring', duration: 0.35, ease: 'easeInOut' }}
        >
            {children}
        </motion.div>
    );
}