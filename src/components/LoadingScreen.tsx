import { motion } from 'framer-motion';

export function LoadingScreen() {
  return (
    <motion.div className="grid min-h-[55vh] place-items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="text-center">
        <div className="boot-loader mx-auto" />
        <p className="mt-5 font-display text-cyan">loading corrupted process</p>
      </div>
    </motion.div>
  );
}
