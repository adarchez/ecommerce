// components/ProductSkeleton.tsx
import { motion } from "framer-motion";

export default function ProductSkeleton() {
  return (
    <motion.div
      className="animate-pulse rounded-md bg-neutral-300 dark:bg-neutral-700 p-4 space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="h-40 bg-neutral-400 dark:bg-neutral-600 rounded-md" />
      <div className="h-4 bg-neutral-400 dark:bg-neutral-600 rounded w-3/4" />
      <div className="h-4 bg-neutral-400 dark:bg-neutral-600 rounded w-1/2" />
    </motion.div>
  );
}
