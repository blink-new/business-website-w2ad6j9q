import { motion } from 'framer-motion';

export function LoadingSpinner() {
  return (
    <motion.div
      className="w-6 h-6 border-2 border-gray-300 border-t-black rounded-full"
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
  );
}