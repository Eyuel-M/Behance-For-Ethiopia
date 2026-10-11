"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

// Fades up from below when scrolled into view
export function FadeUp({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Stagger container — triggers all StaggerItem children in sequence
const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const childVariants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

export function StaggerGrid({ children, ...props }: HTMLMotionProps<"div"> & { children: ReactNode }) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// Direct child of StaggerGrid — inherits stagger timing
export function StaggerItem({ children, ...props }: HTMLMotionProps<"div"> & { children: ReactNode }) {
  return (
    <motion.div variants={childVariants} {...props}>
      {children}
    </motion.div>
  );
}
